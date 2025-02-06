-- CreateTable
CREATE TABLE "whatsapp_leads" (
    "id" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "whatsapp_leads_pkey" PRIMARY KEY ("id")
);
