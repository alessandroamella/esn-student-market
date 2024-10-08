/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `LocalAuth` table. All the data in the column will be lost.
  - Added the required column `hashedPw` to the `LocalAuth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LocalAuth" DROP COLUMN "passwordHash",
ADD COLUMN     "hashedPw" TEXT NOT NULL;
