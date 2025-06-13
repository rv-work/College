/*
  Warnings:

  - A unique constraint covering the columns `[quesNo]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[year]` on the table `ST` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `domain` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `QuestionConnect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `QuestionRevisionConnect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "banner" TEXT;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "domain" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuestionConnect" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "QuestionRevisionConnect" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isStudent" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "rank" INTEGER,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Contribution" (
    "id" TEXT NOT NULL,
    "contributorId" TEXT NOT NULL,
    "aktu" TEXT[],
    "st" TEXT[],
    "youtube" TEXT[],
    "notes" TEXT[],
    "ppt" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "replyContent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Reply_commentId_idx" ON "Reply"("commentId");

-- CreateIndex
CREATE INDEX "Reply_userId_idx" ON "Reply"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Question_quesNo_key" ON "Question"("quesNo");

-- CreateIndex
CREATE UNIQUE INDEX "Question_slug_key" ON "Question"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ST_year_key" ON "ST"("year");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "User"("admissionNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("admissionNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("admissionNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
