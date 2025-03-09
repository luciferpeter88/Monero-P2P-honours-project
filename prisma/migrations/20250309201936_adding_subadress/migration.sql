/*
  Warnings:

  - You are about to drop the column `adressIndex` on the `Subaddress` table. All the data in the column will be lost.
  - Added the required column `addressIndex` to the `Subaddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Subaddress` DROP COLUMN `adressIndex`,
    ADD COLUMN `addressIndex` INTEGER NOT NULL;
