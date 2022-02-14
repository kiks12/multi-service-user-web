-- CreateTable
CREATE TABLE `Services` (
    `serviceId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `serviceDetails` VARCHAR(255) NOT NULL,
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
