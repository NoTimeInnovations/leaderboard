-- CreateTable
CREATE TABLE "submission" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "problemId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "submission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
