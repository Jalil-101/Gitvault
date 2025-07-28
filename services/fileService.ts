// services/fileService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://vault-backend-susi.onrender.com";

interface FileInfo {
  id?: string;
  name: string;
  path: string;
  type: "file" | "folder";
  size?: number;
  lastModified?: string;
  status?: "added" | "modified" | "deleted";
}

interface CommitInfo {
  hash: string;
  message: string;
  author: string;
  date: string;
  files: FileInfo[];
}

class FileService {
  private async getAuthToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      console.log("FileService - Retrieved token:", !!token);
      return token;
    } catch (error) {
      console.error("FileService - Error getting auth token:", error);
      return null;
    }
  }

  private async getAuthHeaders() {
    const token = await this.getAuthToken();
    if (!token) {
      throw new Error("Authentication token not found. Please log in.");
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  // Try multiple endpoint patterns for file retrieval
  async getRepositoryFiles(repositoryId: number): Promise<FileInfo[]> {
    console.log(`FileService - Fetching files for repository ${repositoryId}`);
    
    const endpoints = [
      `/api/repositories/${repositoryId}/files`,
      `/api/git/repositories/${repositoryId}/files`,
      `/api/repositories/${repositoryId}/committed-files`,
      `/api/git/repositories/${repositoryId}/committed-files`,
      `/api/repositories/${repositoryId}/cli-files`,
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`FileService - Trying endpoint: ${endpoint}`);
        const files = await this.tryGetFiles(endpoint);
        if (files && files.length > 0) {
          console.log(`FileService - Success with endpoint: ${endpoint}`);
          return files;
        }
      } catch (error) {
        console.log(`FileService - Failed with endpoint ${endpoint}:`, error);
        continue;
      }
    }

    throw new Error("No working endpoint found for file retrieval");
  }

  private async tryGetFiles(endpoint: string): Promise<FileInfo[]> {
    const headers = await this.getAuthHeaders();
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers,
    });

    console.log(`FileService - Response status for ${endpoint}: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log(`FileService - Retrieved ${data.length || 0} files from ${endpoint}`);
    return data;
  }

  // Get commit history for a repository
  async getRepositoryCommits(repositoryId: number): Promise<CommitInfo[]> {
    console.log(`FileService - Fetching commits for repository ${repositoryId}`);
    
    const endpoints = [
      `/api/repositories/${repositoryId}/commits`,
      `/api/git/repositories/${repositoryId}/commits`,
      `/api/repositories/${repositoryId}/cli-commits`,
      `/api/git/repositories/${repositoryId}/cli-commits`,
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`FileService - Trying commits endpoint: ${endpoint}`);
        const commits = await this.tryGetCommits(endpoint);
        if (commits && commits.length > 0) {
          console.log(`FileService - Success with commits endpoint: ${endpoint}`);
          return commits;
        }
      } catch (error) {
        console.log(`FileService - Failed with commits endpoint ${endpoint}:`, error);
        continue;
      }
    }

    throw new Error("No working endpoint found for commit retrieval");
  }

  private async tryGetCommits(endpoint: string): Promise<CommitInfo[]> {
    const headers = await this.getAuthHeaders();
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers,
    });

    console.log(`FileService - Commits response status for ${endpoint}: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log(`FileService - Retrieved ${data.length || 0} commits from ${endpoint}`);
    return data;
  }

  // Get files from a specific commit
  async getCommitFiles(repositoryId: number, commitHash: string): Promise<FileInfo[]> {
    console.log(`FileService - Fetching files for commit ${commitHash} in repository ${repositoryId}`);
    
    const endpoints = [
      `/api/repositories/${repositoryId}/commits/${commitHash}/files`,
      `/api/git/repositories/${repositoryId}/commits/${commitHash}/files`,
      `/api/commits/${commitHash}/files`,
      `/api/git/commits/${commitHash}/files`,
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`FileService - Trying commit files endpoint: ${endpoint}`);
        const files = await this.tryGetFiles(endpoint);
        if (files && files.length > 0) {
          console.log(`FileService - Success with commit files endpoint: ${endpoint}`);
          return files;
        }
      } catch (error) {
        console.log(`FileService - Failed with commit files endpoint ${endpoint}:`, error);
        continue;
      }
    }

    throw new Error("No working endpoint found for commit files retrieval");
  }

  // Search files in a repository
  async searchRepositoryFiles(repositoryId: number, query: string): Promise<FileInfo[]> {
    console.log(`FileService - Searching files in repository ${repositoryId} for: ${query}`);
    
    const endpoints = [
      `/api/repositories/${repositoryId}/files/search?q=${encodeURIComponent(query)}`,
      `/api/git/repositories/${repositoryId}/files/search?q=${encodeURIComponent(query)}`,
      `/api/repositories/${repositoryId}/search?q=${encodeURIComponent(query)}`,
      `/api/git/repositories/${repositoryId}/search?q=${encodeURIComponent(query)}`,
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`FileService - Trying search endpoint: ${endpoint}`);
        const files = await this.tryGetFiles(endpoint);
        if (files && files.length > 0) {
          console.log(`FileService - Success with search endpoint: ${endpoint}`);
          return files;
        }
      } catch (error) {
        console.log(`FileService - Failed with search endpoint ${endpoint}:`, error);
        continue;
      }
    }

    throw new Error("No working endpoint found for file search");
  }

  // Get file content
  async getFileContent(repositoryId: number, filePath: string): Promise<string> {
    console.log(`FileService - Fetching content for file: ${filePath} in repository ${repositoryId}`);
    
    const endpoints = [
      `/api/repositories/${repositoryId}/files/content?path=${encodeURIComponent(filePath)}`,
      `/api/git/repositories/${repositoryId}/files/content?path=${encodeURIComponent(filePath)}`,
      `/api/repositories/${repositoryId}/files?path=${encodeURIComponent(filePath)}`,
      `/api/git/repositories/${repositoryId}/files?path=${encodeURIComponent(filePath)}`,
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`FileService - Trying file content endpoint: ${endpoint}`);
        const content = await this.tryGetFileContent(endpoint);
        if (content) {
          console.log(`FileService - Success with file content endpoint: ${endpoint}`);
          return content;
        }
      } catch (error) {
        console.log(`FileService - Failed with file content endpoint ${endpoint}:`, error);
        continue;
      }
    }

    throw new Error("No working endpoint found for file content retrieval");
  }

  private async tryGetFileContent(endpoint: string): Promise<string> {
    const headers = await this.getAuthHeaders();
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers,
    });

    console.log(`FileService - File content response status for ${endpoint}: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.content || data.data || data;
  }

  // Debug method to test all endpoints
  async debugEndpoints(repositoryId: number): Promise<any> {
    console.log(`FileService - Debugging endpoints for repository ${repositoryId}`);
    
    const results = {
      repositoryId,
      timestamp: new Date().toISOString(),
      endpoints: {} as any,
    };

    const fileEndpoints = [
      `/api/repositories/${repositoryId}/files`,
      `/api/git/repositories/${repositoryId}/files`,
      `/api/repositories/${repositoryId}/committed-files`,
      `/api/git/repositories/${repositoryId}/committed-files`,
      `/api/repositories/${repositoryId}/cli-files`,
    ];

    for (const endpoint of fileEndpoints) {
      try {
        const headers = await this.getAuthHeaders();
        const response = await fetch(`${BASE_URL}${endpoint}`, { headers });
        
        results.endpoints[endpoint] = {
          status: response.status,
          ok: response.ok,
          error: response.ok ? null : await response.text(),
        };
      } catch (error) {
        results.endpoints[endpoint] = {
          status: 'ERROR',
          ok: false,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    }

    console.log("FileService - Debug results:", results);
    return results;
  }
}

export const fileService = new FileService(); 