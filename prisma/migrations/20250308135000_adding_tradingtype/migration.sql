-- AlterTable
ALTER TABLE `Transaction` MODIFY `status` ENUM('pending', 'confirmed', 'rejected') NOT NULL DEFAULT 'pending';
