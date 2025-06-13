/*
  Warnings:

  - You are about to drop the `EventConnect` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventConnect" DROP CONSTRAINT "EventConnect_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventConnect" DROP CONSTRAINT "EventConnect_userId_fkey";

-- DropTable
DROP TABLE "EventConnect";

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "admissionNumber" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "isTeam" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRegister" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "registerId" TEXT NOT NULL,

    CONSTRAINT "UserRegister_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRegister_userId_registerId_key" ON "UserRegister"("userId", "registerId");

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRegister" ADD CONSTRAINT "UserRegister_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("admissionNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRegister" ADD CONSTRAINT "UserRegister_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
