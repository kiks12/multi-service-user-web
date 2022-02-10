/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `Users` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NULL,
    `email` VARCHAR(100) NOT NULL,
    `provider` VARCHAR(20) NULL,
    `image` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `contact` VARCHAR(255) NULL,
    `firstLogin` BOOLEAN NOT NULL,

    UNIQUE INDEX `Users_userId_key`(`userId`),
    UNIQUE INDEX `Users_username_key`(`username`),
    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
