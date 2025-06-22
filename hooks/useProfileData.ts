// hooks/useProfileData.ts
import { useState, useCallback } from "react";
import { ProfileData } from "@/types/profile";

export const useProfileData = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data - in real app, this would come from API
  const profileData: ProfileData = {
    user: {
      userName: "developer",
      displayName: "Sarah Chen",
      avatarUrl: "https://github.com/octocat.png",
      bio: "Full-stack developer passionate about React Native, TypeScript, and building delightful user experiences.",
      location: "San Francisco, CA",
      company: "TechCorp Inc.",
      joinedDate: "January 2020",
    },
    stats: {
      repositories: 47,
      followers: 1250,
      following: 180,
      totalStars: 2340,
    },
    activities: [
      {
        id: "1",
        type: "commit",
        title: "Updated authentication flow",
        repository: "mobile-app",
        timestamp: "2h ago",
      },
      {
        id: "2",
        type: "star",
        title: "Starred awesome-react-native",
        repository: "facebook/react-native",
        timestamp: "4h ago",
      },
      {
        id: "3",
        type: "fork",
        title: "Forked typescript-starter",
        repository: "microsoft/typescript",
        timestamp: "1d ago",
      },
      {
        id: "4",
        type: "watch",
        title: "Watching new releases",
        repository: "expo/expo",
        timestamp: "2d ago",
      },
    ],
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  }, []);

  return {
    profileData,
    isRefreshing,
    handleRefresh,
  };
};
