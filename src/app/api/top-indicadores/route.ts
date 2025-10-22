import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET(req: Request) {
  try {
    // Auth check like other admin routes
    const headersList = await headers();
    const authToken = headersList.get("x-admin-token");
    if (!authToken || authToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "20", 10)));

    // Optional date filters
    const from = searchParams.get("from") ? new Date(searchParams.get("from") as string) : null;
    const to = searchParams.get("to") ? new Date(searchParams.get("to") as string) : null;

    // Group referrals by referrerId and count
    const groups = await prisma.referral.groupBy({
      by: ["referrerId"],
      where: {
        referrerId: { not: null },
        ...(from || to
          ? {
              createdAt: {
                ...(from ? { gte: from } : {}),
                ...(to ? { lte: to } : {}),
              },
            }
          : {}),
      },
      _count: { referrerId: true },
      orderBy: { _count: { referrerId: "desc" } },
      take: limit,
    });

    if (!groups.length) return NextResponse.json({ items: [], total: 0 });

    const referrerIds = groups.map((g) => g.referrerId!).filter(Boolean);

    // Fetch member details for each referrer
    const members = await prisma.member.findMany({
      where: { id: { in: referrerIds } },
      select: { id: true, name: true, whatsapp: true, referralCode: true, createdAt: true },
    });

    // Optionally compute most recent referral date per referrer (for display)
    const recents = await prisma.referral.findMany({
      where: { referrerId: { in: referrerIds } },
      select: { referrerId: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });

    const recentMap = new Map<string, Date>();
    for (const r of recents) {
      if (!recentMap.has(r.referrerId!)) recentMap.set(r.referrerId!, r.createdAt);
    }

    const memberMap = new Map(members.map((m) => [m.id, m] as const));

    const items = groups.map((g, idx) => {
      const m = memberMap.get(g.referrerId!);
      return {
        rank: idx + 1,
        referrerId: g.referrerId,
        name: m?.name || "—",
        whatsapp: m?.whatsapp || "—",
        referralCode: m?.referralCode || "—",
        totalIndicacoes: (g as any)._count?.referrerId ?? 0,
        ultimoConvite: m ? recentMap.get(m.id) || null : null,
      };
    });

    return NextResponse.json({ items, total: items.length });
  } catch (error: any) {
    console.error("/api/top-indicadores error", error ?? "Unknown error");
    return NextResponse.json({ error: error?.message || "Erro interno." }, { status: 500 });
  }
}
