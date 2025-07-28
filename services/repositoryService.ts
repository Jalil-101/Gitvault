// services/repositoryService.ts
import { useAuthStore } from "@/store/authStore";
import {
  CreateRepositoryData,
  Repository,
  UpdateRepositoryData,
} from "@/types/repo/repository";

const BASE_URL = "https://vault-backend-susi.onrender.com";

class RepositoryService {
  private async getAuthToken(): Promise<string | null> {
    try {
      // Get token from auth store instead of AsyncStorage directly
      const authState = useAuthStore.getState();
      const token = authState.token;

      console.log(
        "RepositoryService - Retrieved token from auth store:",
        token ? `${token.substring(0, 20)}...` : "null"
      );
      return token;
    } catch (error) {
      console.error("RepositoryService - Error getting auth token:", error);
      return null;
    }
  }

  private async getAuthHeaders() {
    const token = await this.getAuthToken();
    console.log("RepositoryService - Auth token available:", !!token);
    if (!token) {
      console.warn("RepositoryService - No authentication token found!");
      throw new Error("Authentication token not found. Please log in.");
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  async createRepository(repoData: CreateRepositoryData): Promise<Repository> {
    console.log("RepositoryService - Creating repository:", repoData);
    const headers = await this.getAuthHeaders();

    // Transform the data to match backend expectations
    const backendData = {
      name: repoData.name,
      description: repoData.description,
      isPrivate: repoData.isPrivate, // Use isPrivate directly as per backend docs
    };

    const response = await fetch(`${BASE_URL}/api/repositories`, {
      method: "POST",
      headers,
      body: JSON.stringify(backendData),
    });

    console.log(
      `RepositoryService - Create response status: ${response.status}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `RepositoryService - Create failed: ${response.status} - ${errorText}`
      );
      throw new Error(
        `Failed to create repository: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log("RepositoryService - Created repository:", data);

    // Transform the response back to match our interface
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      isPrivate: data.isPrivate, // Use isPrivate directly
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      owner: data.owner,
    };
  }

  async getUserRepositories(): Promise<Repository[]> {
    console.log("RepositoryService - Fetching user repositories");
    const headers = await this.getAuthHeaders();

    const response = await fetch(`${BASE_URL}/api/repositories`, {
      headers,
    });

    console.log(
      `RepositoryService - Get user repos response status: ${response.status}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `RepositoryService - Get user repos failed: ${response.status} - ${errorText}`
      );
      throw new Error(
        `Failed to fetch repositories: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log(
      `RepositoryService - Retrieved ${data.length} repositories:`,
      data
    );

    // Transform the response to match our interface
    return data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      isPrivate: repo.isPrivate, // Use isPrivate directly as per backend docs
      createdAt: repo.createdAt,
      updatedAt: repo.updatedAt,
      owner: repo.owner,
    }));
  }

  async getPublicRepositories(): Promise<Repository[]> {
    console.log("RepositoryService - Fetching public repositories");

    const response = await fetch(`${BASE_URL}/api/repositories/public`);

    console.log(
      `RepositoryService - Get public repos response status: ${response.status}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `RepositoryService - Get public repos failed: ${response.status} - ${errorText}`
      );
      throw new Error(
        `Failed to fetch public repositories: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log(
      `RepositoryService - Retrieved ${data.length} public repositories`
    );
    return data;
  }

  async getRepositoryDetails(id: number): Promise<Repository> {
    console.log(
      `RepositoryService - Fetching repository details for ID: ${id}`
    );
    const headers = await this.getAuthHeaders();
    console.log(
      `RepositoryService - Making request to: ${BASE_URL}/api/repositories/${id}`
    );
    console.log("RepositoryService - Headers:", headers);

    const response = await fetch(`${BASE_URL}/api/repositories/${id}`, {
      headers,
    });

    console.log(`RepositoryService - Response status: ${response.status}`);
    console.log(`RepositoryService - Response ok: ${response.ok}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `RepositoryService - Repository details error: ${response.status} - ${errorText}`
      );
      throw new Error(
        `Failed to fetch repository details: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log("RepositoryService - Repository data received:", data);
    return data;
  }

  async updateRepository(
    id: number,
    updateData: UpdateRepositoryData
  ): Promise<Repository> {
    console.log(`RepositoryService - Updating repository ${id}:`, updateData);
    const headers = await this.getAuthHeaders();

    const response = await fetch(`${BASE_URL}/api/repositories/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(updateData),
    });

    console.log(
      `RepositoryService - Update response status: ${response.status}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `RepositoryService - Update failed: ${response.status} - ${errorText}`
      );
      throw new Error(
        `Failed to update repository: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log("RepositoryService - Updated repository:", data);
    return data;
  }

  async deleteRepository(id: number): Promise<void> {
    console.log(`RepositoryService - Deleting repository ${id}`);
    const headers = await this.getAuthHeaders();

    const response = await fetch(`${BASE_URL}/api/repositories/${id}`, {
      method: "DELETE",
      headers,
    });

    console.log(
      `RepositoryService - Delete response status: ${response.status}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `RepositoryService - Delete failed: ${response.status} - ${errorText}`
      );
      throw new Error(
        `Failed to delete repository: ${response.status} - ${errorText}`
      );
    }

    console.log("RepositoryService - Repository deleted successfully");
  }

  async getRepositoryFiles(id: number): Promise<any[]> {
    console.log(`RepositoryService - Fetching files for repository ${id}`);
    const headers = await this.getAuthHeaders();

    const response = await fetch(`${BASE_URL}/api/repositories/${id}/files`, {
      headers,
    });

    console.log(
      `RepositoryService - Get files response status: ${response.status}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `RepositoryService - Get files failed: ${response.status} - ${errorText}`
      );
      throw new Error(
        `Failed to fetch repository files: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log(
      `RepositoryService - Retrieved ${data.length} files for repository ${id}`
    );
    return data;
  }

  async searchRepositoryFiles(id: number, path: string): Promise<any[]> {
    console.log(
      `RepositoryService - Searching files in repository ${id} for path: ${path}`
    );
    const headers = await this.getAuthHeaders();

    const response = await fetch(
      `${BASE_URL}/api/repositories/${id}/files/search?path=${encodeURIComponent(
        path
      )}`,
      {
        headers,
      }
    );

    console.log(
      `RepositoryService - Search files response status: ${response.status}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `RepositoryService - Search files failed: ${response.status} - ${errorText}`
      );
      throw new Error(
        `Failed to search repository files: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log(
      `RepositoryService - Found ${data.length} files matching search`
    );
    return data;
  }
}

export const repositoryService = new RepositoryService();
