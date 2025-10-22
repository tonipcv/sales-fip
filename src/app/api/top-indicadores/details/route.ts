import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET(req: Request) {
  try {
    const headersList = await headers();
    const authToken = headersList.get("x-admin-token");
    if (!authToken || authToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const referrerId = searchParams.get("referrerId");
    if (!referrerId) {
      return NextResponse.json({ error: "referrerId é obrigatório" }, { status: 400 });
    }

    const referrer = await prisma.member.findUnique({
      where: { id: referrerId },
      select: { id: true, name: true, whatsapp: true, referralCode: true, createdAt: true },
    });
    if (!referrer) {
      return NextResponse.json({ error: "Indicador não encontrado" }, { status: 404 });
    }

    const referrals = await prisma.referral.findMany({
      where: { referrerId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        referred: { select: { id: true, name: true, whatsapp: true, referralCode: true, createdAt: true } },
      },
    });

    return NextResponse.json({ referrer, total: referrals.length, referrals });
  } catch (error: any) {
    console.error("/api/top-indicadores/details error", error ?? "Unknown error");
    return NextResponse.json({ error: error?.message || "Erro interno." }, { status: 500 });
  }
}
