import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

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

    // Buscar dados de todos os modelos
    const [
      whatsappLeads,
      waitingList,
      quizLeads,
      callLiberacaoLeads,
      protectionFormLeads,
      giftFormLeads,
      criptoWhatsappLeads
    ] = await Promise.all([
      prisma.whatsappLead.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.waitingList.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.quizLead.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.callLiberacao.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.protectionFormLead.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.giftFormLead.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.criptoWhatsappLead.findMany({ orderBy: { createdAt: "desc" } })
    ]);

    // Calcular estatísticas do Cripto WhatsApp
    const uniqueWhatsapps = new Set(criptoWhatsappLeads.map(lead => lead.whatsapp));
    const total = criptoWhatsappLeads.length;
    const unique = uniqueWhatsapps.size;
    const duplicates = total - unique;

    return NextResponse.json({
      whatsapp: {
        leads: whatsappLeads,
        total: whatsappLeads.length,
        sources: Object.entries(
          whatsappLeads.reduce((acc, lead) => {
            acc[lead.source] = (acc[lead.source] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        )
      },
      waitingList: {
        leads: waitingList,
        total: waitingList.length,
        sources: Object.entries(
          waitingList.reduce((acc, lead) => {
            acc[lead.source] = (acc[lead.source] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        )
      },
      quiz: {
        leads: quizLeads,
        total: quizLeads.length,
        capitalDistribution: Object.entries(
          quizLeads.reduce((acc, lead) => {
            acc[lead.capital] = (acc[lead.capital] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        )
      },
      callLiberacao: {
        leads: callLiberacaoLeads,
        total: callLiberacaoLeads.length,
        osDistribution: {
          android: callLiberacaoLeads.filter(lead => lead.os.toLowerCase().includes('android')).length,
          ios: callLiberacaoLeads.filter(lead => lead.os.toLowerCase().includes('ios') || lead.os.toLowerCase().includes('iphone')).length
        },
        metaDistribution: Object.entries(
          callLiberacaoLeads.reduce((acc, lead) => {
            acc[lead.meta] = (acc[lead.meta] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        )
      },
      protectionForm: {
        leads: protectionFormLeads,
        total: protectionFormLeads.length,
        utmStats: {
          source: Object.entries(
            protectionFormLeads.reduce((acc, lead) => {
              if (lead.utm_source) acc[lead.utm_source] = (acc[lead.utm_source] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)
          ),
          medium: Object.entries(
            protectionFormLeads.reduce((acc, lead) => {
              if (lead.utm_medium) acc[lead.utm_medium] = (acc[lead.utm_medium] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)
          )
        }
      },
      giftForm: {
        leads: giftFormLeads,
        total: giftFormLeads.length,
        stats: {
          gender: Object.entries(
            giftFormLeads.reduce((acc, lead) => {
              if (lead.gender) acc[lead.gender] = (acc[lead.gender] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)
          ),
          age: Object.entries(
            giftFormLeads.reduce((acc, lead) => {
              if (lead.age) acc[lead.age] = (acc[lead.age] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)
          ),
          marketLevel: Object.entries(
            giftFormLeads.reduce((acc, lead) => {
              if (lead.market_level) acc[lead.market_level] = (acc[lead.market_level] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)
          ),
          netWorth: Object.entries(
            giftFormLeads.reduce((acc, lead) => {
              if (lead.net_worth) acc[lead.net_worth] = (acc[lead.net_worth] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)
          ),
          isPremium: giftFormLeads.filter(lead => lead.is_premium).length,
          interested: giftFormLeads.filter(lead => lead.interested).length
        }
      },
      criptoWhatsapp: {
        leads: criptoWhatsappLeads,
        total,
        unique,
        duplicates
      }
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 