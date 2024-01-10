/*
  Warnings:

  - Added the required column `bug_status` to the `Bug` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BugStatus" AS ENUM ('ToDo', 'InProgress', 'Verification', 'VerificationDone', 'Done', 'ClosedIssue');

-- AlterTable
ALTER TABLE "Bug" ADD COLUMN     "bug_status" "BugStatus" NOT NULL,
ALTER COLUMN "test_steps" DROP NOT NULL;
