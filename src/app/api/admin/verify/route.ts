import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    // Verifica se o token corresponde ao token de admin definido nas variáveis de ambiente
    if (token === process.env.ADMIN_TOKEN) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 