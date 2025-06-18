/*
  Warnings:

  - Added the required column `createdById` to the `Groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Groups` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MEMBER', 'ADMIN');

-- AlterTable
ALTER TABLE "Groups" ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "inviteCode" SET DEFAULT substring(replace(gen_random_uuid()::text, '-', ''), 1, 8);

-- AlterTable
ALTER TABLE "GroupsMembers" ADD COLUMN     "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "image" TEXT;

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
