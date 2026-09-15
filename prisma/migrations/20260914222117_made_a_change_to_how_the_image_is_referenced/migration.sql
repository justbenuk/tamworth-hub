/*
  Warnings:

  - You are about to drop the column `linkdin` on the `Councillor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `Councillor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `Councillor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Councillor" DROP COLUMN "linkdin",
ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "linkedin" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Councillor_imageId_key" ON "Councillor"("imageId");

-- AddForeignKey
ALTER TABLE "Councillor" ADD CONSTRAINT "Councillor_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
