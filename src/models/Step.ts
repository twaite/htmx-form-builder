import { z } from 'zod';
import { Entity, entityCreateSchema } from './Entity';

export const stepCreateSchema = entityCreateSchema.extend({
  formId: entityCreateSchema.shape.id,
  number: z.number().int().positive(),
});

type StepCreateInput = z.infer<typeof stepCreateSchema>;

export class Step extends Entity {
  public readonly formId: string;
  public readonly number: number;

  constructor(data: StepCreateInput) {
    super(data);

    const input = stepCreateSchema.parse(data);
    this.formId = input.formId;
    this.number = input.number;
  }

  static from(data: StepCreateInput) {
    return new this(data);
  }
}
