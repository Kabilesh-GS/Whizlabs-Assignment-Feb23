/*
  Warnings:

  - You are about to drop the column `ownerID` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_ownerID_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "ownerID";

-- CreateTable
CREATE TABLE "userTask" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "taskID" INTEGER NOT NULL,

    CONSTRAINT "userTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userTask" ADD CONSTRAINT "userTask_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userTask" ADD CONSTRAINT "userTask_taskID_fkey" FOREIGN KEY ("taskID") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
