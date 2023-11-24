import { z } from 'zod';

export const entityCreateSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

type EntityCreateInput = z.infer<typeof entityCreateSchema>;

export class Entity {
  public readonly id: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(data: EntityCreateInput) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static from(data: EntityCreateInput) {
    return new this(data);
  }
}
