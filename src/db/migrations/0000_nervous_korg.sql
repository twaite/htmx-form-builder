DO $$ BEGIN
 CREATE TYPE "input_type" AS ENUM('text', 'number', 'email');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar DEFAULT 'N/A' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inputs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"label" varchar NOT NULL,
	"placeholder" varchar NOT NULL,
	"type" "input_type" DEFAULT 'text' NOT NULL,
	"form_step_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "step" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"step" integer DEFAULT 1 NOT NULL,
	"form_id" uuid NOT NULL,
	CONSTRAINT "step_form_id_step_unique" UNIQUE("form_id","step")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inputs" ADD CONSTRAINT "inputs_form_step_id_step_id_fk" FOREIGN KEY ("form_step_id") REFERENCES "step"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "step" ADD CONSTRAINT "step_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
