/*
  Warnings:

  - Made the column `birthdate` on table `Astronaut` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Astronaut" ALTER COLUMN "birthdate" SET NOT NULL;
