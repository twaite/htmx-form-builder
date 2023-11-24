import { Form } from 'app/models';
import db, { form as formTable } from 'db';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { IEditableRepository } from './types';
import { eq } from 'drizzle-orm';
import { NotFoundError } from 'elysia';
import { first } from 'lodash-es';

export const insertFormSchema = createInsertSchema(formTable, {
  id: z.string().uuid().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export const updateFormSchema = insertFormSchema.partial();
export const selectFormSchema = createSelectSchema(formTable);

export type InsertFormInput = z.infer<typeof insertFormSchema>;
export type UpdateFormInput = z.infer<typeof updateFormSchema>;
export type DBForm = z.infer<typeof selectFormSchema>;

class FormRepository implements IEditableRepository<Form, DBForm> {
  toModel(data: DBForm) {
    return {
      ...data,
    };
  }

  async get(id: string) {
    const data = await db.query.form.findFirst({
      where: eq(formTable.id, id),
    });

    if (!data) {
      throw new NotFoundError(`Form with id ${id} not found`);
    }

    return this.toModel(data);
  }

  async getAll() {
    const data = await db.query.form.findMany();
    return data.map(this.toModel);
  }

  async create(input: InsertFormInput) {
    const results = await db.insert(formTable).values(input).returning();

    const data = first(results);

    if (!data) {
      throw new Error('Failed to create form');
    }

    return data;
  }

  async update(id: string, input: UpdateFormInput) {
    const parsedInput = updateFormSchema.parse(input);
    const results = await db
      .update(formTable)
      .set(parsedInput)
      .where(eq(formTable.id, id))
      .returning();

    const data = first(results);

    if (!data) {
      throw new Error('Failed to update form');
    }

    return this.toModel(data);
  }
}

export default new FormRepository();
