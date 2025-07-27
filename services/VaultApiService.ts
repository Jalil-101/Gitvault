// services/VaultApiService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ApiResponse<T> {
  content?: T[];
  last?: boolean;
  totalElements?: number;
  totalPages?: number;
}

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

interface Comment {
  id: number;
  content: string;
  authorId: number;
  authorUsername: string;
  createdAt: string;
}

interface CreatePostData {
  title: string;
  content: string;
}

interface CreateCommentData {
  content: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
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

class VaultApiService {
  private baseURL = "https://vault-backend-susi.onrender.com";
  private accessToken: string | null = null;

  constructor() {
    this.initializeToken();
  }

  private async initializeToken() {
    try {
      this.accessToken = await AsyncStorage.getItem("accessToken");
    } catch (error) {
      console.error("Error initializing token:", error);
    }
  }

  private async getAccessToken(): Promise<string | null> {
    if (!this.accessToken) {
      try {
        this.accessToken = await AsyncStorage.getItem("accessToken");
      } catch (error) {
        console.error("Token retrieval error:", error);
        return null;
      }
    }
    return this.accessToken;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getAccessToken();

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);

      if (response.status === 401) {
        // Token expired, clear stored tokens and redirect to login
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        this.accessToken = null;
        throw new Error("Authentication expired. Please login again.");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  }

  // Store tokens after login
  async storeTokens(accessToken: string, refreshToken: string): Promise<void> {
    try {
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      this.accessToken = accessToken;
    } catch (error) {
      console.error("Token storage error:", error);
      throw error;
    }
  }

  // Authentication
  async signUp(userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>("/api/v1/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async signIn(credentials: {
    username: string;
    password: string;
  }): Promise<AuthResponse> {
    const response = await this.makeRequest<AuthResponse>(
      "/api/v1/auth/signin",
      {
        method: "POST",
        body: JSON.stringify(credentials),
      }
    );

    // Store tokens after successful login
    if (response.accessToken && response.refreshToken) {
      await this.storeTokens(response.accessToken, response.refreshToken);
    }

    return response;
  }

  async signOut(): Promise<void> {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      this.accessToken = null;
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  }

  // Posts
  async createPost(postData: CreatePostData): Promise<Post> {
    return this.makeRequest<Post>("/api/posts", {
      method: "POST",
      body: JSON.stringify(postData),
    });
  }

  async getAllPosts(page = 0, size = 10): Promise<ApiResponse<Post>> {
    return this.makeRequest<ApiResponse<Post>>(
      `/api/posts?page=${page}&size=${size}`
    );
  }

  async getPost(postId: number): Promise<Post> {
    return this.makeRequest<Post>(`/api/posts/${postId}`);
  }

  async toggleLike(postId: number): Promise<void> {
    return this.makeRequest<void>(`/api/posts/${postId}/like`, {
      method: "POST",
    });
  }

  // Comments
  async addComment(
    postId: number,
    commentData: CreateCommentData
  ): Promise<Comment> {
    return this.makeRequest<Comment>(`/api/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(commentData),
    });
  }

  async getComments(postId: number): Promise<Comment[]> {
    return this.makeRequest<Comment[]>(`/api/posts/${postId}/comments`);
  }

  // Repositories
  async createRepository(repoData: {
    name: string;
    description?: string;
    isPublic: boolean;
  }): Promise<Repository> {
    return this.makeRequest<Repository>("/api/repositories", {
      method: "POST",
      body: JSON.stringify(repoData),
    });
  }

  async getUserRepositories(): Promise<Repository[]> {
    return this.makeRequest<Repository[]>("/api/repositories");
  }

  async getPublicRepositories(
    page = 0,
    size = 10
  ): Promise<ApiResponse<Repository>> {
    return this.makeRequest<ApiResponse<Repository>>(
      `/api/repositories/public?page=${page}&size=${size}`
    );
  }

  async getRepository(repoId: number): Promise<Repository> {
    return this.makeRequest<Repository>(`/api/repositories/${repoId}`);
  }

  async starRepository(repoId: number): Promise<void> {
    return this.makeRequest<void>(`/api/repositories/${repoId}/star`, {
      method: "POST",
    });
  }

  async unstarRepository(repoId: number): Promise<void> {
    return this.makeRequest<void>(`/api/repositories/${repoId}/unstar`, {
      method: "DELETE",
    });
  }

  // File operations
  async uploadFile(
    repoId: number,
    fileUri: string,
    fileName: string,
    filePath: string
  ): Promise<any> {
    const token = await this.getAccessToken();
    const formData = new FormData();

    formData.append("file", {
      uri: fileUri,
      type: "application/octet-stream",
      name: fileName,
    } as any);

    try {
      const response = await fetch(
        `${
          this.baseURL
        }/api/git/repositories/${repoId}/files?filePath=${encodeURIComponent(
          filePath
        )}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("File upload error:", error);
      throw error;
    }
  }

  async getFileContent(repoId: number, filePath: string): Promise<any> {
    return this.makeRequest<any>(
      `/api/git/repositories/${repoId}/files?filePath=${encodeURIComponent(
        filePath
      )}`
    );
  }

  async updateFile(
    repoId: number,
    filePath: string,
    content: string,
    commitMessage: string
  ): Promise<any> {
    return this.makeRequest<any>(
      `/api/git/repositories/${repoId}/files?filePath=${encodeURIComponent(
        filePath
      )}`,
      {
        method: "PUT",
        body: JSON.stringify({
          content,
          commitMessage,
        }),
      }
    );
  }

  async deleteFile(
    repoId: number,
    filePath: string,
    commitMessage: string
  ): Promise<any> {
    return this.makeRequest<any>(
      `/api/git/repositories/${repoId}/files?filePath=${encodeURIComponent(
        filePath
      )}`,
      {
        method: "DELETE",
        body: JSON.stringify({
          commitMessage,
        }),
      }
    );
  }

  // User profile
  async getCurrentUser(): Promise<any> {
    return this.makeRequest<any>("/api/v1/auth/me");
  }

  async updateProfile(profileData: {
    username?: string;
    email?: string;
  }): Promise<any> {
    return this.makeRequest<any>("/api/v1/auth/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  }

  // Search
  async searchPosts(
    query: string,
    page = 0,
    size = 10
  ): Promise<ApiResponse<Post>> {
    return this.makeRequest<ApiResponse<Post>>(
      `/api/posts/search?q=${encodeURIComponent(
        query
      )}&page=${page}&size=${size}`
    );
  }

  async searchRepositories(
    query: string,
    page = 0,
    size = 10
  ): Promise<ApiResponse<Repository>> {
    return this.makeRequest<ApiResponse<Repository>>(
      `/api/repositories/search?q=${encodeURIComponent(
        query
      )}&page=${page}&size=${size}`
    );
  }

  // Notifications
  async getNotifications(page = 0, size = 10): Promise<ApiResponse<any>> {
    return this.makeRequest<ApiResponse<any>>(
      `/api/notifications?page=${page}&size=${size}`
    );
  }

  async markNotificationAsRead(notificationId: number): Promise<void> {
    return this.makeRequest<void>(`/api/notifications/${notificationId}/read`, {
      method: "PUT",
    });
  }

  async markAllNotificationsAsRead(): Promise<void> {
    return this.makeRequest<void>("/api/notifications/read-all", {
      method: "PUT",
    });
  }
}

export const vaultApiService = new VaultApiService();
