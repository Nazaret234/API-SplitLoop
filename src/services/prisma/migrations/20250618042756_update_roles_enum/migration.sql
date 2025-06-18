-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'OWNER';

-- AlterTable
ALTER TABLE "Groups" ALTER COLUMN "inviteCode" SET DEFAULT substring(replace(gen_random_uuid()::text, '-', ''), 1, 8);
