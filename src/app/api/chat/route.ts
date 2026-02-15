import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route do Next.js que faz proxy para o Lambda Handler
 * Endpoint: POST /api/chat
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, conversationId } = body;

    // Validação
    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    // URL do Lambda (configurar via variável de ambiente)
    const lambdaUrl = 
      process.env.CHAT_API_URL || 
      process.env.NEXT_PUBLIC_CHAT_API_URL ||
      'https://ofqpkinf8j.execute-api.us-east-1.amazonaws.com/chat';

    if (!lambdaUrl) {
      console.error('❌ CHAT_API_URL não configurada');
      return NextResponse.json(
        { error: 'Chat service not configured' },
        { status: 500 }
      );
    }

    // Chama o Lambda
    const response = await fetch(lambdaUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        conversationId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro no Lambda:', errorText);
      return NextResponse.json(
        { error: 'Failed to get response from chat service' },
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

// Permite OPTIONS para CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
