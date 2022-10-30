-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "sprintId" UUID;

-- CreateTable
CREATE TABLE "Sprint" (
    "id" UUID NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "majorTargets" TEXT NOT NULL,
    "minorTargets" TEXT NOT NULL,
    "customField" TEXT NOT NULL,
    "projectId" UUID NOT NULL,

    CONSTRAINT "Sprint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "Sprint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sprint" ADD CONSTRAINT "Sprint_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
