/*
  Warnings:

  - Added the required column `status` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `services` ADD COLUMN `status` VARCHAR(10) NOT NULL;
