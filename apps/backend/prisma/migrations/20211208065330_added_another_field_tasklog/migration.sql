/*
  Warnings:

  - You are about to drop the column `field` on the `TaskLog` table. All the data in the column will be lost.
  - You are about to drop the column `fieldItem` on the `TaskLog` table. All the data in the column will be lost.
  - Added the required column `field1` to the `TaskLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `field2` to the `TaskLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fieldItem1` to the `TaskLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fieldItem2` to the `TaskLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskLog" DROP COLUMN "field",
DROP COLUMN "fieldItem",
ADD COLUMN     "field1" TEXT NOT NULL,
ADD COLUMN     "field2" TEXT NOT NULL,
ADD COLUMN     "fieldItem1" TEXT NOT NULL,
ADD COLUMN     "fieldItem2" TEXT NOT NULL;
