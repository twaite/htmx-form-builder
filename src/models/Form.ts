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

  private readonly _stepRepository: StepRepository;

  constructor(data: FormCreateInput, stepRepository: StepRepository) {
    super(data);
    this._stepRepository = stepRepository;

    const input = formCreateSchema.parse(data);
    this.name = input.name;
    this.description = input.description;
  }

  static from(data: FormCreateInput, stepRepository: StepRepository) {
    return new this(data, stepRepository);
  }

  async steps() {
    if (this._steps) {
      return this._steps;
    }

    return this._stepRepository.getAllByFormId(this.id);
  }
}
