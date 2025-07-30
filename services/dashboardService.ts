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
        console.log(
          "DashboardService - No auth token, returning default stats"
        );
        // Return default stats instead of throwing error
        return {
          repositories: 0,
          commits: 0,
          tasks: 0,
          stars: 0,
          recentRepositories: [],
        };
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

      // Get actual private commits count from the store
      let commitsCount = 0;
      let tasksCount = 0;
      let starsCount = 0;

      try {
        // Get actual private commits count from the store
        const { useCommitsStore } = await import("../store/commitsStore");
        const commitsStore = useCommitsStore.getState();
        commitsCount = commitsStore.getCommitsCount();
        console.log("📊 Dashboard - Private commits count:", commitsCount);
      } catch (error) {
        console.log("Commits count not available");
        commitsCount = 0;
      }

      try {
        // Get actual starred repositories count from the store
        const { useStarsStore } = await import("../store/starsStore");
        const starsStore = useStarsStore.getState();
        starsCount = starsStore.getStarredCount();
        console.log("⭐ Dashboard - Starred repositories count:", starsCount);
      } catch (error) {
        console.log("Stars count not available");
        starsCount = 0;
      }

      try {
        // Get actual todo count from the store
        const { useTodoStore } = await import("../store/todoStore");
        const todoStore = useTodoStore.getState();
        tasksCount = todoStore.todos.length;
      } catch (error) {
        console.log("Tasks count not available");
        tasksCount = 0;
      }

      return {
        repositories: repositories.length,
        commits: commitsCount,
        tasks: tasksCount,
        stars: starsCount,
        recentRepositories,
      };
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      // Return default stats instead of throwing error
      return {
        repositories: 0,
        commits: 0,
        tasks: 0,
        stars: 0,
        recentRepositories: [],
      };
    }
  }

  async getRepositoryStats(repositoryId: number) {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        console.log("DashboardService - No auth token for repository stats");
        // Return default stats instead of throwing error
        return {
          repository: null,
          files: 0,
          commits: 0,
          stars: 0,
          lastUpdated: new Date().toISOString(),
        };
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
      // Return default stats instead of throwing error
      return {
        repository: null,
        files: 0,
        commits: 0,
        stars: 0,
        lastUpdated: new Date().toISOString(),
      };
    }
  }

  async getCommitsCount(repositoryId?: number): Promise<number> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        console.log("DashboardService - No auth token for commits count");
        return 0; // Return 0 instead of throwing error
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
      // Import the todo store to get actual todo count
      const { useTodoStore } = await import("../store/todoStore");
      const todoStore = useTodoStore.getState();

      // Return the actual count of todos
      return todoStore.todos.length;
    } catch (error) {
      console.error("Error fetching tasks count:", error);
      return 0;
    }
  }
}

export const dashboardService = new DashboardService();
