import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, hotmartEmail, purchaseEmail, whatsapp, instagram, marketingMethod } = body;

    // Validação
    if (!name || !hotmartEmail || !purchaseEmail || !whatsapp || !instagram || !marketingMethod) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Extrair parâmetros UTM da URL de referência se disponível
    const referer = request.headers.get("referer") || "";
    const urlParams = new URL(referer).searchParams;
    
    // Criar o registro no banco usando Prisma
    const partner = await prisma.partner.create({
      data: {
        name,
        hotmartEmail,
        purchaseEmail,
        whatsapp,
        instagram,
        marketingMethod,
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
        utm_source: urlParams.get("utm_source") || null,
        utm_medium: urlParams.get("utm_medium") || null,
        utm_campaign: urlParams.get("utm_campaign") || null,
        utm_content: urlParams.get("utm_content") || null,
        utm_term: urlParams.get("utm_term") || null,
      },
    });

    return NextResponse.json({ 
      success: true,
      data: {
        id: partner.id,
        createdAt: partner.createdAt
      }
    });
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
    return NextResponse.json(
      { error: "Erro ao processar solicitação" },
      { status: 500 }
    );
  }
} 