/*
  Warnings:

  - You are about to drop the column `extraFields` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `extraFields` on the `Task` table. All the data in the column will be lost.
  - Added the required column `customFields` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customFields` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "extraFields",
ADD COLUMN     "customFields" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "extraFields",
ADD COLUMN     "customFields" JSONB NOT NULL;
