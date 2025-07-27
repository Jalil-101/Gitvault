// services/repositoryService.ts
import {
  CreateRepositoryData,
  Repository,
  UpdateRepositoryData,
} from "@/types/repo/repository";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://vault-backend-susi.onrender.com";

class RepositoryService {
  private async getAuthToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      console.log(
        "Retrieved token:",
        token ? `${token.substring(0, 20)}...` : "null"
      );
      return token;
    } catch (error) {
      console.error("Error getting auth token:", error);
      return null;
    }
  }

  private async getAuthHeaders() {
    const token = await this.getAuthToken();
    console.log("Auth token available:", !!token);
    if (!token) {
      console.warn("No authentication token found!");
      throw new Error("Authentication token not found. Please log in.");
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  async createRepository(repoData: CreateRepositoryData): Promise<Repository> {
    const response = await fetch(`${BASE_URL}/api/repositories`, {
      method: "POST",
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(repoData),
    });

    if (!response.ok) {
      throw new Error("Failed to create repository");
    }

    return await response.json();
  }

  async getUserRepositories(): Promise<Repository[]> {
    const response = await fetch(`${BASE_URL}/api/repositories`, {
      headers: await this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    return await response.json();
  }

  async getPublicRepositories(): Promise<Repository[]> {
    const response = await fetch(`${BASE_URL}/api/repositories/public`);

    if (!response.ok) {
      throw new Error("Failed to fetch public repositories");
    }

    return await response.json();
  }

  async getRepositoryDetails(id: number): Promise<Repository> {
    const headers = await this.getAuthHeaders();
    console.log(`Making request to: ${BASE_URL}/api/repositories/${id}`);
    console.log("Headers:", headers);

    const response = await fetch(`${BASE_URL}/api/repositories/${id}`, {
      headers,
    });

    console.log(`Response status: ${response.status}`);
    console.log(`Response ok: ${response.ok}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Repository details error: ${response.status} - ${errorText}`
      );
      throw new Error(
        `Failed to fetch repository details: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log("Repository data received:", data);
    return data;
  }

  async updateRepository(
    id: number,
    updateData: UpdateRepositoryData
  ): Promise<Repository> {
    const response = await fetch(`${BASE_URL}/api/repositories/${id}`, {
      method: "PUT",
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error("Failed to update repository");
    }

    return await response.json();
  }

  async deleteRepository(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/api/repositories/${id}`, {
      method: "DELETE",
      headers: await this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to delete repository");
    }
  }

  async getRepositoryFiles(id: number): Promise<any[]> {
    const response = await fetch(`${BASE_URL}/api/repositories/${id}/files`, {
      headers: await this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch repository files");
    }

    return await response.json();
  }

  async searchRepositoryFiles(id: number, path: string): Promise<any[]> {
    const response = await fetch(
      `${BASE_URL}/api/repositories/${id}/files/search?path=${encodeURIComponent(
        path
      )}`,
      {
        headers: await this.getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to search repository files");
    }

    return await response.json();
  }
}

export const repositoryService = new RepositoryService();
