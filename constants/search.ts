import { FilterOption, SearchResult, SearchSuggestion } from "@/types/search";

// constants/search.ts
export const DEFAULT_FILTERS: FilterOption[] = [
  { id: "all", label: "All", active: true },
  { id: "repositories", label: "Repositories", active: false },
  { id: "users", label: "Users", active: false },
  { id: "topics", label: "Topics", active: false },
  { id: "code", label: "Code", active: false },
];

export const SEARCH_SUGGESTIONS: SearchSuggestion[] = [
  {
    id: "1",
    type: "trending",
    text: "ChatGPT",
    subtitle: "Trending repository",
  },
  {
    id: "2",
    type: "topic",
    text: "machine-learning",
    subtitle: "Popular topic",
  },
  {
    id: "3",
    type: "user",
    text: "microsoft",
    subtitle: "Verified organization",
  },
  {
    id: "4",
    type: "repository",
    text: "facebook/react",
    subtitle: "Popular repository",
  },
  {
    id: "5",
    type: "trending",
    text: "AI tools",
    subtitle: "Trending this week",
  },
];

export const MOCK_SEARCH_RESULTS: SearchResult[] = [
  {
    id: "1",
    type: "repository",
    title: "facebook/react",
    subtitle: "facebook",
    description:
      "The library for web and native user interfaces. React makes it painless to create interactive UIs.",
    language: "JavaScript",
    stars: 220000,
    forks: 45000,
    verified: true,
  },
  {
    id: "2",
    type: "repository",
    title: "vercel/next.js",
    subtitle: "vercel",
    description:
      "The React Framework for the Web. Used by some of the world's largest companies.",
    language: "TypeScript",
    stars: 119000,
    forks: 25000,
    verified: true,
  },
  {
    id: "3",
    type: "repository",
    title: "expo/expo",
    subtitle: "expo",
    description:
      "An open-source platform for making universal native apps with React.",
    language: "TypeScript",
    stars: 28000,
    forks: 4500,
    verified: true,
  },
  {
    id: "4",
    type: "user",
    title: "Sarah Chen",
    subtitle: "@developer",
    description:
      "Full-stack developer passionate about React Native, TypeScript, and building delightful user experiences.",
    verified: false,
  },
];
