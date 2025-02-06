import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { whatsapp, source, country } = await request.json();

    // Salva no banco
    await prisma.whatsappLead.create({
      data: {
        whatsapp,
        source: source || 'funil',
        country,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving whatsapp:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 