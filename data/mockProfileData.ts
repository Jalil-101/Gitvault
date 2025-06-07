// data/mockProfileData.ts
import { UserProfile, Repository } from "@/types/profile";

export const mockProfile: UserProfile = {
  name: "Alex Developer",
  username: "@alexdev",
  bio: "Full-stack developer passionate about creating beautiful, functional applications. Love to explore new technologies and contribute to open source.",
  avatar: "https://avatars.githubusercontent.com/u/1?v=4",
  followers: 1234,
  following: 567,
  publicRepos: 89,
  location: "San Francisco, CA",
  company: "Tech Innovations Inc",
  website: "alexdev.com",
  joinedDate: "Joined December 2019",
  contributions: 2847,
};

export const mockRepositories: Repository[] = [
  {
    id: "1",
    name: "awesome-react-native",
    description:
      "A collection of awesome React Native components and libraries",
    language: "TypeScript",
    stars: 234,
    forks: 45,
    isPrivate: false,
    updatedAt: "2 days ago",
  },
  {
    id: "2",
    name: "mobile-ui-kit",
    description: "Beautiful mobile UI components built with React Native",
    language: "JavaScript",
    stars: 189,
    forks: 32,
    isPrivate: false,
    updatedAt: "1 week ago",
  },
  {
    id: "3",
    name: "design-system",
    description: "Comprehensive design system for modern applications",
    language: "TypeScript",
    stars: 156,
    forks: 28,
    isPrivate: true,
    updatedAt: "3 days ago",
  },
];
