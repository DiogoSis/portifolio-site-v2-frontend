import { NextRequest, NextResponse } from "next/server";
import {
  getAdminApiConfig,
  isAllowedResource,
  requireAdminSession,
} from "@/lib/admin-api";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ resource: string }> }
) {
  try {
    await requireAdminSession();

    const { resource } = await context.params;

    if (!isAllowedResource(resource)) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    const { baseUrl, adminKey } = getAdminApiConfig();
    if (!adminKey) {
      return NextResponse.json({ error: "API_ADMIN_KEY not configured" }, { status: 500 });
    }

    const response = await fetch(`${baseUrl}/${resource}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": adminKey,
      },
      cache: "no-store",
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ resource: string }> }
) {
  try {
    await requireAdminSession();

    const { resource } = await context.params;

    if (!isAllowedResource(resource)) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    const body = await request.json();
    const { baseUrl, adminKey } = getAdminApiConfig();

    if (!adminKey) {
      return NextResponse.json({ error: "API_ADMIN_KEY not configured" }, { status: 500 });
    }

    const response = await fetch(`${baseUrl}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": adminKey,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
