import { z } from 'zod';
import { Entity, entityCreateSchema } from './Entity';
import { Step } from './Step';
import { StepRepository } from 'app/repo/StepRepository';

export const formCreateSchema = entityCreateSchema.extend({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
});

type FormCreateInput = z.infer<typeof formCreateSchema>;

export class Form extends Entity {
  public readonly name: string;
  public readonly description: string;

  private _steps: Step[] | null = null;

  constructor(data: FormCreateInput) {
    super(data);
    const input = formCreateSchema.parse(data);
    this.name = input.name;
    this.description = input.description;
  }

  static from(data: FormCreateInput) {
    return new this(data);
  }

  async steps() {
    if (this._steps) {
      return this._steps;
    }

    return new StepRepository().getAllByFormId(this.id);
  }
}
