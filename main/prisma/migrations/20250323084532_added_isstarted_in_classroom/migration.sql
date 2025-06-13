/*
  Warnings:

  - You are about to drop the column `isApproved` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "isStarted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "isApproved";
