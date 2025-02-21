import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Verifica o token de autenticação
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Busca todos os leads
    const leads = await prisma.quizLead.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Calcula as estatísticas
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalLeads = leads.length;
    const todayLeads = leads.filter(lead => 
      new Date(lead.createdAt) >= today
    ).length;
    const checkedLeads = leads.filter(lead => lead.checked).length;
    const conversionRate = (checkedLeads / totalLeads) * 100;

    return NextResponse.json({
      totalLeads,
      todayLeads,
      checkedLeads,
      conversionRate,
      leads
    });
  } catch (error) {
    console.error('Error fetching quiz leads:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 