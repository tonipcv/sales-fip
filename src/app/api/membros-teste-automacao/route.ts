import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function onlyDigits(s: string) {
  return (s || "").replace(/\D/g, "");
}

function genReferralCodeFromPhone(phone: string) {
  const digits = onlyDigits(phone);
  const base = digits.slice(-6) || digits || Math.random().toString().slice(2, 8);
  // Simple base36 hash
  let hash = 0;
  for (let i = 0; i < base.length; i++) hash = (hash * 31 + base.charCodeAt(i)) >>> 0;
  const h = (hash >>> 0).toString(36).toUpperCase().slice(0, 4);
  return `MBR${base.slice(-4)}${h}`; // e.g., MBR1234ABCD
}

// Robust random referral code when collision happens
function genRandomReferralCode(phoneDigits: string, tries: number) {
  const last4 = (onlyDigits(phoneDigits).slice(-4) || "0000").padStart(4, "0");
  const ts = Date.now().toString(36).toUpperCase().slice(-4);
  const rnd = Math.random().toString(36).toUpperCase().slice(2, 4);
  const tr = (tries % 36).toString(36).toUpperCase();
  return `MBR${last4}${ts}${rnd}${tr}`.slice(0, 14); // keep reasonable length
}

async function genUniqueCouponCode(ownerId: string, phone: string) {
  const digits = onlyDigits(phone);
  const seed = digits || ownerId;
  let attempt = 0;
  while (attempt < 5) {
    let hash = 0;
    const salt = `${seed}-${attempt}`;
    for (let i = 0; i < salt.length; i++) hash = (hash * 33 + salt.charCodeAt(i)) >>> 0;
    const code = `K17-${(hash >>> 0).toString(36).toUpperCase().slice(0, 8)}`;
    const exists = await prisma.coupon.findUnique({ where: { code } });
    if (!exists) return code;
    attempt++;
  }
  // Fallback random
  return `K17-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const nomeRaw = (body?.nome ?? "").toString();
    const nome = nomeRaw.trim() || "Visitante";
    const whatsapp = (body?.whatsapp || "").toString();
    const indicacao = (body?.indicacao || "").toString().trim();

    if (!whatsapp) {
      return NextResponse.json({ error: "WhatsApp é obrigatório." }, { status: 400 });
    }

    const phoneDigits = onlyDigits(whatsapp);
    if (phoneDigits.length < 10) {
      return NextResponse.json({ error: "WhatsApp inválido." }, { status: 400 });
    }

    // Upsert Member by whatsapp
    let member = await prisma.member.findUnique({ where: { whatsapp: phoneDigits } });
    if (!member) {
      const referralCode = genReferralCodeFromPhone(phoneDigits);
      // ensure referralCode uniqueness by retrying if needed
      let code = referralCode;
      let tries = 0;
      while (tries < 20) {
        try {
          member = await prisma.member.create({ data: { name: nome, whatsapp: phoneDigits, referralCode: code } });
          break;
        } catch (e: any) {
          if (e?.code === "P2002") {
            // unique constraint failed -> mutate code and retry
            code = genRandomReferralCode(phoneDigits, tries);
            tries++;
            continue;
          }
          throw e;
        }
      }
      if (!member) throw new Error("Falha ao criar membro.");
    } else if (member && member.name !== nome) {
      member = await prisma.member.update({ where: { id: member.id }, data: { name: nome } });
    }

    // Handle referral (optional)
    if (indicacao) {
      const refCodeCandidate = indicacao.trim();
      const refPhoneCandidate = onlyDigits(indicacao);
      let referrer = await prisma.member.findFirst({
        where: {
          OR: [
            { referralCode: refCodeCandidate },
            { whatsapp: refPhoneCandidate && refPhoneCandidate.length >= 10 ? refPhoneCandidate : "__none__" },
          ],
        },
      });

      if (referrer && referrer.id !== member.id) {
        // Create referral if not exists
        const existing = await prisma.referral.findFirst({
          where: { referrerId: referrer.id, referredId: member.id },
        });
        if (!existing) {
          await prisma.referral.create({ data: { referrerId: referrer.id, referredId: member.id } });
        }
      }
    }

    // Coupon: try find existing unused for this owner
    let coupon = await prisma.coupon.findFirst({ where: { ownerId: member.id, usedAt: null } });
    if (!coupon) {
      const code = await genUniqueCouponCode(member.id, phoneDigits);
      coupon = await prisma.coupon.create({ data: { code, ownerId: member.id } });
    }

    return NextResponse.json({ member, coupon });
  } catch (error: any) {
    console.error("/api/membros-teste-automacao error", error);
    return NextResponse.json({ error: error?.message || "Erro interno." }, { status: 500 });
  }
}
