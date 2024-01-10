/*
  Warnings:

  - You are about to drop the column `user_id` on the `TeamMemberInfo` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `TesterInfo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeamMemberInfo" DROP CONSTRAINT "TeamMemberInfo_user_id_fkey";

-- DropForeignKey
ALTER TABLE "TesterInfo" DROP CONSTRAINT "TesterInfo_user_id_fkey";

-- DropIndex
DROP INDEX "TeamMemberInfo_user_id_key";

-- DropIndex
DROP INDEX "TesterInfo_user_id_key";

-- AlterTable
ALTER TABLE "TeamMemberInfo" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "TesterInfo" DROP COLUMN "user_id";

-- AddForeignKey
ALTER TABLE "TeamMemberInfo" ADD CONSTRAINT "TeamMemberInfo_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TesterInfo" ADD CONSTRAINT "TesterInfo_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
