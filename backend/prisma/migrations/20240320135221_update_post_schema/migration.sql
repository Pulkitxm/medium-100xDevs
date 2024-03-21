/*
  Warnings:

  - You are about to drop the column `imgLink` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imgLink",
DROP COLUMN "published";
