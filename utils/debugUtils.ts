// utils/debugUtils.ts
import { repositoryService } from "@/services/repositoryService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "@/store/authStore";

export class DebugUtils {
  static async checkAuthStatus() {
    console.log("🔍 === AUTH DEBUG START ===");

    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");

      console.log("📱 Access Token exists:", !!accessToken);
      console.log("📱 Refresh Token exists:", !!refreshToken);

      if (accessToken) {
        console.log(
          "📱 Access Token preview:",
          accessToken.substring(0, 50) + "..."
        );
        console.log("📱 Access Token length:", accessToken.length);
      }

      if (refreshToken) {
        console.log(
          "📱 Refresh Token preview:",
          refreshToken.substring(0, 50) + "..."
        );
        console.log("📱 Refresh Token length:", refreshToken.length);
      }
    } catch (error) {
      console.error("❌ Error checking auth status:", error);
    }

    console.log("🔍 === AUTH DEBUG END ===");
  }

  static async checkRepositoryFlow() {
    console.log("🔍 === REPOSITORY FLOW DEBUG START ===");

    try {
      // Step 1: Check if we can get user repositories
      console.log("📋 Step 1: Fetching user repositories...");
      const repositories = await repositoryService.getUserRepositories();
      console.log("📋 Found repositories:", repositories.length);

      if (repositories.length > 0) {
        const firstRepo = repositories[0];
        console.log("📋 First repository:", {
          id: firstRepo.id,
          name: firstRepo.name,
          type: typeof firstRepo.id,
          isPrivate: firstRepo.isPrivate,
        });

        // Step 2: Try to get details for the first repository
        console.log("📋 Step 2: Fetching repository details...");
        try {
          const repoDetails = await repositoryService.getRepositoryDetails(
            firstRepo.id
          );
          console.log("📋 Repository details fetched successfully:", {
            id: repoDetails.id,
            name: repoDetails.name,
          });

          // Step 3: Try to get files for the repository
          console.log("📋 Step 3: Fetching repository files...");
          try {
            const files = await repositoryService.getRepositoryFiles(
              firstRepo.id
            );
            console.log(
              "📋 Repository files fetched successfully:",
              files.length
            );
          } catch (fileError) {
            console.error("❌ Failed to fetch repository files:", fileError);
          }
        } catch (detailError) {
          console.error("❌ Failed to fetch repository details:", detailError);
        }
      } else {
        console.log("📋 No repositories found - user might not have any repos");
      }
    } catch (error) {
      console.error("❌ Repository flow debug failed:", error);
    }

    console.log("🔍 === REPOSITORY FLOW DEBUG END ===");
  }

  static async testRepositoryCreation() {
    console.log("🔍 === REPOSITORY CREATION TEST START ===");

    try {
      const testRepoData = {
        name: `test-repo-${Date.now()}`,
        description: "Test repository for debugging",
        isPrivate: false,
      };

      console.log("📋 Creating test repository:", testRepoData);
      const newRepo = await repositoryService.createRepository(testRepoData);
      console.log("📋 Test repository created successfully:", {
        id: newRepo.id,
        name: newRepo.name,
        type: typeof newRepo.id,
      });

      // Clean up - delete the test repository
      console.log("📋 Cleaning up test repository...");
      await repositoryService.deleteRepository(newRepo.id);
      console.log("📋 Test repository deleted successfully");
    } catch (error) {
      console.error("❌ Repository creation test failed:", error);
    }

    console.log("🔍 === REPOSITORY CREATION TEST END ===");
  }

  static async validateRepositoryId(id: any) {
    console.log("🔍 === REPOSITORY ID VALIDATION ===");
    console.log("📋 Input ID:", id);
    console.log("📋 Type:", typeof id);
    console.log("📋 Is number:", typeof id === "number");
    console.log("📋 Is string:", typeof id === "string");
    console.log("📋 Is finite:", Number.isFinite(id));
    console.log("📋 Parsed as number:", Number(id));
    console.log("🔍 === REPOSITORY ID VALIDATION END ===");
  }

  static async runFullDiagnostic() {
    console.log("🔍 === FULL DIAGNOSTIC START ===");

    await this.checkAuthStatus();
    await this.checkRepositoryFlow();

    console.log("🔍 === FULL DIAGNOSTIC END ===");
  }
}

export const checkAuthStoreState = () => {
  try {
    const authState = useAuthStore.getState();
    console.log("🔐 Auth Store State:", {
      isAuthenticated: authState.isAuthenticated,
      hasToken: !!authState.token,
      hasRefreshToken: !!authState.refreshToken,
      hasUser: !!authState.user,
      loading: authState.loading,
      error: authState.error,
    });
    return authState;
  } catch (error) {
    console.error("❌ Error checking auth store state:", error);
    return null;
  }
};
