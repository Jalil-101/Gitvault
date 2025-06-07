// hooks/useFeedData.ts
import { useState, useEffect, useCallback } from "react";
import { FeedItem, Repository, Issue, PullRequest } from "@/types";

// Mock data for demonstration
const mockRepositories: Repository[] = [
  {
    id: 1,
    name: "react-native-app",
    full_name: "user/react-native-app",
    description: "A modern React Native application with TypeScript",
    private: false,
    html_url: "https://github.com/user/react-native-app",
    stargazers_count: 142,
    language: "TypeScript",
    updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
    owner: {
      id: 1,
      login: "johndoe",
      avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
      html_url: "https://github.com/johndoe",
    },
  },
  {
    id: 2,
    name: "awesome-utils",
    full_name: "user/awesome-utils",
    description: "Collection of useful utility functions",
    private: true,
    html_url: "https://github.com/user/awesome-utils",
    stargazers_count: 23,
    language: "JavaScript",
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days ago
    owner: {
      id: 1,
      login: "johndoe",
      avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
      html_url: "https://github.com/johndoe",
    },
  },
];

const mockIssues: Issue[] = [
  {
    id: 1,
    number: 42,
    title: "Fix navigation issue on Android",
    body: "The navigation seems to be broken on Android devices...",
    state: "open",
    user: {
      id: 2,
      login: "contributor",
      avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
      html_url: "https://github.com/contributor",
    },
    repository: mockRepositories[0],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
    html_url: "https://github.com/user/react-native-app/issues/42",
  },
];

const mockPullRequests: PullRequest[] = [
  {
    id: 1,
    number: 15,
    title: "Add dark theme support",
    body: "This PR adds comprehensive dark theme support...",
    state: "open",
    user: {
      id: 3,
      login: "designer",
      avatar_url: "https://avatars.githubusercontent.com/u/3?v=4",
      html_url: "https://github.com/designer",
    },
    repository: mockRepositories[0],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    html_url: "https://github.com/user/react-native-app/pull/15",
  },
];

export function useFeedData() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateFeedItems = useCallback((): FeedItem[] => {
    const items: FeedItem[] = [];

    // Add repositories
    mockRepositories.forEach((repo) => {
      items.push({
        id: `repo-${repo.id}`,
        type: "repository",
        data: repo,
        timestamp: repo.updated_at,
      });
    });

    // Add issues
    mockIssues.forEach((issue) => {
      items.push({
        id: `issue-${issue.id}`,
        type: "issue",
        data: issue,
        timestamp: issue.updated_at,
      });
    });

    // Add pull requests
    mockPullRequests.forEach((pr) => {
      items.push({
        id: `pr-${pr.id}`,
        type: "pull_request",
        data: pr,
        timestamp: pr.updated_at,
      });
    });

    // Sort by timestamp (most recent first)
    return items.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, []);

  const loadFeedData = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const items = generateFeedItems();
      setFeedItems(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load feed data");
    } finally {
      setIsLoading(false);
    }
  }, [generateFeedItems]);

  const handleRefresh = useCallback(async () => {
    try {
      setError(null);
      setIsRefreshing(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const items = generateFeedItems();
      setFeedItems(items);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to refresh feed data"
      );
    } finally {
      setIsRefreshing(false);
    }
  }, [generateFeedItems]);

  useEffect(() => {
    loadFeedData();
  }, [loadFeedData]);

  return {
    feedItems,
    isLoading,
    isRefreshing,
    error,
    loadFeedData,
    handleRefresh,
  };
}
