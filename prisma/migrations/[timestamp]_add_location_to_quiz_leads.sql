-- AlterTable
ALTER TABLE "quiz_leads" 
ADD COLUMN "country" TEXT,
ADD COLUMN "state" TEXT,
ADD COLUMN "city" TEXT,
ADD COLUMN "latitude" DOUBLE PRECISION,
ADD COLUMN "longitude" DOUBLE PRECISION; 