-- CreateEnum
CREATE TYPE "Constraints" AS ENUM ('EMAIL_ENDS_WITH');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT;

-- CreateTable
CREATE TABLE "UserRegistrationConstraint" (
    "constaint" "Constraints" NOT NULL,
    "field" TEXT NOT NULL,
    "acceptedValues" TEXT[],

    CONSTRAINT "UserRegistrationConstraint_pkey" PRIMARY KEY ("constaint","field")
);
