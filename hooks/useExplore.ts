// hooks/useExplore.ts
import { vaultApiService } from "@/services/VaultApiService";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  authorUsername: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  commentsCount: number;
  likedByCurrentUser: boolean;
  comments: Comment[];
}

interface Repository {
  id: number;
  name: string;
  description?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  starCount: number;
  starredByCurrentUser: boolean;
  ownerUsername: string;
  language?: string;
}

interface Comment {
  id: number;
  content: string;
  authorId: number;
  authorUsername: string;
  createdAt: string;
}

export type ExploreTab = "posts" | "repositories";

interface UseExploreReturn {
  // State
  activeTab: ExploreTab;
  posts: Post[];
  repositories: Repository[];
  githubRepositories: any[]; // GitHub repositories as fallback
  loading: boolean;
  refreshing: boolean;
  hasMorePosts: boolean;
  hasMoreRepos: boolean;
  searchQuery: string;
  isSearching: boolean;
  useGitHubFallback: boolean; // Flag to indicate if using GitHub fallback

  // Actions
  setActiveTab: (tab: ExploreTab) => void;
  setSearchQuery: (query: string) => void;
  loadPosts: (refresh?: boolean) => Promise<void>;
  loadRepositories: (refresh?: boolean) => Promise<void>;
  loadGitHubRepositories: (username?: string) => Promise<void>;
  handleLikePost: (postId: number) => Promise<void>;
  handleStarRepository: (repoId: number) => Promise<void>;
  updatePost: (updatedPost: Post) => void;
  updateRepository: (updatedRepo: Repository) => void;
  searchContent: () => Promise<void>;
  clearSearch: () => void;
}

