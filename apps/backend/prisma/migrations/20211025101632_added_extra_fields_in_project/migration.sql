/*
  Warnings:

  - Added the required column `extraFields` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visibility` to the `TaskGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "extraFields" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "TaskGroup" ADD COLUMN     "visibility" BOOLEAN NOT NULL;
