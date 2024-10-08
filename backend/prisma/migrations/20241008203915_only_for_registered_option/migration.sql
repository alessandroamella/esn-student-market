/*
  Warnings:

  - You are about to drop the column `restrictedToRoles` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "restrictedToRoles",
ADD COLUMN     "onlyForRegistered" BOOLEAN NOT NULL DEFAULT false;
