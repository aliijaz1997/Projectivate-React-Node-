-- DropForeignKey
ALTER TABLE "TaskLogToTaskLogItem" DROP CONSTRAINT "TaskLogToTaskLogItem_taskLogId_fkey";

-- DropForeignKey
ALTER TABLE "TaskLogToTaskLogItem" DROP CONSTRAINT "TaskLogToTaskLogItem_taskLogItemId_fkey";

-- AddForeignKey
ALTER TABLE "TaskLogToTaskLogItem" ADD CONSTRAINT "TaskLogToTaskLogItem_taskLogId_fkey" FOREIGN KEY ("taskLogId") REFERENCES "TaskLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskLogToTaskLogItem" ADD CONSTRAINT "TaskLogToTaskLogItem_taskLogItemId_fkey" FOREIGN KEY ("taskLogItemId") REFERENCES "TaskLogItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
