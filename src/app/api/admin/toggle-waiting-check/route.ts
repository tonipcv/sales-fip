import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { whatsapp, checked } = await request.json();

    // Atualiza todos os registros com esse número
    await prisma.waitingList.updateMany({
      where: { whatsapp },
      data: { checked },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating waiting list item:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 