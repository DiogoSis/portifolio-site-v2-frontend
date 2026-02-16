import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_BASE_URL || 
  'https://ofqpkinf8j.execute-api.us-east-1.amazonaws.com';

const API_SITE_KEY = process.env.NEXT_PUBLIC_API_SITE_KEY || '';

/**
 * API Route proxy para projects
 * GET /api/projects - Lista todos os projetos
 */
export async function GET(req: NextRequest) {
  try {
    // Validação: API Key obrigatória
    if (!API_SITE_KEY) {
      console.error('❌ [Projects] NEXT_PUBLIC_API_SITE_KEY não configurada!');
      return NextResponse.json(
        { 
          error: 'API Key not configured',
          message: 'NEXT_PUBLIC_API_SITE_KEY environment variable is required. Check DEPLOYMENT.md for instructions.'
        },
        { status: 500 }
      );
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'x-api-key': API_SITE_KEY,
    };

    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro na API:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Erro na API route:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
