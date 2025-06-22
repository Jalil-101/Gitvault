// types/profile.ts
export interface UserProfile {
  userName: string;
  displayName: string;
  avatarUrl: string;
  bio?: string;
  location?: string;
  company?: string;
  joinedDate?: string;
}

export interface ProfileStats {
  repositories: number;
  followers: number;
  following: number;
  totalStars: number;
}

export interface Activity {
  id: string;
  type: "commit" | "star" | "watch" | "fork";
  title: string;
  repository: string;
  timestamp: string;
}

export interface ProfileData {
  user: UserProfile;
  stats: ProfileStats;
  activities: Activity[];
}
