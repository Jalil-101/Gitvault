//  File: types/bottomSheet.ts
export interface Repository {
  name: string;
  owner: string;
  description?: string;
  url?: string;
}

export interface User {
  username: string;
  avatarUrl?: string;
  email?: string;
}

export interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'folder';
  size?: number;
}

export type SheetPayloads = {
  repoActions: { repo: Repository };
  userActions: { user: User };
  fileActions: { file: FileItem };
};

export type SheetName = keyof SheetPayloads | null;
