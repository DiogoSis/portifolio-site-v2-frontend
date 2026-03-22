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
    const session = await requireAdminSession();

    const { resource, id } = await context.params;

    if (!isAllowedResource(resource)) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    const body = await request.json();
    const { baseUrl } = getAdminApiConfig();

    const response = await fetch(`${baseUrl}/admin/${resource}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.idToken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (error instanceof Error && error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ resource: string; id: string }> }
) {
  try {
    const session = await requireAdminSession();

    const { resource, id } = await context.params;

    if (!isAllowedResource(resource)) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    const { baseUrl } = getAdminApiConfig();

    const response = await fetch(`${baseUrl}/admin/${resource}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.idToken}`,
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (error instanceof Error && error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
