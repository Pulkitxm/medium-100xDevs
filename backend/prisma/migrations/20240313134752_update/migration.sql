/*
  Warnings:

  - Added the required column `date` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgLink` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "imgLink" TEXT NOT NULL;
