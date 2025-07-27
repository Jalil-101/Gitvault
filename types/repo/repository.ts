// types/repository.ts
export interface Repository {
  id: number;
  name: string;
  description: string;
  isPrivate: boolean;
  createdAt?: string;
  updatedAt?: string;
  owner?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface CreateRepositoryData {
  name: string;
  description: string;
  isPrivate: boolean;
}

export interface UpdateRepositoryData {
  name?: string;
  description?: string;
  isPrivate?: boolean;
}
