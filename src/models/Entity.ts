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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(data: EntityCreateInput, ..._: unknown[]) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static from(data: EntityCreateInput, ..._: unknown[]) {
    return new this(data);
  }
}
