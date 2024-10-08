/*
  Warnings:

  - You are about to drop the column `resetExpiry` on the `LocalAuth` table. All the data in the column will be lost.
  - You are about to drop the column `tokenExpiry` on the `LocalAuth` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LocalAuth" DROP COLUMN "resetExpiry",
DROP COLUMN "tokenExpiry";
