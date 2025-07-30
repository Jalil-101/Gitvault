// stores/authStore.ts
import { vaultApiService } from "@/services/VaultApiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { format } from "date-fns";

// Types and Interfaces
export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  accountCreatedAt?: string; // ISO string of account creation date
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
}

export interface AuthState {
  // State
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  hasCompletedOnboarding: boolean;

  // Actions
  signUp: (userData: SignUpData) => Promise<AuthResult>;
  signIn: (credentials: SignInCredentials) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  verifyAuth: () => Promise<boolean>;
  completeOnboarding: () => void;
  clearOnboardingStatus: () => void;
  clearError: () => void;
  syncTokensFromStorage: () => Promise<void>;
  clearAllAuthData: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      hasCompletedOnboarding: false,

      // Actions
      signUp: async (userData: SignUpData): Promise<AuthResult> => {
        set({ loading: true, error: null });
        try {
          // Clear any existing todos for new accounts
          try {
            const { useTodoStore } = await import("../store/todoStore");
            const todoStore = useTodoStore.getState();
            // Clear all todos for new account
            await todoStore.clearTodos();
            console.log("🧹 Cleared todos for new account");
          } catch (error) {
            console.log("Could not clear todos for new account:", error);
          }

          // Clear any existing commits for new accounts
          try {
            const { useCommitsStore } = await import("../store/commitsStore");
            const commitsStore = useCommitsStore.getState();
            // Clear all commits for new account
            await commitsStore.clearCommits();
            console.log("🧹 Cleared commits for new account");
          } catch (error) {
            console.log("Could not clear commits for new account:", error);
          }

          // Clear any existing starred repositories for new accounts
          try {
            const { useStarsStore } = await import("../store/starsStore");
            const starsStore = useStarsStore.getState();
            // Clear all starred repositories for new account
            await starsStore.clearStarredRepositories();
            console.log("🧹 Cleared starred repositories for new account");
          } catch (error) {
            console.log("Could not clear starred repositories for new account:", error);
          }

          // Backend returns user object directly (no nested response)
          const response = await vaultApiService.signUp(userData);
          console.log("🔵 signUp backend response:", response);

          // Note: Backend signup doesn't return tokens, only user data
          // You might need to automatically sign in after signup
          const now = new Date();
          const accountCreatedAt = now.toISOString(); // Store full ISO string for accuracy
          console.log("📅 Account created at:", format(now, "MMM dd, yyyy 'at' h:mm a"));
          set({
            user: {
              id: response.id,
              firstName: response.firstName,
              lastName: response.lastName,
              email: response.email,
              role: response.role,
              accountCreatedAt, // Set account creation date
            },
            loading: false,
            hasCompletedOnboarding: false, // New users need onboarding
          });

          // Auto sign-in after successful signup
          const signInResult = await get().signIn({
            email: userData.email,
            password: userData.password,
          });

          return { success: true };
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unknown error occurred";
          set({ error: errorMessage, loading: false });
          return { success: false, error: errorMessage };
        }
      },

      signIn: async (credentials: SignInCredentials): Promise<AuthResult> => {
        console.log("🟢 Starting signIn process...");
        set({ loading: true, error: null, hasCompletedOnboarding: false }); // Clear onboarding status for new account
        
        // Clear any existing auth data to ensure clean slate
        try {
          await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
          console.log("🗑️ Cleared existing auth data for clean sign in");
        } catch (error) {
          console.log("Failed to clear existing auth data:", error);
        }
        
        try {
          const response = await vaultApiService.signIn(credentials);
          console.log("🟢 signIn backend response:", response);

          // Validate response has required tokens
          if (!response.token || !response.refreshToken) {
            throw new Error("Invalid response: Missing tokens from server");
          }

          // Store tokens in AsyncStorage with error handling
          try {
            await AsyncStorage.setItem("accessToken", response.token);
            await AsyncStorage.setItem("refreshToken", response.refreshToken);
            console.log("🗝️ Tokens stored successfully");
          } catch (storageError) {
            console.error("❌ Failed to store tokens:", storageError);
            throw new Error("Failed to store authentication tokens");
          }

          // Verify tokens were stored correctly
          const storedToken = await AsyncStorage.getItem("accessToken");
          const storedRefreshToken = await AsyncStorage.getItem("refreshToken");
          
          if (!storedToken || !storedRefreshToken) {
            console.error("❌ Tokens not found after storage");
            throw new Error("Authentication tokens not properly stored");
          }
          
          console.log("🗝️ Stored accessToken:", storedToken ? `${storedToken.substring(0, 20)}...` : "null");
          console.log("🗝️ Stored refreshToken:", storedRefreshToken ? `${storedRefreshToken.substring(0, 20)}...` : "null");

          // For sign-in (returning users), they should have completed onboarding
          // Only new users from signup should go through onboarding
          console.log("🟢 Setting auth state for returning user...");
          
          set({
            user: {
              firstName: response.firstName,
              lastName: response.lastName,
              email: credentials.email, // Backend doesn't return email in signin response
              accountCreatedAt: response.accountCreatedAt || new Date().toISOString(), // Use backend date or default to now
            },
            token: response.token, // Store token in store state
            refreshToken: response.refreshToken, // Store refresh token in store state
            isAuthenticated: true,
            loading: false,
            // Returning users have completed onboarding
            hasCompletedOnboarding: true,
          });
          console.log("🟢 Auth state set successfully for returning user");

          return { success: true };
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unknown error occurred";
          console.log("❌ SignIn error:", errorMessage);
          set({ error: errorMessage, loading: false });
          return { success: false, error: errorMessage };
        }
      },

