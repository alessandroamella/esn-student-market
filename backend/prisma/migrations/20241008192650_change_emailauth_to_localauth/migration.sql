/*
  Warnings:

  - You are about to drop the `EmailAuth` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmailAuth" DROP CONSTRAINT "EmailAuth_userId_fkey";

-- DropTable
DROP TABLE "EmailAuth";

-- CreateTable
CREATE TABLE "LocalAuth" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifyToken" TEXT,
    "tokenExpiry" TIMESTAMP(3),
    "resetToken" TEXT,
    "resetExpiry" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LocalAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LocalAuth_email_key" ON "LocalAuth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LocalAuth_userId_key" ON "LocalAuth"("userId");

-- AddForeignKey
ALTER TABLE "LocalAuth" ADD CONSTRAINT "LocalAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
