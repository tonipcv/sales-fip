import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const adminToken = searchParams.get("admin_token");

    // Verificar token de administrador
    if (adminToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Buscar todos os leads
    const leads = await prisma.criptoWhatsappLead.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 