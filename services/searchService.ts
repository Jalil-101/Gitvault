// services/searchService.ts
import { useAuthStore } from "@/store/authStore";
import { SearchResult } from "@/types/search";
import { vaultApiService } from "./VaultApiService";

export interface SearchOptions {
  query: string;
  filters?: string[];
  includePrivate?: boolean;
  currentUserId?: string;
}

export class SearchService {
  private static instance: SearchService;

  static getInstance(): SearchService {
    if (!SearchService.instance) {
      SearchService.instance = new SearchService();
    }
    return SearchService.instance;
  }

  async searchRepositories(options: SearchOptions): Promise<SearchResult[]> {
    const { query, includePrivate = false, currentUserId } = options;

    try {
      // Get user repositories (private and public)
      const userRepositories = await vaultApiService.getUserRepositories();

      // Get public repositories from backend
      const publicRepositoriesResponse =
        await vaultApiService.getPublicRepositories(0, 50);
      const publicRepositories = publicRepositoriesResponse.content || [];

      // Get GitHub repositories as fallback
      const githubRepositories = await this.getGitHubRepositories(query);

      // Combine and filter repositories
      const allRepositories = [
        ...userRepositories,
        ...publicRepositories,
        ...githubRepositories,
      ];

      // Filter based on search query and privacy rules
      const filteredRepositories = allRepositories.filter((repo) => {
        const matchesQuery =
          repo.name.toLowerCase().includes(query.toLowerCase()) ||
          repo.description?.toLowerCase().includes(query.toLowerCase()) ||
          repo.ownerUsername?.toLowerCase().includes(query.toLowerCase());

        if (!matchesQuery) return false;

        // Privacy rules
        if (repo.isPrivate) {
          // Only show private repos if they belong to current user
          return currentUserId && repo.ownerUsername === currentUserId;
        }

        return true;
      });

      // Convert to SearchResult format
      return filteredRepositories.map((repo) => ({
        id: repo.id.toString(),
        type: "repository" as const,
        title: repo.name,
        subtitle: repo.ownerUsername,
        description: repo.description,
        language: repo.language,
        stars: repo.starCount,
        forks: 0, // Not available in our backend
        verified: false,
        isPrivate: repo.isPrivate,
        ownerId: repo.ownerUsername,
      }));
    } catch (error) {
      // Silently handle 403 errors (user not authenticated) - this is expected
      if (error instanceof Error && error.message.includes("403")) {
        // User is not authenticated, which is normal for search
        // Fallback to GitHub search only
        return this.getGitHubRepositories(query);
      }
      // Only log other errors that might be actual issues
      console.error("Search error:", error);
      // Fallback to GitHub search only
      return this.getGitHubRepositories(query);
    }
  }

  private async getGitHubRepositories(query: string): Promise<SearchResult[]> {
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(
          query
        )}&sort=stars&order=desc&per_page=20`
      );

      if (!response.ok) {
        throw new Error("GitHub API request failed");
      }

      const data = await response.json();

      return data.items.map((repo: any) => ({
        id: repo.id.toString(),
        type: "repository" as const,
        title: repo.full_name,
        subtitle: repo.owner.login,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        verified: repo.owner.type === "Organization",
        isPrivate: repo.private,
        ownerId: repo.owner.login,
      }));
    } catch (error) {
      // Silently handle network errors and timeouts - these are expected
      if (
        error instanceof Error &&
        (error.message.includes("fetch") ||
          error.message.includes("network") ||
          error.message.includes("timeout"))
      ) {
        return [];
      }
      // Only log other errors that might be actual issues
      console.error("GitHub search error:", error);
      return [];
    }
  }

  async searchUsers(query: string): Promise<SearchResult[]> {
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(
          query
        )}&per_page=10`
      );

      if (!response.ok) {
        throw new Error("GitHub users search failed");
      }

      const data = await response.json();

      return data.items.map((user: any) => ({
        id: user.id.toString(),
        type: "user" as const,
        title: user.login,
        subtitle: user.name || user.login,
        description: user.bio,
        avatar: user.avatar_url,
        verified: user.type === "Organization",
      }));
    } catch (error) {
      // Silently handle network errors and timeouts - these are expected
      if (
        error instanceof Error &&
        (error.message.includes("fetch") ||
          error.message.includes("network") ||
          error.message.includes("timeout"))
      ) {
        return [];
      }
      // Only log other errors that might be actual issues
      console.error("User search error:", error);
      return [];
    }
  }

  async searchTopics(query: string): Promise<SearchResult[]> {
    try {
      const response = await fetch(
        `https://api.github.com/search/topics?q=${encodeURIComponent(
          query
        )}&per_page=10`
      );

      if (!response.ok) {
        throw new Error("GitHub topics search failed");
      }

      const data = await response.json();

      return data.items.map((topic: any) => ({
        id: topic.name,
        type: "topic" as const,
        title: topic.name,
        subtitle: `${topic.display_name || topic.name}`,
        description: topic.short_description,
      }));
    } catch (error) {
      // Silently handle network errors and timeouts - these are expected
      if (
        error instanceof Error &&
        (error.message.includes("fetch") ||
          error.message.includes("network") ||
          error.message.includes("timeout"))
      ) {
        return [];
      }
      // Only log other errors that might be actual issues
      console.error("Topic search error:", error);
      return [];
    }
  }

  async performSearch(
    query: string,
    filters: string[] = ["all"]
  ): Promise<SearchResult[]> {
    const currentUser = useAuthStore.getState().user;
    const currentUserId = currentUser?.username;

    const results: SearchResult[] = [];

    // Search based on active filters
    if (filters.includes("all") || filters.includes("repositories")) {
      const repoResults = await this.searchRepositories({
        query,
        includePrivate: true,
        currentUserId,
      });
      results.push(...repoResults);
    }

    if (filters.includes("all") || filters.includes("users")) {
      const userResults = await this.searchUsers(query);
      results.push(...userResults);
    }

    if (filters.includes("all") || filters.includes("topics")) {
      const topicResults = await this.searchTopics(query);
      results.push(...topicResults);
    }

    return results;
  }
}

export const searchService = SearchService.getInstance();
