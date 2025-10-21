-- Idempotent migration to add members, coupons, referrals tables without affecting existing schema

-- Enable required extensions if needed (safe if already enabled)
-- Note: We keep id as TEXT so Prisma (cuid()) can provide values from the app.

-- members
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'members'
  ) THEN
    CREATE TABLE public.members (
      id           TEXT PRIMARY KEY,
      name         TEXT NOT NULL,
      whatsapp     TEXT NOT NULL,
      "referralCode" TEXT NOT NULL,
      "createdAt"   TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS members_whatsapp_key ON public.members (whatsapp);
    CREATE UNIQUE INDEX IF NOT EXISTS members_referralCode_key ON public.members ("referralCode");
  END IF;
END$$;

-- coupons
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'coupons'
  ) THEN
    CREATE TABLE public.coupons (
      id         TEXT PRIMARY KEY,
      code       TEXT NOT NULL,
      "ownerId"  TEXT NOT NULL,
      "usedAt"   TIMESTAMP WITHOUT TIME ZONE NULL,
      "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
      CONSTRAINT coupons_owner_fk FOREIGN KEY ("ownerId") REFERENCES public.members(id) ON DELETE CASCADE
    );
    CREATE UNIQUE INDEX IF NOT EXISTS coupons_code_key ON public.coupons (code);
    CREATE INDEX IF NOT EXISTS coupons_ownerId_idx ON public.coupons ("ownerId");
  END IF;
END$$;

-- referrals
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'referrals'
  ) THEN
    CREATE TABLE public.referrals (
      id            TEXT PRIMARY KEY,
      "referrerId" TEXT NULL,
      "referredId" TEXT NOT NULL,
      "createdAt"  TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
      CONSTRAINT referrals_referrer_fk FOREIGN KEY ("referrerId") REFERENCES public.members(id) ON DELETE SET NULL,
      CONSTRAINT referrals_referred_fk FOREIGN KEY ("referredId") REFERENCES public.members(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS referrals_referrerId_idx ON public.referrals ("referrerId");
    CREATE INDEX IF NOT EXISTS referrals_referredId_idx ON public.referrals ("referredId");
    CREATE UNIQUE INDEX IF NOT EXISTS referrals_referrer_referred_unique ON public.referrals ("referrerId", "referredId");
  END IF;
END$$;
