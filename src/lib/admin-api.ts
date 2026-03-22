import "server-only";

import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";

const ALLOWED_RESOURCES = ["certificates", "formations", "projects", "knowledge"] as const;

export type AdminResource = (typeof ALLOWED_RESOURCES)[number];

export function isAllowedResource(resource: string): resource is AdminResource {
  return ALLOWED_RESOURCES.includes(resource as AdminResource);
}

const ALLOWED_GROUPS = new Set(["superadmin", "editor"]);

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const session = verifyAdminSessionToken(token);

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  const hasAllowedGroup = session.groups.some((group) => ALLOWED_GROUPS.has(group));

  if (!hasAllowedGroup) {
    throw new Error("FORBIDDEN");
  }

  return session;
}

export function getAdminApiConfig() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

  return { baseUrl };
}
