// NOTE: if this gets too large it can be made into a folder

export type BaseModel = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface Form extends BaseModel {
  name: string;
  description: string;
}
