import "server-only";

import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";
const DEFAULT_TTL_SECONDS = 60 * 60 * 8;

type AdminRole = "superadmin" | "editor";

export interface AdminSession {
  sub: string;
  email: string;
  groups: string[];
  role: AdminRole;
  idToken: string;
  exp: number;
}

function getSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "dev-only-change-me";
}

function base64urlEncode(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function base64urlDecode(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(encodedPayload: string): string {
  return createHmac("sha256", getSessionSecret())
    .update(encodedPayload)
    .digest("base64url");
}

export function createAdminSessionToken(
  payload: Omit<AdminSession, "exp">,
  ttlSeconds = DEFAULT_TTL_SECONDS
): string {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const encodedPayload = base64urlEncode(JSON.stringify({ ...payload, exp }));
  const signature = signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined): AdminSession | null {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload);

  if (
    expectedSignature.length !== signature.length ||
    !timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature))
  ) {
    return null;
  }

  try {
    const parsed = JSON.parse(base64urlDecode(encodedPayload)) as AdminSession;

    if (!parsed.exp || parsed.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    if (!parsed.sub || !parsed.email || !parsed.role) {
      return null;
    }

    if (!Array.isArray(parsed.groups) || parsed.groups.length === 0) {
      return null;
    }

    if (!parsed.idToken) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export interface CognitoIdClaims {
  sub: string;
  email: string;
  exp: number;
  token_use?: string;
  "cognito:groups"?: string[];
}

function decodeBase64Url(input: string): string {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(normalized, "base64").toString("utf8");
}

export function decodeCognitoIdToken(idToken: string): CognitoIdClaims | null {
  const parts = idToken.split(".");
  if (parts.length < 2) {
    return null;
  }

  try {
    const rawClaims = decodeBase64Url(parts[1]);
    const claims = JSON.parse(rawClaims) as CognitoIdClaims;

    if (!claims.sub || !claims.email || !claims.exp) {
      return null;
    }

    if (claims.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return claims;
  } catch {
    return null;
  }
}

export function resolveAdminRole(groups: string[]): AdminRole | null {
  if (groups.includes("superadmin")) {
    return "superadmin";
  }

  if (groups.includes("editor")) {
    return "editor";
  }

  return null;
}
