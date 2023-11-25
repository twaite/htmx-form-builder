export interface IReadableRepository<T> {
  get: (id: string) => Promise<T>;
  getAll: () => Promise<T[]>;
  withTransaction(trx: unknown): IEditableRepository<T>;
}

export interface IEditableRepository<T> extends IReadableRepository<T> {
  create?: (data: T) => Promise<T>;
  update?: (id: string, data: Partial<T>) => Promise<T>;
  delete?: (id: string) => Promise<T>;
}
