/*
  Warnings:

  - Added the required column `accessToken` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Users` ADD COLUMN `accessToken` VARCHAR(255) NOT NULL;
