-- DropForeignKey
ALTER TABLE "activity-log" DROP CONSTRAINT "activity-log_userId_fkey";

-- AddForeignKey
ALTER TABLE "activity-log" ADD CONSTRAINT "activity-log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
