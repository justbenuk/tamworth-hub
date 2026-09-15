/*
  Warnings:

  - You are about to drop the column `twiiter` on the `Councillor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Councillor" DROP COLUMN "twiiter",
ADD COLUMN     "twitter" TEXT;
