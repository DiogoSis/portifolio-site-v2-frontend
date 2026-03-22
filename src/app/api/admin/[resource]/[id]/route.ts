import { NextRequest, NextResponse } from "next/server";
import {
  getAdminApiConfig,
  isAllowedResource,
  requireAdminSession,
} from "@/lib/admin-api";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ resource: string; id: string }> }
) {
  try {
    await requireAdminSession();

    const { resource, id } = await context.params;

    if (!isAllowedResource(resource)) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    const body = await request.json();
    const { baseUrl, adminKey } = getAdminApiConfig();

    if (!adminKey) {
      return NextResponse.json({ error: "API_ADMIN_KEY not configured" }, { status: 500 });
    }

    const response = await fetch(`${baseUrl}/${resource}/${id}`, {
      method: "PUT",
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

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ resource: string; id: string }> }
) {
  try {
    await requireAdminSession();

    const { resource, id } = await context.params;

    if (!isAllowedResource(resource)) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    const { baseUrl, adminKey } = getAdminApiConfig();

    if (!adminKey) {
      return NextResponse.json({ error: "API_ADMIN_KEY not configured" }, { status: 500 });
    }

    const response = await fetch(`${baseUrl}/${resource}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": adminKey,
      },
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
