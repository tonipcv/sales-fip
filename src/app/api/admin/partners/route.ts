import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export async function GET() {
  try {
    // Verificar token de autenticação
    const headersList = await headers();
    const authToken = headersList.get("x-admin-token");

    if (!authToken || authToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Buscar todos os parceiros
    const partners = await prisma.partner.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Calcular estatísticas
    const totalPartners = partners.length;
    const approvedPartners = partners.filter(partner => partner.approved).length;
    const pendingPartners = partners.filter(partner => !partner.approved).length;

    return NextResponse.json({
      partners,
      stats: {
        total: totalPartners,
        approved: approvedPartners,
        pending: pendingPartners
      }
    });
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Endpoint para aprovar/rejeitar parceiros
export async function PATCH(request: Request) {
  try {
    // Verificar token de autenticação
    const headersList = await headers();
    const authToken = headersList.get("x-admin-token");

    if (!authToken || authToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id, approved } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Partner ID is required" },
        { status: 400 }
      );
    }

    // Atualizar o status do parceiro
    const updatedPartner = await prisma.partner.update({
      where: { id },
      data: { approved: approved === true }
    });

    return NextResponse.json({
      success: true,
      partner: updatedPartner
    });
  } catch (error) {
    console.error('Error updating partner:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 