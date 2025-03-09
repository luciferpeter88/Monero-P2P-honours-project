/*
  Warnings:

  - You are about to drop the column `addressIndex` on the `Subaddress` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `Subaddress` table. All the data in the column will be lost.
  - Added the required column `address_index` to the `Subaddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Subaddress` DROP COLUMN `addressIndex`,
    DROP COLUMN `label`,
    ADD COLUMN `address_index` INTEGER NOT NULL;
