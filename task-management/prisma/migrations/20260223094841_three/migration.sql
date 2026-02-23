/*
  Warnings:

  - You are about to drop the `userTask` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerID` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "userTask" DROP CONSTRAINT "userTask_taskID_fkey";

-- DropForeignKey
ALTER TABLE "userTask" DROP CONSTRAINT "userTask_userID_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "ownerID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "userTask";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
