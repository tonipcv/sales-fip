-- CreateTable
CREATE TABLE "waiting_list" (
    "id" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "waiting_list_pkey" PRIMARY KEY ("id")
); 