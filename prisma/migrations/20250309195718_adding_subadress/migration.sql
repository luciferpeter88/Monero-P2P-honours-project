/*
  Warnings:

  - Added the required column `adressIndex` to the `Subaddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Subaddress` ADD COLUMN `adressIndex` INTEGER NOT NULL;
