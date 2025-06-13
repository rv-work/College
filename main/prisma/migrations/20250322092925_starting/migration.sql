-- CreateTable
CREATE TABLE "User" (
    "admissionNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT,
    "password" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profilePicture" TEXT,
    "bio" TEXT,
    "contest" INTEGER,
    "rating" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("admissionNumber")
);

-- CreateTable
CREATE TABLE "EventConnect" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "EventConnect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionConnect" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "QuestionConnect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionRevisionConnect" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "QuestionRevisionConnect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "banner" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "team" INTEGER NOT NULL,
    "priceSolo" INTEGER NOT NULL,
    "priceTeam" INTEGER,
    "status" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassroomConnect" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,

    CONSTRAINT "ClassroomConnect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DSA" (
    "id" TEXT NOT NULL,

    CONSTRAINT "DSA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguageLearning" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "links" TEXT[],
    "dsaId" TEXT NOT NULL,

    CONSTRAINT "LanguageLearning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sheet" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "dsaId" TEXT NOT NULL,

    CONSTRAINT "Sheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sheetId" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "levelId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Web" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "topic" TEXT NOT NULL,

    CONSTRAINT "Web_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "App" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "topic" TEXT NOT NULL,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blockchain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "topic" TEXT NOT NULL,

    CONSTRAINT "Blockchain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Year" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "branchId" TEXT NOT NULL,

    CONSTRAINT "Year_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "yearId" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "topics" TEXT[],
    "youtube" TEXT[],
    "notes" TEXT[],
    "ppt" TEXT[],
    "important" TEXT[],
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ST" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "ST_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paper" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "stId" TEXT NOT NULL,

    CONSTRAINT "Paper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AKTU" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "file" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "AKTU_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_admissionNumber_key" ON "User"("admissionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EventConnect_userId_eventId_key" ON "EventConnect"("userId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionConnect_userId_questionId_key" ON "QuestionConnect"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionRevisionConnect_userId_questionId_key" ON "QuestionRevisionConnect"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_roomId_key" ON "Classroom"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "ClassroomConnect_userId_classId_key" ON "ClassroomConnect"("userId", "classId");

-- AddForeignKey
ALTER TABLE "EventConnect" ADD CONSTRAINT "EventConnect_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("admissionNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventConnect" ADD CONSTRAINT "EventConnect_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionConnect" ADD CONSTRAINT "QuestionConnect_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("admissionNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionConnect" ADD CONSTRAINT "QuestionConnect_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionRevisionConnect" ADD CONSTRAINT "QuestionRevisionConnect_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("admissionNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionRevisionConnect" ADD CONSTRAINT "QuestionRevisionConnect_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("admissionNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("admissionNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomConnect" ADD CONSTRAINT "ClassroomConnect_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("admissionNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomConnect" ADD CONSTRAINT "ClassroomConnect_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageLearning" ADD CONSTRAINT "LanguageLearning_dsaId_fkey" FOREIGN KEY ("dsaId") REFERENCES "DSA"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sheet" ADD CONSTRAINT "Sheet_dsaId_fkey" FOREIGN KEY ("dsaId") REFERENCES "DSA"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Level" ADD CONSTRAINT "Level_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Sheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Year" ADD CONSTRAINT "Year_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ST" ADD CONSTRAINT "ST_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paper" ADD CONSTRAINT "Paper_stId_fkey" FOREIGN KEY ("stId") REFERENCES "ST"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKTU" ADD CONSTRAINT "AKTU_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
