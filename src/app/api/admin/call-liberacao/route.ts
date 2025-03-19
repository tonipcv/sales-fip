import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    // Verificar o token de admin
    const { searchParams } = new URL(request.url);
    const adminToken = searchParams.get('admin_token');

    if (adminToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Buscar dados com paginação
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 50;
    const skip = (page - 1) * limit;

    const [total, leads] = await Promise.all([
      prisma.callLiberacao.count(),
      prisma.callLiberacao.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit,
      })
    ]);

    return NextResponse.json({
      leads,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        perPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching call liberacao data:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar dados' },
      { status: 500 }
    );
  }
} 