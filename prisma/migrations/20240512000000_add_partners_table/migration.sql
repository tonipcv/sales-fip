-- CreateTable
CREATE TABLE "partners" (
  "id" TEXT NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "hotmartEmail" VARCHAR(255) NOT NULL,
  "purchaseEmail" VARCHAR(255) NOT NULL,
  "whatsapp" VARCHAR(20) NOT NULL,
  "instagram" VARCHAR(100) NOT NULL,
  "marketingMethod" TEXT NOT NULL,
  "utm_source" TEXT,
  "utm_medium" TEXT,
  "utm_campaign" TEXT,
  "utm_content" TEXT,
  "utm_term" TEXT,
  "ipAddress" VARCHAR(50),
  "userAgent" TEXT,
  "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "approved" BOOLEAN NOT NULL DEFAULT false,

  CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "partners_hotmartEmail_idx" ON "partners"("hotmartEmail");

-- CreateIndex
CREATE INDEX "partners_whatsapp_idx" ON "partners"("whatsapp");

-- CreateIndex
CREATE INDEX "partners_createdAt_idx" ON "partners"("createdAt"); 