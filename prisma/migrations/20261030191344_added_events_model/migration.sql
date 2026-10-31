-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('FAMILY_KIDS', 'MUSIC_NIGHTLIFE', 'MARKETS_SHOPPING', 'FOOD_DRINK', 'ARTS_CULTURE', 'SPORTS_FITNESS', 'COMMUNITY_CHARITY', 'FESTIVALS_FAIRS');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'PENDING', 'PUBLISHED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "category" "EventCategory" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "venue" TEXT NOT NULL,
    "address" TEXT,
    "postcode" TEXT,
    "organiser" TEXT,
    "websiteUrl" TEXT,
    "isFree" BOOLEAN NOT NULL DEFAULT true,
    "price" TEXT,
    "status" "EventStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE INDEX "Event_startDate_status_idx" ON "Event"("startDate", "status");

-- CreateIndex
CREATE INDEX "Event_category_idx" ON "Event"("category");
