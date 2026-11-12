/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `BusinessCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BusinessCategory_slug_key" ON "BusinessCategory"("slug");
