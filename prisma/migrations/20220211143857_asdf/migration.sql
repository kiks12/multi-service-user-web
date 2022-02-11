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
    `provider` VARCHAR(20) NOT NULL,
    `image` VARCHAR(255) NULL,
    `cover` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `contact` VARCHAR(255) NULL,
    `skills` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `followers` INTEGER NOT NULL,
    `likes` INTEGER NOT NULL,
    `verifiedProvider` BOOLEAN NOT NULL,
    `firstLogin` BOOLEAN NOT NULL,
    `firstProviderLogin` BOOLEAN NOT NULL,

    UNIQUE INDEX `Users_userId_key`(`userId`),
    UNIQUE INDEX `Users_username_key`(`username`),
    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
