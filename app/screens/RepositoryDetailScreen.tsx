// screens/RepositoryDetailScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Repository } from "@/types/repo";
import { RepoHeader } from "@/components/repository/RepoHeader";
import { RepoStats } from "@/components/repository/RepoStats";
import { RepoTopics } from "@/components/repository/RepoTopics";
import { RepoLanguages } from "@/components/repository/RepoLanguages";
import { RepoDetails } from "@/components/repository/RepoDetails";
import { RepoActions } from "@/components/repository/RepoActions";
import { useModernTheme } from "@/context/ThemeContext";
import { useThemeClasses } from "@/hooks/useThemeColor";

export const RepositoryDetailScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { colors, gradients } = useModernTheme();
  const themeClasses = useThemeClasses();

  const [repository, setRepository] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get repository data and listing type from params
  const repositoryData = params.repository as string;
  const listingType = (params.type as string) || "discover";

  useEffect(() => {
    loadRepositoryData();
  }, []);

  const loadRepositoryData = async () => {
    setLoading(true);
    setError(null);

    try {
      if (repositoryData) {
        // Parse repository data passed from listing screen
        const parsedRepo = JSON.parse(repositoryData);

        // Simulate API call to get extended repository data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Enhanced repository data with additional details
        const enhancedRepo: Repository = {
          ...parsedRepo,
          watchers: Math.floor(parsedRepo.stars * 0.1),
          openIssues: Math.floor(Math.random() * 500),
          license: "MIT",
          size: Math.floor(Math.random() * 10000),
          defaultBranch: "main",
          createdAt: "2020-01-15T10:30:00Z",
          pushedAt: parsedRepo.updatedAt,
          homepage: parsedRepo.name.includes("react")
            ? "https://reactjs.org"
            : undefined,
          contributors: Math.floor(Math.random() * 1000),
          releases: Math.floor(Math.random() * 100),
          languages: {
            [parsedRepo.language]: 85,
            TypeScript: 10,
            CSS: 3,
            HTML: 2,
          },
        };

        setRepository(enhancedRepo);
      } else {
        throw new Error("No repository data provided");
      }
    } catch (err) {
      setError("Failed to load repository details");
      console.error("Error loading repository:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadRepositoryData();
    setRefreshing(false);
  };

  const handleTopicPress = (topic: string) => {
    // Navigate to topic search or similar repositories
    router.push({
      pathname: "../Search",
      params: { query: topic, type: "topic" },
    });
  };

  if (loading) {
    return (
      <SafeAreaView
        className={`flex-1 ${themeClasses.bg.primary}`}
        style={{ backgroundColor: colors.background.primary }}
      >
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={colors.interactive.primary} />
          <Text className={`${themeClasses.text.primary} text-base mt-4`}>
            Loading repository...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !repository) {
    return (
      <SafeAreaView
        className={`flex-1 ${themeClasses.bg.primary}`}
        style={{ backgroundColor: colors.background.primary }}
      >
        <View className="flex-1 justify-center items-center px-4">
          <Text
            className={`${themeClasses.status.error.main} text-lg font-semibold mb-2`}
          >
            Error Loading Repository
          </Text>
          <Text
            className={`${themeClasses.text.tertiary} text-base text-center mb-4`}
          >
            {error || "Repository data not found"}
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className={`px-6 py-3 rounded-lg ${themeClasses.interactive.primary}`}
          >
            <Text className="text-white font-medium">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className={`flex-1 ${themeClasses.bg.primary}`}
      style={{ backgroundColor: colors.background.primary }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.interactive.primary}
          />
        }
      >
        <RepoHeader
          repository={repository}
          onBack={() => router.back()}
          listingType={listingType as "trending" | "discover"}
        />

        <RepoStats repository={repository} />

        <RepoTopics repository={repository} onTopicPress={handleTopicPress} />

        <RepoLanguages repository={repository} />

        <RepoDetails repository={repository} />

        <RepoActions repository={repository} />

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RepositoryDetailScreen;
