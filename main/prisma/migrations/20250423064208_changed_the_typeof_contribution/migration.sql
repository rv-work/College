/*
  Warnings:

  - The `aktu` column on the `Contribution` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `st` column on the `Contribution` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `youtube` column on the `Contribution` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `notes` column on the `Contribution` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ppt` column on the `Contribution` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Contribution" DROP COLUMN "aktu",
ADD COLUMN     "aktu" TIMESTAMP(3)[],
DROP COLUMN "st",
ADD COLUMN     "st" TIMESTAMP(3)[],
DROP COLUMN "youtube",
ADD COLUMN     "youtube" TIMESTAMP(3)[],
DROP COLUMN "notes",
ADD COLUMN     "notes" TIMESTAMP(3)[],
DROP COLUMN "ppt",
ADD COLUMN     "ppt" TIMESTAMP(3)[];
