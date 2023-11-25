import { Step } from 'app/models';
import db, { step as stepTable } from 'db';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { IReadableRepository } from './types';
import { eq } from 'drizzle-orm';
import { NotFoundError } from 'app/errors';
import { injectable } from 'inversify';

export const insertFormStepSchema = createInsertSchema(stepTable, {
  id: z.string().uuid().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export const updateFormStepSchema = insertFormStepSchema.partial();
export const selectFormStepSchema = createSelectSchema(stepTable);

export type InsertFormStepInput = z.infer<typeof insertFormStepSchema>;
export type UpdateFormStepInput = z.infer<typeof updateFormStepSchema>;
export type DBFormStep = z.infer<typeof selectFormStepSchema>;

@injectable()
export class StepRepository implements IReadableRepository<Step> {
  async get(id: string) {
    const data = await db.query.step.findFirst({
      where: eq(stepTable.id, id),
    });

    if (!data) {
      throw new NotFoundError(`Step with id ${id} not found`);
    }

    return new Step(data);
  }

  async getAll() {
    const data = await db.query.step.findMany();

    return data.map(Step.from);
  }

  async getAllByFormId(formId: string) {
    const input = z.string().uuid().parse(formId);

    const results = await db.query.step.findMany({
      where: eq(stepTable.formId, input),
    });

    return results.map(Step.from);
  }
}
