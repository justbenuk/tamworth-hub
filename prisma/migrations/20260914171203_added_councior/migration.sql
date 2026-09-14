-- CreateTable
CREATE TABLE "Councilor" (
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

    CONSTRAINT "Councilor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Councilor" ADD CONSTRAINT "Councilor_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "Ward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
