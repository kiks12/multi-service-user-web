/*
  Warnings:

  - Added the required column `category` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Services` ADD COLUMN `category` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `Images` (
    `imageId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Images_imageId_key`(`imageId`),
    UNIQUE INDEX `Images_path_key`(`path`),
    PRIMARY KEY (`imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Services`(`serviceId`) ON DELETE RESTRICT ON UPDATE CASCADE;
