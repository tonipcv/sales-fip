import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, whatsapp } = body;

    // Validar campos obrigatórios
    if (!name || !email || !whatsapp) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar parâmetros UTM da URL
    const url = new URL(request.url);
    const utmParams = {
      utm_source: url.searchParams.get('utm_source'),
      utm_medium: url.searchParams.get('utm_medium'),
      utm_campaign: url.searchParams.get('utm_campaign'),
      utm_content: url.searchParams.get('utm_content'),
      utm_term: url.searchParams.get('utm_term'),
    };

    // Verificar se o lead já existe
    const existingLead = await prisma.giftFormLead.findUnique({
      where: { email },
    });

    let lead;
    if (existingLead) {
      // Se existir, atualiza os dados
      lead = await prisma.giftFormLead.update({
        where: { email },
        data: {
          name,
          whatsapp,
          ...utmParams,
        },
      });
    } else {
      // Se não existir, cria um novo
      lead = await prisma.giftFormLead.create({
        data: {
          name,
          email,
          whatsapp,
          ...utmParams,
        },
      });
    }

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('Error creating gift form lead:', error);
    return NextResponse.json(
      { error: 'Erro ao processar sua solicitação' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { email, gender, age, market_level, net_worth, is_premium, interested } = body;

    // Validar campos obrigatórios
    if (!email || !gender || !age || !market_level || !net_worth || is_premium === undefined || interested === undefined) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Atualizar lead com as respostas do quiz
    const lead = await prisma.giftFormLead.update({
      where: { email },
      data: {
        gender,
        age,
        market_level,
        net_worth,
        is_premium,
        interested,
      },
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('Error updating gift form lead:', error);
    return NextResponse.json(
      { error: 'Erro ao processar suas respostas' },
      { status: 500 }
    );
  }
} 