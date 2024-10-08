/*
  Warnings:

  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "restrictedToRoles" "Role"[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isActive";
