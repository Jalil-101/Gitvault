// services/activityService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { repositoryService } from "./repositoryService";

export interface ActivityItem {
  id: string;
  type: "commit" | "repository" | "star" | "file";
  title: string;
  subtitle: string;
  time: string;
  colorKey: "success" | "warning" | "error" | "info";
  user?: string;
  avatar?: string;
  repositoryId?: number;
  repositoryName?: string;
}

class ActivityService {
  private async getAuthToken(): Promise<string | null> {
    return await AsyncStorage.getItem("accessToken");
  }

  async getRecentActivity(): Promise<ActivityItem[]> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const activities: ActivityItem[] = [];

      // Fetch recent repositories
      const repositories = await repositoryService.getUserRepositories();
      const recentRepos = repositories
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
        .slice(0, 3);

      // Add repository activities
      recentRepos.forEach((repo) => {
        activities.push({
          id: `repo-${repo.id}`,
          type: "repository",
          title: `Updated repository`,
          subtitle: repo.description || "No description",
          time: this.formatTimeAgo(repo.updatedAt),
          colorKey: "info",
          user: repo.owner
            ? `${repo.owner.firstName} ${repo.owner.lastName}`
            : "You",
          repositoryId: repo.id,
          repositoryName: repo.name,
        });
      });

      // Add star activities (if any repositories have stars)
      repositories
        .filter((repo) => (repo as any).starCount > 0)
        .slice(0, 2)
        .forEach((repo) => {
          activities.push({
            id: `star-${repo.id}`,
            type: "star",
            title: `Repository starred`,
            subtitle: `${(repo as any).starCount} stars`,
            time: this.formatTimeAgo(repo.updatedAt),
            colorKey: "success",
            user: "You",
            repositoryId: repo.id,
            repositoryName: repo.name,
          });
        });

      // Add commit activities (placeholder - would need backend endpoint)
      if (repositories.length > 0) {
        const sampleRepo = repositories[0];
        activities.push({
          id: `commit-${sampleRepo.id}`,
          type: "commit",
          title: `Made a commit`,
          subtitle: "Updated README.md",
          time: "2 hours ago",
          colorKey: "warning",
          user: "You",
          repositoryId: sampleRepo.id,
          repositoryName: sampleRepo.name,
        });
      }

      // Add file activities (placeholder - would need backend endpoint)
      if (repositories.length > 0) {
        const sampleRepo = repositories[0];
        activities.push({
          id: `file-${sampleRepo.id}`,
          type: "file",
          title: `Added new file`,
          subtitle: "src/components/Button.tsx",
          time: "1 day ago",
          colorKey: "success",
          user: "You",
          repositoryId: sampleRepo.id,
          repositoryName: sampleRepo.name,
        });
      }

      // Sort by time (most recent first)
      return activities.sort((a, b) => {
        const timeA = this.parseTimeAgo(a.time);
        const timeB = this.parseTimeAgo(b.time);
        return timeB - timeA;
      });
    } catch (error) {
      console.error("Error fetching recent activity:", error);
      return [];
    }
  }

  private formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }

  private parseTimeAgo(timeString: string): number {
    if (timeString === "Just now") return 0;

    const match = timeString.match(/(\d+)([mhd]) ago/);
    if (!match) return 0;

    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
      case "m":
        return value * 60;
      case "h":
        return value * 3600;
      case "d":
        return value * 86400;
      default:
        return 0;
    }
  }

  async getRepositoryActivity(repositoryId: number): Promise<ActivityItem[]> {
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

      const activities: ActivityItem[] = [];

      // Add file activities
      files.slice(0, 5).forEach((file: any) => {
        activities.push({
          id: `file-${file.id || file.name}`,
          type: "file",
          title: `File ${file.status || "updated"}`,
          subtitle: file.name || file.path,
          time: this.formatTimeAgo(repository.updatedAt),
          colorKey: "success",
          user: "You",
          repositoryId,
          repositoryName: repository.name,
        });
      });

      // Add commit activity (placeholder)
      activities.push({
        id: `commit-${repositoryId}`,
        type: "commit",
        title: "Latest commit",
        subtitle: "Updated project structure",
        time: "3 hours ago",
        colorKey: "warning",
        user: "You",
        repositoryId,
        repositoryName: repository.name,
      });

      return activities;
    } catch (error) {
      console.error("Error fetching repository activity:", error);
      return [];
    }
  }
}

export const activityService = new ActivityService();
