/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "mediaId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "media" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "alt" TEXT,
    "caption" TEXT,
    "folder" TEXT,
    "tags" TEXT[],
    "uploadedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Business_slug_key" ON "Business"("slug");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
