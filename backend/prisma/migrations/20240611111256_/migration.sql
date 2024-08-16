/*
  Warnings:

  - You are about to drop the column `image` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - Added the required column `sold` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validUntil` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telegramId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'OWNER');

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "sold" BOOLEAN NOT NULL,
ADD COLUMN     "validUntil" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "telegramId" TEXT NOT NULL;
