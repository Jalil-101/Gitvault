// hooks/useSettings.ts
import { useState, useEffect } from "react";
import {
  SettingsState,
  NotificationSettings,
  SecuritySettings,
  AppPreferences,
} from "../types/settings";

export const useSettings = () => {
  const [settings, setSettings] = useState<SettingsState>({
    user: {
      id: "1",
      name: "Sarah Chen",
      username: "@developer",
      email: "sarah@example.com",
      avatar: "https://github.com/github.png",
      bio: "Full-stack developer passionate about React Native, TypeScript, and building delightful user experiences.",
      location: "San Francisco, CA",
      company: "TechCorp Inc.",
      website: "https://sarahchen.dev",
      isOnline: true,
      joinedDate: "2020-01-15",
    },
    stats: {
      repositories: 47,
      followers: 1300,
      following: 180,
      stars: 2300,
      commits: 1247,
      issues: 23,
      pullRequests: 89,
    },
    notifications: {
      pushNotifications: true,
      emailNotifications: false,
      webNotifications: true,
      mobileNotifications: true,
      schedule: {
        enabled: true,
        startTime: "09:00",
        endTime: "18:00",
        timezone: "America/Los_Angeles",
      },
      types: {
        mentions: true,
        reviews: true,
        commits: false,
        releases: true,
        security: true,
        marketing: false,
      },
    },
    security: {
      twoFactorEnabled: true,
      biometricAuth: true,
      appLock: false,
      sessionTimeout: 60,
      trustedDevices: [],
      lastPasswordChange: "2024-01-15",
    },
    preferences: {
      theme: "dark",
      language: "en",
      fontSize: "medium",
      codeTheme: "github-dark",
      showLineNumbers: true,
      enableVibration: true,
      autoSync: true,
    },
    isLoading: false,
  });

  const updateNotificationSettings = (
    newSettings: Partial<NotificationSettings>
  ) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, ...newSettings },
    }));
  };

  const updateSecuritySettings = (newSettings: Partial<SecuritySettings>) => {
    setSettings((prev) => ({
      ...prev,
      security: { ...prev.security, ...newSettings },
    }));
  };

  const updatePreferences = (newPreferences: Partial<AppPreferences>) => {
    setSettings((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...newPreferences },
    }));
  };

  const saveSettings = async () => {
    setSettings((prev) => ({ ...prev, isLoading: true }));
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Settings saved successfully");
    } catch (error) {
      setSettings((prev) => ({
        ...prev,
        error: "Failed to save settings. Please try again.",
      }));
    } finally {
      setSettings((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return {
    settings,
    updateNotificationSettings,
    updateSecuritySettings,
    updatePreferences,
    saveSettings,
  };
};
