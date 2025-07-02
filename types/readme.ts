// types/readme.ts
export interface ReadmeData {
  content: string;
  encoding: 'base64' | 'utf-8';
  size: number;
  sha: string;
  url: string;
  html_url: string;
  download_url: string;
}

export interface ReadmeSection {
  type: 'heading' | 'paragraph' | 'code' | 'list' | 'image' | 'link' | 'table';
  content: string;
  level?: number; // for headings
  language?: string; // for code blocks
  items?: string[]; // for lists
}