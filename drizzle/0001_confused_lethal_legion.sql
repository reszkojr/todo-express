CREATE TYPE "public"."status" AS ENUM('pending', 'in progress', 'completed');--> statement-breakpoint
ALTER TABLE "todo" ADD COLUMN "status" "status" DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE "todo" DROP COLUMN "completed";--> statement-breakpoint
ALTER TABLE "todo" DROP COLUMN "due_date";--> statement-breakpoint
ALTER TABLE "todo" DROP COLUMN "updated_at";