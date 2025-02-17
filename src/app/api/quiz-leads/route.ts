import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validação dos dados
    if (!data || !data.name || !data.email || !data.whatsapp || !data.capital) {
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      );
    }

    // Salva no banco
    const result = await prisma.quizLead.create({
      data: {
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp,
        capital: data.capital,
        utm_source: data.utm_source || null,
        utm_medium: data.utm_medium || null,
        utm_campaign: data.utm_campaign || null,
        utm_content: data.utm_content || null,
        utm_term: data.utm_term || null
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving quiz lead:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 