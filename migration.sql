-- CreateTable
CREATE TABLE "whatsapp_leads" (
    "id" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "whatsapp_leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "waiting_list" (
    "id" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "waiting_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_leads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "capital" TEXT NOT NULL,
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "utm_content" TEXT,
    "utm_term" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "quiz_leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "call_liberacao" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "os" VARCHAR(10) NOT NULL,
    "meta" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "call_liberacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "call_liberacao_email_idx" ON "call_liberacao"("email");

-- CreateIndex
CREATE INDEX "call_liberacao_createdAt_idx" ON "call_liberacao"("createdAt");