      signOut: async (): Promise<void> => {
        set({ loading: true });
        try {
          // Clear todos when signing out
          try {
            const { useTodoStore } = await import("../store/todoStore");
            const todoStore = useTodoStore.getState();
            await todoStore.clearTodos();
            console.log("🧹 Cleared todos on sign out");
          } catch (error) {
            console.log("Could not clear todos on sign out:", error);
          }

          // Clear commits when signing out
          try {
            const { useCommitsStore } = await import("../store/commitsStore");
            const commitsStore = useCommitsStore.getState();
            await commitsStore.clearCommits();
            console.log("🧹 Cleared commits on sign out");
          } catch (error) {
            console.log("Could not clear commits on sign out:", error);
          }

          // Clear starred repositories when signing out
          try {
            const { useStarsStore } = await import("../store/starsStore");
            const starsStore = useStarsStore.getState();
            await starsStore.clearStarredRepositories();
            console.log("🧹 Cleared starred repositories on sign out");
          } catch (error) {
            console.log("Could not clear starred repositories on sign out:", error);
          }

          // Clear all stored data
          await AsyncStorage.multiRemove([
            "accessToken",
            "refreshToken",
            "auth-storage",
          ]);

          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            loading: false,
            error: null,
            hasCompletedOnboarding: false,
          });

          console.log("✅ Sign out completed successfully");
        } catch (error) {
          console.error("❌ Error during sign out:", error);
          set({ loading: false });
        }
      },

      // Clear all stored auth data (useful for account switching)
      clearAllAuthData: async (): Promise<void> => {
        try {
          await AsyncStorage.multiRemove([
            "accessToken", 
            "refreshToken",
            "auth-storage"
          ]);
          console.log("🗑️ All auth data cleared manually");
        } catch (error) {
          console.error("Failed to clear auth data:", error);
        }
      },

      // Check if stored token is valid
      verifyAuth: async (): Promise<boolean> => {
        set({ loading: true });
        try {
          const storedToken = await AsyncStorage.getItem("accessToken");
          const storedRefreshToken = await AsyncStorage.getItem("refreshToken");

          console.log("🔍 verifyAuth - storedToken:", storedToken ? `${storedToken.substring(0, 20)}...` : "null");
          console.log("🔍 verifyAuth - storedRefreshToken:", storedRefreshToken ? `${storedRefreshToken.substring(0, 20)}...` : "null");

          if (!storedToken) {
            console.log("🔍 verifyAuth - No stored token found (fresh start or account switch)");
            set({ 
              loading: false,
              isAuthenticated: false,
              hasCompletedOnboarding: false,
              user: null,
              token: null,
              refreshToken: null
            });
            return false; // This is normal for fresh start or account switch
          }

          const tokenPayload: any = jwtDecode(storedToken);
          const isExpired = tokenPayload.exp * 1000 < Date.now();

          console.log("🔍 verifyAuth - Token expired:", isExpired);

          if (isExpired) {
            // Try to refresh token if available
            if (storedRefreshToken) {
              try {
                console.log("🔄 Attempting to refresh token...");
                const refreshResponse = await vaultApiService.refreshToken(
                  storedRefreshToken
                );
                await AsyncStorage.setItem(
                  "accessToken",
                  refreshResponse.token
                );

                set({
                  token: refreshResponse.token, // Update store state
                  isAuthenticated: true,
                  loading: false,
                });
                console.log("✅ Token refreshed successfully");
                return true;
              } catch (refreshError) {
                console.log("❌ Token refresh failed:", refreshError);
                // Refresh failed, clear auth state
                await get().signOut();
                set({ loading: false });
                return false;
              }
            } else {
              console.log("❌ No refresh token available");
              await get().signOut();
              set({ loading: false });
              return false;
            }
          } else {
            // Token is valid, sync to store state
            console.log("✅ Token is valid, syncing to store state");
            set({
              token: storedToken,
              refreshToken: storedRefreshToken,
              isAuthenticated: true,
              loading: false,
            });
            return true;
          }
        } catch (error) {
          console.error("❌ verifyAuth error:", error);
          await get().signOut();
          set({ loading: false });
          return false;
        }
      },

      completeOnboarding: (): void => {
        set({ hasCompletedOnboarding: true });
      },

      clearOnboardingStatus: (): void => {
        set({ hasCompletedOnboarding: false });
      },

      clearError: (): void => set({ error: null }),

      syncTokensFromStorage: async (): Promise<void> => {
        const storedToken = await AsyncStorage.getItem("accessToken");
        const storedRefreshToken = await AsyncStorage.getItem("refreshToken");

        if (storedToken) {
          const tokenPayload: any = jwtDecode(storedToken);
          const isExpired = tokenPayload.exp * 1000 < Date.now();

          if (isExpired) {
            // If token is expired, try to refresh it
            if (storedRefreshToken) {
              try {
                const refreshResponse = await vaultApiService.refreshToken(
                  storedRefreshToken
                );
                await AsyncStorage.setItem(
                  "accessToken",
                  refreshResponse.token
                );
                set({ token: refreshResponse.token });
                console.log("✅ Token refreshed from storage");
              } catch (refreshError) {
                console.log("❌ Token refresh failed from storage:", refreshError);
                // Refresh failed, clear auth state
                await get().signOut();
              }
            } else {
              console.log("❌ No refresh token available for sync");
              await get().signOut();
            }
          } else {
            // Token is valid, sync to store state
            set({ token: storedToken, refreshToken: storedRefreshToken });
            console.log("✅ Token is valid, synced from storage");
          }
        } else {
          console.log("🔍 No access token found in storage for sync");
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        // Don't persist hasCompletedOnboarding - it should be account-specific
        // Don't persist tokens here since we store them separately in AsyncStorage
      }),
    }
  )
);
