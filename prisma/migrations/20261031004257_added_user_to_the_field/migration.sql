-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT 'NXJiJ2nXpm6GL8tGzJLYo0tWbb6NaH5e';

-- CreateIndex
CREATE INDEX "Event_userId_idx" ON "Event"("userId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
