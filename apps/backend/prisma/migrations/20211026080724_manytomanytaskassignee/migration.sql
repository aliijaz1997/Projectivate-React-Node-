/*
  Warnings:

  - You are about to drop the column `assigneeId` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assigneeId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "assigneeId";

-- CreateTable
CREATE TABLE "AssigneesOnTask" (
    "taskId" UUID NOT NULL,
    "assigneeId" TEXT NOT NULL,

    CONSTRAINT "AssigneesOnTask_pkey" PRIMARY KEY ("taskId","assigneeId")
);

-- AddForeignKey
ALTER TABLE "AssigneesOnTask" ADD CONSTRAINT "AssigneesOnTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssigneesOnTask" ADD CONSTRAINT "AssigneesOnTask_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
