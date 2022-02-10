/*
  Warnings:

  - You are about to drop the column `password` on the `Users` table. All the data in the column will be lost.
  - Made the column `provider` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `followers` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `likes` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `verifiedSeller` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Users` DROP COLUMN `password`,
    MODIFY `provider` VARCHAR(20) NOT NULL,
    MODIFY `followers` INTEGER NOT NULL,
    MODIFY `likes` INTEGER NOT NULL,
    MODIFY `verifiedSeller` BOOLEAN NOT NULL;
