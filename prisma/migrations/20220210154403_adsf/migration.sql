-- AlterTable
ALTER TABLE `Users` ADD COLUMN `cover` VARCHAR(255) NULL,
    ADD COLUMN `description` VARCHAR(255) NULL,
    ADD COLUMN `followers` INTEGER NULL,
    ADD COLUMN `likes` INTEGER NULL,
    ADD COLUMN `skills` VARCHAR(255) NULL,
    ADD COLUMN `verifiedSeller` BOOLEAN NULL;
