/*
  Warnings:

  - You are about to drop the column `hashedPw` on the `LocalAuth` table. All the data in the column will be lost.
  - Added the required column `hashedPwd` to the `LocalAuth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LocalAuth" DROP COLUMN "hashedPw",
ADD COLUMN     "hashedPwd" TEXT NOT NULL;
