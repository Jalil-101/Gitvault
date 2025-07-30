// store/commitsStore.ts
import SecureStore from "expo-secure-store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const STORAGE_KEY = "private-commits";

export interface PrivateCommit {
  id: string;
  message: string;
  author: string;
  avatar: string;
  date: string;
  sha: string;
  additions: number;
  deletions: number;
  repositoryId: string;
  repositoryName: string;
}

interface CommitsStore {
  privateCommits: PrivateCommit[];
  isLoading: boolean;
  addCommit: (commit: Omit<PrivateCommit, "id" | "date">) => Promise<void>;
  deleteCommit: (id: string) => Promise<void>;
  loadCommits: () => Promise<void>;
  saveCommits: () => Promise<void>;
  clearCommits: () => Promise<void>;
  getCommitsCount: () => number;
}

export const useCommitsStore = create<CommitsStore>()(
  persist(
    (set, get) => ({
      privateCommits: [],
      isLoading: false,

      addCommit: async (commitData) => {
        console.log("📝 Adding new private commit:", commitData);

        const newCommit: PrivateCommit = {
          ...commitData,
          id: Date.now().toString(),
          date: new Date().toISOString(),
        };

        console.log("✅ Created commit object:", newCommit);

        set((state) => {
          const newState = {
            privateCommits: [...state.privateCommits, newCommit],
          };
          console.log(
            "📊 Updated commits state:",
            newState.privateCommits.length,
            "commits"
          );
          return newState;
        });

        await get().saveCommits();
        console.log("💾 Commit saved to storage");
      },

      deleteCommit: async (id: string) => {
        set((state) => ({
          privateCommits: state.privateCommits.filter(
            (commit) => commit.id !== id
          ),
        }));

        await get().saveCommits();
      },

      loadCommits: async () => {
        set({ isLoading: true });
        try {
          const storedCommits = await SecureStore.getItemAsync(STORAGE_KEY);
          console.log(
            "📂 Loading commits from storage:",
            storedCommits ? "found" : "not found"
          );

          if (storedCommits) {
            const parsedCommits = JSON.parse(storedCommits);
            console.log("📋 Parsed commits:", parsedCommits.length, "commits");
            set({ privateCommits: parsedCommits });
          } else {
            console.log("📋 No stored commits found, starting with empty list");
            set({ privateCommits: [] });
          }
        } catch (error) {
          console.log("Could not load commits from storage");
        } finally {
          set({ isLoading: false });
        }
      },

      saveCommits: async () => {
        try {
          const commits = get().privateCommits;
          await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(commits));
          console.log("💾 Saved", commits.length, "commits to storage");
        } catch (error) {
          console.log("Could not save commits to storage");
        }
      },

      clearCommits: async () => {
        set({ privateCommits: [] });
        await SecureStore.deleteItemAsync(STORAGE_KEY);
        console.log("✅ Cleared all commits from storage.");
      },

      getCommitsCount: () => {
        return get().privateCommits.length;
      },
    }),
    {
      name: "commits-storage",
    }
  )
);
