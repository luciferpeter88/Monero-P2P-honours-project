/*
  Warnings:

  - You are about to drop the column `contact_user_id` on the `AddressBook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AddressBook` DROP COLUMN `contact_user_id`,
    ADD COLUMN `contact_notes` VARCHAR(191) NULL;
