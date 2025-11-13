CREATE TABLE `hts_codes` (
	`hts_code` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`hts_category` text,
	`min_value` real,
	`max_value` real,
	`type` text,
	`duty` real,
	`cost_group` text,
	`hts_product_subtype` text,
	`fixed_duty_per_piece` real,
	`notes` text
);
