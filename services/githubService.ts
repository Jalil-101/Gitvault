// services/githubService.ts
import { StarredRepository } from "@/store/starsStore";

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  owner: {
    login: string;
    avatar_url: string;
  };
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
}

class GitHubService {
  private baseURL = "https://api.github.com";

  async getPopularRepositories(
    page: number = 1,
    perPage: number = 20
  ): Promise<GitHubRepository[]> {
    try {
      // Fetch repositories sorted by stars (most popular)
      const response = await fetch(
        `${this.baseURL}/search/repositories?q=stars:>1000&sort=stars&order=desc&page=${page}&per_page=${perPage}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "GitVault-App",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error("Error fetching popular repositories:", error);
      // Return fallback data if API fails
      return this.getFallbackRepositories();
    }
  }

  async getTrendingRepositories(
    page: number = 1,
    perPage: number = 20
  ): Promise<GitHubRepository[]> {
    try {
      // Fetch repositories created in the last week, sorted by stars
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      const dateString = lastWeek.toISOString().split("T")[0];

      const response = await fetch(
        `${this.baseURL}/search/repositories?q=created:>${dateString}&sort=stars&order=desc&page=${page}&per_page=${perPage}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "GitVault-App",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error("Error fetching trending repositories:", error);
      return this.getFallbackRepositories();
    }
  }

  // Fallback data when GitHub API is unavailable
  private getFallbackRepositories(): GitHubRepository[] {
    return [
      {
        id: 1,
        name: "react",
        full_name: "facebook/react",
        description: "The library for web and native user interfaces",
        owner: {
          login: "facebook",
          avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
        },
        language: "JavaScript",
        stargazers_count: 210000,
        forks_count: 44000,
        updated_at: "2024-01-15T10:30:00Z",
        html_url: "https://github.com/facebook/react",
      },
      {
        id: 2,
        name: "vue",
        full_name: "vuejs/vue",
        description:
          "Vue.js is a progressive, incrementally-adoptable JavaScript framework",
        owner: {
          login: "vuejs",
          avatar_url: "https://avatars.githubusercontent.com/u/6128107?v=4",
        },
        language: "TypeScript",
        stargazers_count: 205000,
        forks_count: 33000,
        updated_at: "2024-01-14T15:45:00Z",
        html_url: "https://github.com/vuejs/vue",
      },
      {
        id: 3,
        name: "angular",
        full_name: "angular/angular",
        description: "Deliver web apps with confidence",
        owner: {
          login: "angular",
          avatar_url: "https://avatars.githubusercontent.com/u/139426?v=4",
        },
        language: "TypeScript",
        stargazers_count: 95000,
        forks_count: 25000,
        updated_at: "2024-01-13T12:20:00Z",
        html_url: "https://github.com/angular/angular",
      },
      {
        id: 4,
        name: "tensorflow",
        full_name: "tensorflow/tensorflow",
        description: "An Open Source Machine Learning Framework for Everyone",
        owner: {
          login: "tensorflow",
          avatar_url: "https://avatars.githubusercontent.com/u/15658638?v=4",
        },
        language: "C++",
        stargazers_count: 180000,
        forks_count: 88000,
        updated_at: "2024-01-12T09:15:00Z",
        html_url: "https://github.com/tensorflow/tensorflow",
      },
      {
        id: 5,
        name: "flutter",
        full_name: "flutter/flutter",
        description:
          "Flutter makes it easy and fast to build beautiful apps for mobile and beyond",
        owner: {
          login: "flutter",
          avatar_url: "https://avatars.githubusercontent.com/u/31792833?v=4",
        },
        language: "Dart",
        stargazers_count: 160000,
        forks_count: 25000,
        updated_at: "2024-01-11T14:30:00Z",
        html_url: "https://github.com/flutter/flutter",
      },
      {
        id: 6,
        name: "next.js",
        full_name: "vercel/next.js",
        description: "The React Framework for Production",
        owner: {
          login: "vercel",
          avatar_url: "https://avatars.githubusercontent.com/u/14985020?v=4",
        },
        language: "JavaScript",
        stargazers_count: 110000,
        forks_count: 24000,
        updated_at: "2024-01-10T11:45:00Z",
        html_url: "https://github.com/vercel/next.js",
      },
      {
        id: 7,
        name: "node",
        full_name: "nodejs/node",
        description: "Node.js JavaScript runtime",
        owner: {
          login: "nodejs",
          avatar_url: "https://avatars.githubusercontent.com/u/9950313?v=4",
        },
        language: "JavaScript",
        stargazers_count: 100000,
        forks_count: 27000,
        updated_at: "2024-01-09T16:20:00Z",
        html_url: "https://github.com/nodejs/node",
      },
      {
        id: 8,
        name: "python",
        full_name: "python/cpython",
        description: "The Python programming language",
        owner: {
          login: "python",
          avatar_url: "https://avatars.githubusercontent.com/u/1525981?v=4",
        },
        language: "Python",
        stargazers_count: 58000,
        forks_count: 28000,
        updated_at: "2024-01-08T13:10:00Z",
        html_url: "https://github.com/python/cpython",
      },
      {
        id: 9,
        name: "kubernetes",
        full_name: "kubernetes/kubernetes",
        description: "Production-Grade Container Scheduling and Management",
        owner: {
          login: "kubernetes",
          avatar_url: "https://avatars.githubusercontent.com/u/13629408?v=4",
        },
        language: "Go",
        stargazers_count: 100000,
        forks_count: 37000,
        updated_at: "2024-01-07T10:25:00Z",
        html_url: "https://github.com/kubernetes/kubernetes",
      },
      {
        id: 10,
        name: "docker",
        full_name: "moby/moby",
        description:
          "Moby Project - a collaborative project for the container ecosystem",
        owner: {
          login: "moby",
          avatar_url: "https://avatars.githubusercontent.com/u/27305733?v=4",
        },
        language: "Go",
        stargazers_count: 68000,
        forks_count: 19000,
        updated_at: "2024-01-06T08:50:00Z",
        html_url: "https://github.com/moby/moby",
      },
    ];
  }

  // Convert GitHub API response to our StarredRepository format
  convertToStarredRepository(
    githubRepo: GitHubRepository
  ): Omit<StarredRepository, "isStarred" | "starredAt"> {
    return {
      id: githubRepo.id,
      name: githubRepo.name,
      fullName: githubRepo.full_name,
      description: githubRepo.description || undefined,
      owner: {
        login: githubRepo.owner.login,
        avatarUrl: githubRepo.owner.avatar_url,
      },
      language: githubRepo.language || undefined,
      stargazersCount: githubRepo.stargazers_count,
      forksCount: githubRepo.forks_count,
      updatedAt: githubRepo.updated_at,
      htmlUrl: githubRepo.html_url,
    };
  }
}

export const githubService = new GitHubService();
