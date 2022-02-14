/*
  Warnings:

  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `services` DROP FOREIGN KEY `Services_userId_fkey`;

-- DropTable
DROP TABLE `services`;

-- CreateTable
CREATE TABLE `Services` (
    `serviceId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `serviceDetails` VARCHAR(255) NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `priceType` VARCHAR(15) NOT NULL,
    `priceInitial` INTEGER NOT NULL,
    `priceFinal` INTEGER NULL,
    `dislikes` INTEGER NOT NULL,
    `likes` INTEGER NOT NULL,
    `ratings` DOUBLE NOT NULL,

    UNIQUE INDEX `Services_serviceId_key`(`serviceId`),
    PRIMARY KEY (`serviceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Services` ADD CONSTRAINT `Services_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
