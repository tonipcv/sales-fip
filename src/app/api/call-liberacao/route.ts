import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, os, meta } = body;

    // Validações básicas
    if (!name || !email || !os || !meta) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Salva no banco
    const lead = await prisma.callLiberacao.create({
      data: {
        name,
        email,
        os,
        meta,
      },
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.error('Error saving call liberacao:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar dados' },
      { status: 500 }
    );
  }
} 