CREATE TABLE `products_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`photo_url` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`created_at` text NOT NULL,
	`price` real NOT NULL,
	`category` text NOT NULL,
	`updated_at` text NOT NULL
);
