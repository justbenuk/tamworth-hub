-- CreateTable
CREATE TABLE "activity-log" (
    "id" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity-log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "activity-log_feature_idx" ON "activity-log"("feature");

-- CreateIndex
CREATE INDEX "activity-log_userId_idx" ON "activity-log"("userId");

-- AddForeignKey
ALTER TABLE "activity-log" ADD CONSTRAINT "activity-log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
