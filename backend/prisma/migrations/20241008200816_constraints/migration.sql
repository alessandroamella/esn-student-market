/*
  Warnings:

  - The values [DOMAIN_RESTRICTION,USERNAME_PATTERN] on the enum `Constraints` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `createdAt` on the `UserRegistrationConstraint` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserRegistrationConstraint` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Constraints_new" AS ENUM ('EMAIL_ENDS_WITH');
ALTER TABLE "UserRegistrationConstraint" ALTER COLUMN "constraint" TYPE "Constraints_new" USING ("constraint"::text::"Constraints_new");
ALTER TYPE "Constraints" RENAME TO "Constraints_old";
ALTER TYPE "Constraints_new" RENAME TO "Constraints";
DROP TYPE "Constraints_old";
COMMIT;

-- AlterTable
ALTER TABLE "UserRegistrationConstraint" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
