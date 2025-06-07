// hooks/useProfileScreen.ts
import { useState, useEffect } from "react";
import { Animated } from "react-native";
import { UserProfile, Repository, TabType } from "@/types/profile";

export const useProfileScreen = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<TabType>("repositories");

  // Animation values
  const scrollY = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const scaleAnim = new Animated.Value(0.9);

  // Mock data
  const [profile] = useState<UserProfile>({
    name: "Sarah Chen",
    username: "sarahchen",
    bio: "Full-stack developer passionate about open source and mobile development. Building the future one commit at a time. 🚀",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    followers: 1247,
    following: 892,
    publicRepos: 47,
    location: "San Francisco, CA",
    company: "@github",
    website: "sarahchen.dev",
    joinedDate: "Joined Mar 2019",
    contributions: 1853,
  });

  const [repositories] = useState<Repository[]>([
    {
      id: "1",
      name: "react-native-animation-kit",
      description:
        "A comprehensive animation library for React Native with smooth, performant animations.",
      language: "TypeScript",
      stars: 324,
      forks: 45,
      isPrivate: false,
      updatedAt: "2 days ago",
    },
    {
      id: "2",
      name: "github-mobile-clone",
      description:
        "A pixel-perfect GitHub mobile app clone built with React Native and Expo.",
      language: "TypeScript",
      stars: 156,
      forks: 23,
      isPrivate: false,
      updatedAt: "5 days ago",
    },
    {
      id: "3",
      name: "design-system",
      description:
        "Modern design system components for React Native applications.",
      language: "JavaScript",
      stars: 89,
      forks: 12,
      isPrivate: true,
      updatedAt: "1 week ago",
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const avatarScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      TypeScript: "#3178c6",
      JavaScript: "#f1e05a",
      Python: "#3572A5",
      Java: "#b07219",
      Swift: "#fa7343",
    };
    return colors[language] || "#6e7681";
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return {
    loading,
    refreshing,
    selectedTab,
    setSelectedTab,
    profile,
    repositories,
    scrollY,
    fadeAnim,
    slideAnim,
    scaleAnim,
    headerOpacity,
    avatarScale,
    onRefresh,
    getLanguageColor,
    formatNumber,
  };
};
