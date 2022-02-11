/*
  Warnings:

  - Added the required column `firstProviderLogin` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `firstProviderLogin` BOOLEAN NOT NULL;
