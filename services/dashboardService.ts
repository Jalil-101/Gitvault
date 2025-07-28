// services/dashboardService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { repositoryService } from "./repositoryService";

export interface DashboardStats {
  repositories: number;
  commits: number;
  tasks: number;
  stars: number;
  recentRepositories: any[];
}

class DashboardService {
  private async getAuthToken(): Promise<string | null> {
    return await AsyncStorage.getItem("accessToken");
  }

  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Fetch repositories
      const repositories = await repositoryService.getUserRepositories();

      // Calculate total stars
      const totalStars = repositories.reduce(
        (total, repo) => total + (repo.starCount || 0),
        0
      );

      // Get recent repositories (last 3 updated)
      const recentRepositories = repositories
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
        .slice(0, 3);

      // For now, we'll use placeholder data for commits and tasks
      // These would need backend endpoints to get real data
      let commitsCount = 0;
      let tasksCount = 0;

      try {
        // Placeholder: calculate commits based on repository count
        // In a real implementation, you'd have a backend endpoint for this
        commitsCount =
          repositories.length * (Math.floor(Math.random() * 20) + 10);
      } catch (error) {
        console.log("Commits count not available");
      }

      try {
        // Placeholder: random tasks count
        // In a real implementation, you'd fetch from a tasks API
        tasksCount = Math.floor(Math.random() * 30) + 5;
      } catch (error) {
        console.log("Tasks count not available");
      }

      return {
        repositories: repositories.length,
        commits: commitsCount,
        tasks: tasksCount,
        stars: totalStars,
        recentRepositories,
      };
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  }

  async getRepositoryStats(repositoryId: number) {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Fetch repository details
      const repository = await repositoryService.getRepositoryDetails(
        repositoryId
      );

      // Fetch repository files
      const files = await repositoryService.getRepositoryFiles(repositoryId);

      // For commits, we'd need a backend endpoint
      // For now, return placeholder data
      return {
        repository,
        files: files.length,
        commits: Math.floor(Math.random() * 50) + 10, // Placeholder
        stars: repository.starCount || 0,
        lastUpdated: repository.updatedAt,
      };
    } catch (error) {
      console.error("Error fetching repository stats:", error);
      throw error;
    }
  }

  async getCommitsCount(repositoryId?: number): Promise<number> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        throw new Error("Authentication token not found");
      }

      if (repositoryId) {
        // Fetch commits for specific repository
        const response = await fetch(
          `https://vault-backend-susi.onrender.com/api/git/repositories/${repositoryId}/commits`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const commits = await response.json();
          return commits.length;
        }
      } else {
        // Fetch total commits across all repositories
        const repositories = await repositoryService.getUserRepositories();
        let totalCommits = 0;

        for (const repo of repositories) {
          try {
            const response = await fetch(
              `https://vault-backend-susi.onrender.com/api/git/repositories/${repo.id}/commits`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.ok) {
              const commits = await response.json();
              totalCommits += commits.length;
            }
          } catch (error) {
            console.log(`Could not fetch commits for repo ${repo.id}`);
          }
        }

        return totalCommits;
      }

      return 0;
    } catch (error) {
      console.error("Error fetching commits count:", error);
      return 0;
    }
  }

  async getTasksCount(): Promise<number> {
    try {
      // This would need a backend endpoint for tasks/todos
      // For now, return placeholder data
      return Math.floor(Math.random() * 30) + 5;
    } catch (error) {
      console.error("Error fetching tasks count:", error);
      return 0;
    }
  }
}

export const dashboardService = new DashboardService();
