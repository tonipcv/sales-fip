import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Definir interface para o tipo de lead
interface QuizLead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  capital: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  createdAt: Date;
  checked: boolean;
}

export async function GET(request: Request) {
  try {
    // Verifica o token de autenticação
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Busca todos os leads - usando o nome correto da tabela no Prisma
    const leads = await prisma.$queryRaw`SELECT * FROM quiz_leads ORDER BY "createdAt" DESC` as unknown as QuizLead[];

    // Calcula as estatísticas
    const totalLeads = leads.length;
    
    // Calcular leads de hoje
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayLeads = leads.filter(lead => {
      const leadDate = new Date(lead.createdAt);
      return leadDate >= today;
    }).length;
    
    // Calcular leads verificados
    const checkedLeads = leads.filter(lead => lead.checked).length;
    
    // Calcular taxa de conversão
    const conversionRate = totalLeads > 0 ? (checkedLeads / totalLeads) * 100 : 0;

    // Calcular leads únicos por e-mail
    const uniqueEmails = new Set(leads.map(lead => lead.email));
    const uniqueLeadsCount = uniqueEmails.size;

    return NextResponse.json({
      leads,
      totalLeads,
      todayLeads,
      checkedLeads,
      conversionRate,
      stats: {
        total: totalLeads,
        checked: checkedLeads,
        unchecked: totalLeads - checkedLeads,
        uniqueCount: uniqueLeadsCount
      }
    });
  } catch (error) {
    console.error('Error fetching quiz leads:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 