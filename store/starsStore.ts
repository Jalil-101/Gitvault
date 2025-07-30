// store/starsStore.ts
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const STORAGE_KEY = "starred-repositories";

export interface StarredRepository {
  id: number;
  name: string;
  fullName: string;
  description?: string;
  owner: {
    login: string;
    avatarUrl: string;
  };
  language?: string;
  stargazersCount: number;
  forksCount: number;
  updatedAt: string;
  htmlUrl: string;
  isStarred: boolean;
  starredAt: string;
}

interface StarsStore {
  starredRepositories: StarredRepository[];
  isLoading: boolean;
  addStarredRepository: (
    repo: Omit<StarredRepository, "isStarred" | "starredAt">
  ) => Promise<void>;
  removeStarredRepository: (repoId: number) => Promise<void>;
  toggleStar: (repo: StarredRepository) => Promise<void>;
  loadStarredRepositories: () => Promise<void>;
  saveStarredRepositories: () => Promise<void>;
  clearStarredRepositories: () => Promise<void>;
  getStarredCount: () => number;
  isStarred: (repoId: number) => boolean;
}

export const useStarsStore = create<StarsStore>()(
  persist(
    (set, get) => ({
      starredRepositories: [],
      isLoading: false,

      addStarredRepository: async (repoData) => {
        console.log("⭐ Adding starred repository:", repoData.name);

        const newStarredRepo: StarredRepository = {
          ...repoData,
          isStarred: true,
          starredAt: new Date().toISOString(),
        };

        console.log("✅ Created starred repo object:", newStarredRepo);

        set((state) => {
          // Check if repo already exists
          const exists = state.starredRepositories.find(
            (repo) => repo.id === repoData.id
          );
          if (exists) {
            console.log("⚠️ Repository already starred");
            return state;
          }

          const newState = {
            starredRepositories: [...state.starredRepositories, newStarredRepo],
          };
          console.log(
            "📊 Updated starred repos state:",
            newState.starredRepositories.length,
            "repos"
          );
          return newState;
        });

        try {
          await get().saveStarredRepositories();
          console.log("💾 Starred repository saved to storage");
        } catch (error) {
          // Mute error console log - only show user alert if needed
          console.log("Could not save starred repository to storage");
        }
      },

      removeStarredRepository: async (repoId: number) => {
        console.log("⭐ Removing starred repository:", repoId);

        set((state) => ({
          starredRepositories: state.starredRepositories.filter(
            (repo) => repo.id !== repoId
          ),
        }));

        try {
          await get().saveStarredRepositories();
          console.log("💾 Starred repository removed from storage");
        } catch (error) {
          // Mute error console log - only show user alert if needed
          console.log("Could not remove starred repository from storage");
        }
      },

      toggleStar: async (repo: StarredRepository) => {
        if (repo.isStarred) {
          await get().removeStarredRepository(repo.id);
        } else {
          await get().addStarredRepository(repo);
        }
      },

      loadStarredRepositories: async () => {
        set({ isLoading: true });
        try {
          const storedRepos = await SecureStore.getItemAsync(STORAGE_KEY);
          console.log(
            "📂 Loading starred repos from storage:",
            storedRepos ? "found" : "not found"
          );

          if (storedRepos) {
            const parsedRepos = JSON.parse(storedRepos);
            console.log(
              "📋 Parsed starred repos:",
              parsedRepos.length,
              "repos"
            );
            set({ starredRepositories: parsedRepos });
          } else {
            console.log(
              "📋 No stored starred repos found, starting with empty list"
            );
            set({ starredRepositories: [] });
          }
        } catch (error) {
          console.error("❌ Error loading starred repositories:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      saveStarredRepositories: async () => {
        try {
          const repos = get().starredRepositories;
          await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(repos));
          console.log("💾 Saved", repos.length, "starred repos to storage");
        } catch (error) {
          // Mute error console log - only show user alert if needed
          console.log("Could not save starred repositories to storage");
        }
      },

      clearStarredRepositories: async () => {
        set({ starredRepositories: [] });
        await SecureStore.deleteItemAsync(STORAGE_KEY);
        console.log("✅ Cleared all starred repositories from storage.");
      },

      getStarredCount: () => {
        return get().starredRepositories.length;
      },

      isStarred: (repoId: number) => {
        return get().starredRepositories.some((repo) => repo.id === repoId);
      },
    }),
    {
      name: "stars-storage",
    }
  )
);
