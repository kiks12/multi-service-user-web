/*
  Warnings:

  - Added the required column `firstLogin` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Users` ADD COLUMN `firstLogin` BOOLEAN NOT NULL,
    MODIFY `username` VARCHAR(50) NULL;
