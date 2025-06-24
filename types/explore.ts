export interface QuickAction {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: readonly string[];
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  stars: number;
  language: string;
  languageColor: string;
  todayStars?: number;
  forks?: number;
}