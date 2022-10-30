-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "previousSprints" JSONB NOT NULL DEFAULT E'{}';
