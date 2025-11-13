CREATE TABLE `inland_parameters` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`inland_type` text,
	`port` text,
	`country` text,
	`start_date` text,
	`end_date` text DEFAULT '2100-01-01T00:00:00Z',
	`zip_code` integer,
	`value` real,
	`cost_group` text,
	`user` text
);
