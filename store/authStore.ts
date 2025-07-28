// stores/authStore.ts
import { vaultApiService } from "@/services/VaultApiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Types and Interfaces
export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
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
  isFirstTime: boolean;

  // Actions
  signUp: (userData: SignUpData) => Promise<AuthResult>;
  signIn: (credentials: SignInCredentials) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  verifyAuth: () => Promise<boolean>;
  completeOnboarding: () => void;
  clearError: () => void;
  syncTokensFromStorage: () => Promise<void>;
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
      isFirstTime: true, // For onboarding

      // Actions
      signUp: async (userData: SignUpData): Promise<AuthResult> => {
        set({ loading: true, error: null });
        try {
          // Backend returns user object directly (no nested response)
          const response = await vaultApiService.signUp(userData);
          console.log("🔵 signUp backend response:", response);

          // Note: Backend signup doesn't return tokens, only user data
          // You might need to automatically sign in after signup
          set({
            user: {
              id: response.id,
              firstName: response.firstName,
              lastName: response.lastName,
              email: response.email,
              role: response.role,
            },
            loading: false,
            isFirstTime: true, // Set to true for new accounts to trigger onboarding
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
        set({ loading: true, error: null });
        try {
          const response = await vaultApiService.signIn(credentials);
          console.log("🟢 signIn backend response:", response);

          // Store tokens in AsyncStorage
          await AsyncStorage.setItem("accessToken", response.token);
          await AsyncStorage.setItem("refreshToken", response.refreshToken);

          const storedToken = await AsyncStorage.getItem("accessToken");
          const storedRefreshToken = await AsyncStorage.getItem("refreshToken");
          console.log("🗝️ Stored accessToken:", storedToken ? `${storedToken.substring(0, 20)}...` : "null");
          console.log("🗝️ Stored refreshToken:", storedRefreshToken ? `${storedRefreshToken.substring(0, 20)}...` : "null");

          set({
            user: {
              firstName: response.firstName,
              lastName: response.lastName,
              email: credentials.email, // Backend doesn't return email in signin response
            },
            token: response.token, // Store token in store state
            refreshToken: response.refreshToken, // Store refresh token in store state
            isAuthenticated: true,
            loading: false,
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

      signOut: async (): Promise<void> => {
        set({ loading: true });

        try {
          const { token } = get();
          if (token) {
            await vaultApiService.signOut(token);
          }

          // Clear AsyncStorage
          await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
        } catch (error) {
          console.log("Sign out error:", error);
          // Continue with local sign out even if API fails
        }

        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        });
      },

      // Check if stored token is valid
      verifyAuth: async (): Promise<boolean> => {
        try {
          const storedToken = await AsyncStorage.getItem("accessToken");
          const storedRefreshToken = await AsyncStorage.getItem("refreshToken");

          console.log("🔍 verifyAuth - storedToken:", storedToken ? `${storedToken.substring(0, 20)}...` : "null");
          console.log("🔍 verifyAuth - storedRefreshToken:", storedRefreshToken ? `${storedRefreshToken.substring(0, 20)}...` : "null");

          if (!storedToken) {
            console.log("🔍 verifyAuth - No stored token found");
            return false;
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
                });
                console.log("✅ Token refreshed successfully");
                return true;
              } catch (refreshError) {
                console.log("❌ Token refresh failed:", refreshError);
                // Refresh failed, clear auth state
                await get().signOut();
                return false;
              }
            } else {
              console.log("❌ No refresh token available");
              await get().signOut();
              return false;
            }
          } else {
            // Token is valid, sync to store state
            console.log("✅ Token is valid, syncing to store state");
            set({
              token: storedToken,
              refreshToken: storedRefreshToken,
              isAuthenticated: true,
            });
            return true;
          }
        } catch (error) {
          console.error("❌ verifyAuth error:", error);
          await get().signOut();
          return false;
        }
      },

      completeOnboarding: (): void => {
        set({ isFirstTime: false });
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
        isFirstTime: state.isFirstTime,
        // Don't persist tokens here since we store them separately in AsyncStorage
      }),
    }
  )
);
