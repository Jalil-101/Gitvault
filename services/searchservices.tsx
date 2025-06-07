import { Repository, User, SearchFilters } from "../types/search";

export class GitHubService {
  static async searchRepositories(
    query: string,
    filters: SearchFilters
  ): Promise<Repository[]> {
    // Mock implementation - replace with actual GitHub API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [
      {
        id: Date.now(),
        name: query.toLowerCase().replace(/\s+/g, "-"),
        full_name: `user/${query.toLowerCase().replace(/\s+/g, "-")}`,
        description: `A project related to ${query}`,
        language: "TypeScript",
        stargazers_count: Math.floor(Math.random() * 1000),
        forks_count: Math.floor(Math.random() * 200),
        updated_at: new Date().toISOString(),
        owner: {
          login: "user",
          avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
        },
        topics: [query.toLowerCase()],
      },
    ];
  }

  static async searchUsers(
    query: string,
    filters: SearchFilters
  ): Promise<User[]> {
    // Mock implementation - replace with actual GitHub API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [
      {
        id: Date.now(),
        login: query.toLowerCase(),
        name: query,
        bio: `Developer passionate about ${query}`,
        avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
        public_repos: Math.floor(Math.random() * 100),
        followers: Math.floor(Math.random() * 1000),
        following: Math.floor(Math.random() * 500),
      },
    ];
  }

  static async getTrendingRepositories(): Promise<Repository[]> {
    // Mock implementation - replace with actual GitHub API call
    return [
      {
        id: 1,
        name: "react-native",
        full_name: "facebook/react-native",
        description: "A framework for building native applications using React",
        language: "JavaScript",
        stargazers_count: 115000,
        forks_count: 24000,
        updated_at: "2024-01-15T10:30:00Z",
        owner: {
          login: "facebook",
          avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
        },
        topics: ["react", "mobile", "framework"],
      },
      {
        id: 2,
        name: "expo",
        full_name: "expo/expo",
        description: "An open-source platform for making universal native apps",
        language: "TypeScript",
        stargazers_count: 21000,
        forks_count: 4200,
        updated_at: "2024-01-14T15:45:00Z",
        owner: {
          login: "expo",
          avatar_url: "https://avatars.githubusercontent.com/u/12504344?v=4",
        },
        topics: ["expo", "react-native", "mobile"],
      },
    ];
  }
}
