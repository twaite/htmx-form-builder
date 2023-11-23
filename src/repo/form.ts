import db, { form } from "db";
import { v4 as genUUID } from "uuid";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
const insertSchema = createInsertSchema(form, {
  id: z.string().uuid().optional(),
});
type InsertInput = z.infer<typeof insertSchema>;

export function findMany() {
  return db.query.form.findMany();
}

export function create(input: InsertInput) {
  const parsedInput = insertSchema.parse(input);

  return db
    .insert(form)
    .values({
      id: genUUID(),
      ...parsedInput,
    })
    .returning();
}
