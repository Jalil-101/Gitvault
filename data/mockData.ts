import { QuickAction } from "@/types/explore";
import { TrendingUp, Book, Users, Code, Star, Zap } from "lucide-react-native";






//Explore related mockdata                 
export const mockDiscoverRepos = [
  {
    id: 4,
    name: "facebook/react",
    description: "The library for web and native user interfaces",
    stars: 220000,
    language: "JavaScript",
    languageColor: "#f1e05a",
    forks: 45000,
  },
  {
    id: 5,
    name: "vuejs/vue",
    description:
      "This is the repo for Vue 2. For Vue 3, go to https://github.com/vuejs/core",
    stars: 206000,
    language: "JavaScript",
    languageColor: "#f1e05a",
    forks: 33700,
  },
  {
    id: 6,
    name: "microsoft/vscode",
    description: "Visual Studio Code - Code Editing. Redefined.",
    stars: 158000,
    language: "TypeScript",
    languageColor: "#3178c6",
    forks: 28000,
  },
  {
    id: 7,
    name: "flutter/flutter",
    description:
      "Flutter makes it easy and fast to build beautiful apps for mobile and beyond",
    stars: 162000,
    language: "Dart",
    languageColor: "#00B4AB",
    forks: 26700,
  },
];

export const mockTrendingRepos = [
  {
    id: 1,
    name: "microsoft/TypeScript",
    description:
      "TypeScript is a superset of JavaScript that compiles to clean JavaScript output.",
    stars: 95200,
    language: "TypeScript",
    languageColor: "#3178c6",
    todayStars: 127,
  },
  {
    id: 2,
    name: "vercel/next.js",
    description: "The React Framework for the Web",
    stars: 119000,
    language: "JavaScript",
    languageColor: "#f1e05a",
    todayStars: 89,
  },
  {
    id: 3,
    name: "tailwindlabs/tailwindcss",
    description:
      "A utility-first CSS framework for rapidly building custom designs.",
    stars: 78500,
    language: "CSS",
    languageColor: "#563d7c",
    todayStars: 156,
  },
];
export const recentSearches = [
  "react native",
  "typescript tutorial",
  "nextjs deployment",
  "tailwind components",
];
export const quickActions: QuickAction[] = [
  {
    id: "trending",
    title: "Trending",
    icon: TrendingUp,
    color: "green",
    gradient: ["#10B981", "#059669"],
  },
  {
    id: "repositories",
    title: "Repositories",
    icon: Book,
    color: "blue",
    gradient: ["#3B82F6", "#2563EB"],
  },
  {
    id: "users",
    title: "Users",
    icon: Users,
    color: "purple",
    gradient: ["#8B5CF6", "#A855F7"],
  },
  {
    id: "topics",
    title: "Topics",
    icon: Code,
    color: "orange",
    gradient: ["#F97316", "#EA580C"],
  },
  {
    id: "stars",
    title: "Stars",
    icon: Star,
    color: "red",
    gradient: ["#EF4444", "#DC2626"],
  },
  {
    id: "awesome",
    title: "Awesome",
    icon: Zap,
    color: "indigo",
    gradient: ["#6366F1", "#4F46E5"],
  },
];







