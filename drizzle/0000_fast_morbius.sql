CREATE TABLE `articles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`school` text NOT NULL,
	`category` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`channel` text DEFAULT 'site' NOT NULL,
	`body` text DEFAULT '' NOT NULL,
	`views` integer DEFAULT 0 NOT NULL,
	`read_time` integer DEFAULT 5 NOT NULL,
	`published_at` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`article_id` integer,
	`kind` text NOT NULL,
	`source` text NOT NULL,
	`created_at` text NOT NULL
);
