import { Form } from 'app/entities';
import db, { forms as formTable } from 'db';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { IEditableRepository } from './types';
import { eq } from 'drizzle-orm';
import { DatabaseError, NotFoundError } from 'app/errors';
import { first } from 'lodash-es';
import { StepRepository } from './StepRepository';
import { inject, injectable } from 'inversify';

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

@injectable()
export class FormRepository implements IEditableRepository<Form> {
  private readonly _stepRepository: StepRepository;
  private _db = db;

  constructor(@inject(StepRepository) stepRepository: StepRepository) {
    this._stepRepository = stepRepository;
  }

  withTransaction(trx: unknown) {
    this._db = trx as typeof db;
    return this;
  }

  async get(id: string) {
    const data = await this._db.query.forms.findFirst({
      with: {
        steps: true,
      },
      where: eq(formTable.id, id),
    });

    if (!data) {
      throw new NotFoundError(`Form with id ${id} not found`);
    }

    return new Form(data);
  }

  async getAll() {
    const data = await this._db.query.forms.findMany();

    return data.map((d) => Form.from(d));
  }

  async create(input: InsertFormInput) {
    return this._db.transaction(async (trx) => {
      const results = await trx.insert(formTable).values(input).returning();
      const data = first(results);

      if (!data) {
        throw new DatabaseError('Failed to create step');
      }

      await this._stepRepository.withTransaction(trx).create({
        formId: data.id,
        number: 0,
      });

      return new Form(data);
    });
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

    return new Form(data);
  }
}
