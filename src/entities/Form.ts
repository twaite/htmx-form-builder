import { z } from 'zod';
import { Entity, entityCreateSchema } from './Entity';

export const formCreateSchema = entityCreateSchema.extend({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
});

type FormCreateInput = z.infer<typeof formCreateSchema>;

export class Form extends Entity {
  public readonly name: string;
  public readonly description: string;

  constructor(data: FormCreateInput) {
    super(data);

    const input = formCreateSchema.parse(data);
    this.name = input.name;
    this.description = input.description;
  }

  static from(data: FormCreateInput) {
    return new this(data);
  }
}
