/*
  Warnings:

  - You are about to drop the column `field1` on the `TaskLog` table. All the data in the column will be lost.
  - You are about to drop the column `field2` on the `TaskLog` table. All the data in the column will be lost.
  - You are about to drop the column `fieldItem1` on the `TaskLog` table. All the data in the column will be lost.
  - You are about to drop the column `fieldItem2` on the `TaskLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TaskLog" DROP COLUMN "field1",
DROP COLUMN "field2",
DROP COLUMN "fieldItem1",
DROP COLUMN "fieldItem2";

-- CreateTable
CREATE TABLE "TaskLogItem" (
    "id" UUID NOT NULL,
    "field" TEXT NOT NULL,
    "fieldItem" TEXT NOT NULL,

    CONSTRAINT "TaskLogItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskLogToTaskLogItem" (
    "taskLogId" UUID NOT NULL,
    "taskLogItemId" UUID NOT NULL,

    CONSTRAINT "TaskLogToTaskLogItem_pkey" PRIMARY KEY ("taskLogId","taskLogItemId")
);

-- AddForeignKey
ALTER TABLE "TaskLogToTaskLogItem" ADD CONSTRAINT "TaskLogToTaskLogItem_taskLogId_fkey" FOREIGN KEY ("taskLogId") REFERENCES "TaskLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskLogToTaskLogItem" ADD CONSTRAINT "TaskLogToTaskLogItem_taskLogItemId_fkey" FOREIGN KEY ("taskLogItemId") REFERENCES "TaskLogItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
