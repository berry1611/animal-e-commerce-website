/*
  Warnings:

  - You are about to drop the column `animalId` on the `races` table. All the data in the column will be lost.
  - Added the required column `animal_id` to the `races` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `races` DROP FOREIGN KEY `races_animalId_fkey`;

-- AlterTable
ALTER TABLE `races` DROP COLUMN `animalId`,
    ADD COLUMN `animal_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `pets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL DEFAULT 0,
    `gender` ENUM('male', 'female') NULL,
    `weight` VARCHAR(191) NULL,
    `height` VARCHAR(191) NULL,
    `date_of_birth` DATETIME(3) NULL,
    `description` TEXT NULL,
    `race_id` INTEGER NOT NULL,
    `animal_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `races` ADD CONSTRAINT `races_animal_id_fkey` FOREIGN KEY (`animal_id`) REFERENCES `animals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `pets_animal_id_fkey` FOREIGN KEY (`animal_id`) REFERENCES `animals`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `pets_race_id_fkey` FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
