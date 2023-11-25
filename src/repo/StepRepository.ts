import { Step } from 'app/entities';
import db, { steps as stepTable } from 'db';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { IEditableRepository } from './types';
import { eq } from 'drizzle-orm';
import { DatabaseError, NotFoundError } from 'app/errors';
import { injectable } from 'inversify';
import { first } from 'lodash-es';

export const insertFormStepSchema = createInsertSchema(stepTable, {
  id: z.string().uuid().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export const updateStepSchema = insertFormStepSchema.partial();
export const selectStepSchema = createSelectSchema(stepTable);

export type InsertStepInput = z.infer<typeof insertFormStepSchema>;
export type UpdateStepInput = z.infer<typeof updateStepSchema>;
export type DBStep = z.infer<typeof selectStepSchema>;

@injectable()
export class StepRepository implements IEditableRepository<Step> {
  private _db = db;

  async get(id: string) {
    const data = await this._db.query.steps.findFirst({
      where: eq(stepTable.id, id),
    });

    if (!data) {
      throw new NotFoundError(`Step with id ${id} not found`);
    }

    return new Step(data);
  }

  withTransaction(trx: unknown) {
    this._db = trx as typeof db;
    return this;
  }

  async getAll() {
    const data = await this._db.query.steps.findMany();

    return data.map(Step.from);
  }

  async getAllByFormId(formId: string) {
    const input = z.string().uuid().parse(formId);

    const results = await this._db.query.steps.findMany({
      where: eq(stepTable.formId, input),
    });

    return results.map(Step.from);
  }

  async create(input: InsertStepInput) {
    const parsedInput = insertFormStepSchema.parse(input);
    const results = await this._db
      .insert(stepTable)
      .values(parsedInput)
      .returning();

    const data = first(results);

    if (!data) {
      throw new DatabaseError('Failed to create step');
    }

    return data;
  }
}
