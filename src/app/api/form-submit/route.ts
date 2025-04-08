import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, acceptedTerms } = body;

    // Validação
    if (!name || !email || !phone || acceptedTerms !== true) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Extrair parâmetros UTM da URL de referência se disponível
    const referer = request.headers.get("referer") || "";
    const urlParams = new URL(referer).searchParams;
    
    // Criar o registro no banco usando Prisma
    const submission = await prisma.userSubmission.create({
      data: {
        name,
        email,
        phone,
        acceptedTerms,
        termsAcceptedAt: new Date(),
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
        id: submission.id,
        termsAcceptedAt: submission.termsAcceptedAt
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