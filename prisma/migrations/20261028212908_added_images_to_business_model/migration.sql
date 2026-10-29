/*
  Warnings:

  - You are about to drop the column `businessId` on the `Media` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_businessId_fkey";

-- DropIndex
DROP INDEX "Media_businessId_idx";

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "businessId";

-- CreateTable
CREATE TABLE "_BusinessGallery" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BusinessGallery_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BusinessGallery_B_index" ON "_BusinessGallery"("B");

-- AddForeignKey
ALTER TABLE "_BusinessGallery" ADD CONSTRAINT "_BusinessGallery_A_fkey" FOREIGN KEY ("A") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessGallery" ADD CONSTRAINT "_BusinessGallery_B_fkey" FOREIGN KEY ("B") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
