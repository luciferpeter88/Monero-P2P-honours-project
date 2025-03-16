/*
  Warnings:

  - You are about to alter the column `trading_fee` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `trading_fee` INTEGER NULL;
