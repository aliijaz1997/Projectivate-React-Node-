/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagsOnTasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_projectId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnTasks" DROP CONSTRAINT "TagsOnTasks_tagId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnTasks" DROP CONSTRAINT "TagsOnTasks_taskId_fkey";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "TagsOnTasks";
