/*
  Warnings:

  - Added the required column `project_name` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "project_name" TEXT NOT NULL;
