/*
  Warnings:

  - Added the required column `sprintSpan` to the `Sprint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sprint" ADD COLUMN     "sprintSpan" TEXT NOT NULL,
ALTER COLUMN "customField" DROP NOT NULL;
