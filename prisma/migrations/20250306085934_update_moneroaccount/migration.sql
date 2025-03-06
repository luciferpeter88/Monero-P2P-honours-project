/*
  Warnings:

  - Added the required column `account_address` to the `Monero_Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_index` to the `Monero_Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Monero_Account` ADD COLUMN `account_address` VARCHAR(191) NOT NULL,
    ADD COLUMN `account_index` INTEGER NOT NULL;
