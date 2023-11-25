ALTER TABLE "inputs" RENAME COLUMN "form_step_id" TO "step_id";--> statement-breakpoint
ALTER TABLE "inputs" DROP CONSTRAINT "inputs_form_step_id_step_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inputs" ADD CONSTRAINT "inputs_step_id_step_id_fk" FOREIGN KEY ("step_id") REFERENCES "step"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
