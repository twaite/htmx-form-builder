export interface IReadableRepository<Domain, DBModel> {
  toModel: (data: DBModel) => Domain;
  get: (id: string) => Promise<Domain>;
  getAll: () => Promise<Domain[]>;
}

export interface IEditableRepository<T, DB> extends IReadableRepository<T, DB> {
  create?: (data: T) => Promise<T>;
  update?: (id: string, data: Partial<T>) => Promise<T>;
  delete?: (id: string) => Promise<T>;
}
