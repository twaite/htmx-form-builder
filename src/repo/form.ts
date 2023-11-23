import db, { form } from "db";
import { v4 as genUUID } from "uuid";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { first } from "lodash-es";
import { eq } from "drizzle-orm";

export const insertSchema = createInsertSchema(form, {
  id: z.string().uuid().optional(),
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
});

type InsertInput = z.infer<typeof insertSchema>;

export function findMany() {
  return db.query.form.findMany();
}

export async function create(input: InsertInput) {
  const parsedInput = insertSchema.parse(input);

  try {
    const results = await db
      .insert(form)
      .values({
        id: genUUID(),
        ...parsedInput,
      })
      .returning();

    const data = first(results);

    if (!data) {
      throw new Error("Failed to create form");
    }

    return data;
  } catch (e) {
    throw e;
  }
}

export function findById(id: string) {
  return db.query.form.findFirst({
    where: eq(form.id, id),
  });
}
