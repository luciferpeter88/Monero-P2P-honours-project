/*
  Warnings:

  - You are about to drop the column `balance` on the `Monero_Account` table. All the data in the column will be lost.
  - You are about to drop the column `unlocked_balance` on the `Monero_Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Monero_Account` DROP COLUMN `balance`,
    DROP COLUMN `unlocked_balance`;
