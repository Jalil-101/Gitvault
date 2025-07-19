// types/starRepository.ts
export interface Repository {
  id: string;
  name: string;
  owner: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  updatedAt: string;
}
