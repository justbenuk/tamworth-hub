-- AlterTable
ALTER TABLE "Media" ADD COLUMN "businessId" TEXT;

-- CreateIndex
CREATE INDEX "Media_businessId_idx" ON "Media"("businessId");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;
