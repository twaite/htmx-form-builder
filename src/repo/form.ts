import db, { form as formTable } from "db";
import { v4 as genUUID } from "uuid";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { first } from "lodash-es";
import { eq } from "drizzle-orm";
import { Form } from "app/models";
import { NotFoundError } from "app/errors";

export const insertSchema = createInsertSchema(formTable, {
  id: z.string().uuid().optional(),
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
});

export const updateSchema = insertSchema.partial();

type InsertInput = z.infer<typeof insertSchema>;
type UpdateInput = z.infer<typeof updateSchema>;

function toModel(data: typeof formTable.$inferSelect): Form {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
  };
}

export async function findMany() {
  return (await db.query.form.findMany()).map(toModel);
}

export async function create(input: InsertInput) {
  const parsedInput = insertSchema.parse(input);

  try {
    const results = await db
      .insert(formTable)
      .values({
        id: genUUID(),
        ...parsedInput,
      })
      .returning();

    const data = first(results);

    if (!data) {
      throw new Error("Failed to create form");
    }

    return toModel(data);
  } catch (e) {
    throw e;
  }
}

export async function findByIdThrows(id: string) {
  const data = await db.query.form.findFirst({
    where: eq(formTable.id, id),
  });

  if (data) {
    return toModel(data);
  }

  throw new NotFoundError(`Form with id ${id} not found`);
}

export async function update(id: string, input: UpdateInput) {
  const parsedInput = updateSchema.parse(input);
  return db.update(formTable).set(parsedInput).where(eq(formTable.id, id));
}
