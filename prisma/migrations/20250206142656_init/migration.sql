-- CreateTable
CREATE TABLE "whatsapp_leads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "whatsapp" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
