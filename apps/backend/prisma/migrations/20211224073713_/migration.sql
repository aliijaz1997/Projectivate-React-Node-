/*
  Warnings:

  - You are about to drop the column `prefrences` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "prefrences",
ADD COLUMN     "preferences" JSONB NOT NULL DEFAULT E'{}';
