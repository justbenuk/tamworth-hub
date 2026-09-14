/*
  Warnings:

  - You are about to drop the `Councilor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Councilor" DROP CONSTRAINT "Councilor_wardId_fkey";

-- DropTable
DROP TABLE "Councilor";

-- CreateTable
CREATE TABLE "Councillor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "facebook" TEXT,
    "twiiter" TEXT,
    "instagram" TEXT,
    "linkdin" TEXT,
    "party" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contactNumber" TEXT,
    "wardId" TEXT NOT NULL,

    CONSTRAINT "Councillor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Councillor" ADD CONSTRAINT "Councillor_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "Ward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
