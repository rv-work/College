/*
  Warnings:

  - Changed the type of `caseNumber` on the `Case` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Case" DROP COLUMN "caseNumber",
ADD COLUMN     "caseNumber" INTEGER NOT NULL;
