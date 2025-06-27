// types/settings.ts
export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio?: string;
  location?: string;
  company?: string;
  website?: string;
  isOnline: boolean;
  joinedDate: string;
}

export interface UserStats {
  repositories: number;
  followers: number;
  following: number;
  stars: number;
  commits: number;
  issues: number;
  pullRequests: number;
}

export interface NotificationSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  webNotifications: boolean;
  mobileNotifications: boolean;
  schedule: {
    enabled: boolean;
    startTime: string;
    endTime: string;
    timezone: string;
  };
  types: {
    mentions: boolean;
    reviews: boolean;
    commits: boolean;
    releases: boolean;
    security: boolean;
    marketing: boolean;
  };
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  biometricAuth: boolean;
  appLock: boolean;
  sessionTimeout: number; // in minutes
  trustedDevices: string[];
  lastPasswordChange: string;
}

export interface AppPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  fontSize: "small" | "medium" | "large";
  codeTheme: string;
  showLineNumbers: boolean;
  enableVibration: boolean;
  autoSync: boolean;
}

export interface SettingsState {
  user: UserProfile;
  stats: UserStats;
  notifications: NotificationSettings;
  security: SecuritySettings;
  preferences: AppPreferences;
  isLoading: boolean;
  error?: string;
}
