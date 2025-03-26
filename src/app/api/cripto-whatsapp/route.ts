import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { whatsapp } = body;

    // Validate required field
    if (!whatsapp) {
      return NextResponse.json(
        { error: "WhatsApp é obrigatório" },
        { status: 400 }
      );
    }

    // Check if lead already exists
    const existingLead = await prisma.criptoWhatsappLead.findUnique({
      where: {
        whatsapp: whatsapp,
      },
    });

    if (existingLead) {
      return NextResponse.json(existingLead);
    }

    // Create new lead
    const lead = await prisma.criptoWhatsappLead.create({
      data: {
        whatsapp,
      },
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.error("Error processing WhatsApp lead:", error);
    return NextResponse.json(
      { error: "Erro ao processar lead" },
      { status: 500 }
    );
  }
} 