-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('NEWS', 'CRIME', 'CHARITY', 'JOBS', 'EVENTS', 'COMPANIES', 'UNCATEGORISED');

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "CategoryType" NOT NULL DEFAULT 'UNCATEGORISED',

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);
