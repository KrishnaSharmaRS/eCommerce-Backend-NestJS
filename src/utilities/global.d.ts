export interface IModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type OptionalCreationAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