export const useExplore = (): UseExploreReturn => {
  const [activeTab, setActiveTab] = useState<ExploreTab>("posts");
  const [posts, setPosts] = useState<Post[]>([]);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [githubRepositories, setGithubRepositories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [hasMoreRepos, setHasMoreRepos] = useState(true);
  const [postsPage, setPostsPage] = useState(0);
  const [reposPage, setReposPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [useGitHubFallback, setUseGitHubFallback] = useState(false);

  const loadPosts = useCallback(
    async (refresh = false) => {
      if (loading && !refresh) return;

      if (refresh) {
        setPostsPage(0);
        setPosts([]);
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      try {
        const currentPage = refresh ? 0 : postsPage;
        const response = await vaultApiService.getAllPosts(currentPage, 10);

        if (refresh) {
          setPosts(response.content || []);
        } else {
          setPosts((prev) => [...prev, ...(response.content || [])]);
        }

        setHasMorePosts(!response.last);
        setPostsPage(currentPage + 1);
      } catch (error) {
        console.error("Error loading posts:", error);
        Alert.alert("Error", "Failed to load posts");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [loading, postsPage]
  );

  const loadGitHubRepositories = useCallback(
    async (username: string = "microsoft") => {
      setLoading(true);
      setUseGitHubFallback(true);

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch GitHub repositories");
        }

        const data = await response.json();

        // Transform GitHub API response to match our Repository interface
        const transformedRepos = data.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || "",
          isPublic: !repo.private,
          createdAt: repo.created_at,
          updatedAt: repo.updated_at,
          starCount: repo.stargazers_count,
          starredByCurrentUser: false, // We don't know this for GitHub repos
          ownerUsername: repo.owner.login,
          language: repo.language || "Unknown",
          // Additional GitHub-specific properties
          full_name: repo.full_name,
          html_url: repo.html_url,
          clone_url: repo.clone_url,
          forks_count: repo.forks_count,
          topics: repo.topics || [],
        }));

        setGithubRepositories(transformedRepos);
        setHasMoreRepos(false); // Disable pagination for GitHub fallback
      } catch (error) {
        console.error("Error loading GitHub repositories:", error);
        Alert.alert("Error", "Failed to load GitHub repositories");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loadRepositories = useCallback(
    async (refresh = false) => {
      if (loading && !refresh) return;

      if (refresh) {
        setReposPage(0);
        setRepositories([]);
        setGithubRepositories([]);
        setUseGitHubFallback(false);
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      try {
        const currentPage = refresh ? 0 : reposPage;
        const response = await vaultApiService.getPublicRepositories(
          currentPage,
          10
        );

        if (refresh) {
          setRepositories(response.content || []);
        } else {
          setRepositories((prev) => [...prev, ...(response.content || [])]);
        }

        setHasMoreRepos(!response.last);
        setReposPage(currentPage + 1);
      } catch (error) {
        console.error(
          "Error loading repositories from backend, falling back to GitHub:",
          error
        );

        // Fallback to GitHub repositories
        if (refresh || repositories.length === 0) {
          await loadGitHubRepositories();
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [loading, reposPage, repositories.length, loadGitHubRepositories]
  );

  const handleLikePost = useCallback(async (postId: number) => {
    try {
      await vaultApiService.toggleLike(postId);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likedByCurrentUser: !post.likedByCurrentUser,
                likesCount: post.likedByCurrentUser
                  ? post.likesCount - 1
                  : post.likesCount + 1,
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error);
      Alert.alert("Error", "Failed to update like");
    }
  }, []);

  const handleStarRepository = useCallback(
    async (repoId: number) => {
      try {
        const repo = repositories.find((r) => r.id === repoId);
        if (!repo) return;

        if (repo.starredByCurrentUser) {
          await vaultApiService.unstarRepository(repoId);
        } else {
          await vaultApiService.starRepository(repoId);
        }

        setRepositories((prevRepos) =>
          prevRepos.map((repository) =>
            repository.id === repoId
              ? {
                  ...repository,
                  starredByCurrentUser: !repository.starredByCurrentUser,
                  starCount: repository.starredByCurrentUser
                    ? repository.starCount - 1
                    : repository.starCount + 1,
                }
              : repository
          )
        );
      } catch (error) {
        console.error("Error toggling star:", error);
        Alert.alert("Error", "Failed to update star");
      }
    },
    [repositories]
  );

  const updatePost = useCallback((updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  }, []);

  const updateRepository = useCallback((updatedRepo: Repository) => {
    setRepositories((prevRepos) =>
      prevRepos.map((repo) => (repo.id === updatedRepo.id ? updatedRepo : repo))
    );
  }, []);

  const searchContent = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      if (activeTab === "posts") {
        const response = await vaultApiService.searchPosts(searchQuery, 0, 20);
        setPosts(response.content || []);
        setHasMorePosts(false); // Disable pagination for search results
      } else {
        const response = await vaultApiService.searchRepositories(
          searchQuery,
          0,
          20
        );
        setRepositories(response.content || []);
        setHasMoreRepos(false); // Disable pagination for search results
      }
    } catch (error) {
      console.error("Error searching:", error);
      Alert.alert("Error", "Failed to search content");
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, activeTab]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setIsSearching(false);

    // Reset pagination and reload content
    if (activeTab === "posts") {
      setPostsPage(0);
      setHasMorePosts(true);
      loadPosts(true);
    } else {
      setReposPage(0);
      setHasMoreRepos(true);
      loadRepositories(true);
    }
  }, [activeTab, loadPosts, loadRepositories]);

  const handleTabChange = useCallback(
    (tab: ExploreTab) => {
      setActiveTab(tab);

      // Clear search when switching tabs
      if (searchQuery) {
        clearSearch();
      }

      // Load content for the new tab if not already loaded
      if (tab === "posts" && posts.length === 0) {
        loadPosts(true);
      } else if (tab === "repositories" && repositories.length === 0) {
        loadRepositories(true);
      }
    },
    [
      searchQuery,
      clearSearch,
      posts.length,
      repositories.length,
      loadPosts,
      loadRepositories,
    ]
  );

  // Load initial content
  useEffect(() => {
    if (activeTab === "posts") {
      loadPosts(true);
    } else {
      loadRepositories(true);
    }
  }, []); // Only run on mount

  return {
    // State
    activeTab,
    posts,
    repositories,
    githubRepositories,
    loading,
    refreshing,
    hasMorePosts,
    hasMoreRepos,
    searchQuery,
    isSearching,
    useGitHubFallback,

    // Actions
    setActiveTab: handleTabChange,
    setSearchQuery,
    loadPosts,
    loadRepositories,
    loadGitHubRepositories,
    handleLikePost,
    handleStarRepository,
    updatePost,
    updateRepository,
    searchContent,
    clearSearch,
  };
};
