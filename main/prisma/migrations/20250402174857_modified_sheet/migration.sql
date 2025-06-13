/*
  Warnings:

  - The `input` column on the `Case` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `dsaId` on the `Sheet` table. All the data in the column will be lost.
  - You are about to drop the `App` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Blockchain` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DSA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LanguageLearning` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Web` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `caseNumber` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `constraint` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leetcode` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quesNo` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LanguageLearning" DROP CONSTRAINT "LanguageLearning_dsaId_fkey";

-- DropForeignKey
ALTER TABLE "Sheet" DROP CONSTRAINT "Sheet_dsaId_fkey";

-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "caseNumber" TEXT NOT NULL,
ADD COLUMN     "explanation" TEXT,
DROP COLUMN "input",
ADD COLUMN     "input" TEXT[];

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "constraint" TEXT NOT NULL,
ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "leetcode" TEXT NOT NULL,
ADD COLUMN     "quesNo" INTEGER NOT NULL,
ADD COLUMN     "tags" TEXT[];

-- AlterTable
ALTER TABLE "Sheet" DROP COLUMN "dsaId";

-- DropTable
DROP TABLE "App";

-- DropTable
DROP TABLE "Blockchain";

-- DropTable
DROP TABLE "DSA";

-- DropTable
DROP TABLE "LanguageLearning";

-- DropTable
DROP TABLE "Web";

-- CreateTable
CREATE TABLE "TemplateCode" (
    "questionId" TEXT NOT NULL,
    "Python" TEXT NOT NULL,
    "Java" TEXT NOT NULL,
    "Cpp" TEXT NOT NULL,

    CONSTRAINT "TemplateCode_pkey" PRIMARY KEY ("questionId")
);

-- CreateTable
CREATE TABLE "WrapperCode" (
    "questionId" TEXT NOT NULL,
    "Python" TEXT NOT NULL,
    "Java" TEXT NOT NULL,
    "Cpp" TEXT NOT NULL,

    CONSTRAINT "WrapperCode_pkey" PRIMARY KEY ("questionId")
);

-- AddForeignKey
ALTER TABLE "TemplateCode" ADD CONSTRAINT "TemplateCode_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WrapperCode" ADD CONSTRAINT "WrapperCode_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
