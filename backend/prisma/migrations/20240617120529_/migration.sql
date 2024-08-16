/*
  Warnings:

  - The primary key for the `UserRegistrationConstraint` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `constaint` on the `UserRegistrationConstraint` table. All the data in the column will be lost.
  - Added the required column `constraint` to the `UserRegistrationConstraint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserRegistrationConstraint" DROP CONSTRAINT "UserRegistrationConstraint_pkey",
DROP COLUMN "constaint",
ADD COLUMN     "constraint" "Constraints" NOT NULL,
ADD CONSTRAINT "UserRegistrationConstraint_pkey" PRIMARY KEY ("constraint", "field");
