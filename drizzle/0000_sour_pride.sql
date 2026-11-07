CREATE TABLE `bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`booking_code` text NOT NULL,
	`created_at` integer NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`name` text NOT NULL,
	`contact_method` text NOT NULL,
	`contact` text NOT NULL,
	`adults` integer NOT NULL,
	`children` integer DEFAULT 0 NOT NULL,
	`gender` text NOT NULL,
	`preferred_date` text NOT NULL,
	`preferred_time` text NOT NULL,
	`service` text NOT NULL,
	`duration` text NOT NULL,
	`notes` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bookings_booking_code_unique` ON `bookings` (`booking_code`);