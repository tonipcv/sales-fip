-- CreateTable
CREATE TABLE IF NOT EXISTS "call_liberacao" (
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
CREATE INDEX IF NOT EXISTS "call_liberacao_email_idx" ON "call_liberacao"("email");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "call_liberacao_createdAt_idx" ON "call_liberacao"("createdAt"); 