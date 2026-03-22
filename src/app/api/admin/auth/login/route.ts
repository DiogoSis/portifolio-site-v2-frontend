import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
} from "@/lib/admin-auth";

interface LoginBody {
  username?: string;
  password?: string;
}

const ADMIN_USERNAME = process.env.ADMIN_MOCK_USERNAME || "admin@local.dev";
const ADMIN_PASSWORD = process.env.ADMIN_MOCK_PASSWORD || "admin123";

export async function POST(request: NextRequest) {
  let body: LoginBody;

  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json(
      { error: "Payload invalido" },
      { status: 400 }
    );
  }

  if (!body.username || !body.password) {
    return NextResponse.json(
      { error: "Usuario e senha sao obrigatorios" },
      { status: 400 }
    );
  }

  if (body.username !== ADMIN_USERNAME || body.password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Credenciais invalidas" },
      { status: 401 }
    );
  }

  const token = createAdminSessionToken({
    sub: "local-admin-1",
    email: ADMIN_USERNAME,
    role: "superadmin",
  });

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
