/*
  Warnings:

  - Added the required column `name` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Users_role_id_key";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "name" TEXT;
