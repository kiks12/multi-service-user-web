/*
  Warnings:

  - A unique constraint covering the columns `[accessToken]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Users_accessToken_key` ON `Users`(`accessToken`);
