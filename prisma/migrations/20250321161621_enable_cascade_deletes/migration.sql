-- DropForeignKey
ALTER TABLE `AddressBook` DROP FOREIGN KEY `AddressBook_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Feedback` DROP FOREIGN KEY `Feedback_from_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Feedback` DROP FOREIGN KEY `Feedback_to_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_recipient_id_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_sender_id_fkey`;

-- DropForeignKey
ALTER TABLE `Monero_Account` DROP FOREIGN KEY `Monero_Account_user_table_id_fkey`;

-- DropForeignKey
ALTER TABLE `Subaddress` DROP FOREIGN KEY `Subaddress_account_id_fkey`;

-- DropForeignKey
ALTER TABLE `Support_Tickets` DROP FOREIGN KEY `Support_Tickets_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Authorized_IPs` DROP FOREIGN KEY `User_Authorized_IPs_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Devices` DROP FOREIGN KEY `User_Devices_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Notifications` DROP FOREIGN KEY `User_Notifications_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Security` DROP FOREIGN KEY `User_Security_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `User_Settings` DROP FOREIGN KEY `User_Settings_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `AddressBook` ADD CONSTRAINT `AddressBook_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_from_user_id_fkey` FOREIGN KEY (`from_user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_to_user_id_fkey` FOREIGN KEY (`to_user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_recipient_id_fkey` FOREIGN KEY (`recipient_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Monero_Account` ADD CONSTRAINT `Monero_Account_user_table_id_fkey` FOREIGN KEY (`user_table_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subaddress` ADD CONSTRAINT `Subaddress_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `Monero_Account`(`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Support_Tickets` ADD CONSTRAINT `Support_Tickets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Authorized_IPs` ADD CONSTRAINT `User_Authorized_IPs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Devices` ADD CONSTRAINT `User_Devices_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Notifications` ADD CONSTRAINT `User_Notifications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Security` ADD CONSTRAINT `User_Security_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Settings` ADD CONSTRAINT `User_Settings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
