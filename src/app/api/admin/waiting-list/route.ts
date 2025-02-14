import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const waitingList = await prisma.waitingList.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(waitingList);
  } catch (error) {
    console.error('Error fetching waiting list:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 