/*
  Warnings:

  - You are about to drop the column `is_read` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Message` DROP COLUMN `is_read`,
    DROP COLUMN `subject`;
