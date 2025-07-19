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
import { Repository, DetailConfig } from "@/types/repository";
import { RepoHeader } from "@/components/explore/repository/RepoHeader";
import { RepoStats } from "@/components/explore/repository/RepoStats";
import { RepoTopics } from "@/components/explore/repository/RepoTopics";
import { RepoLanguages } from "@/components/explore/repository/RepoLanguages";
import { RepoDetails } from "@/components/explore/repository/RepoDetails";
import { RepoActions } from "@/components/explore/repository/RepoActions";
import { useModernTheme } from "@/context/ThemeContext";

const getDetailConfig = (type: string, colors: any): DetailConfig => {
  if (type === "trending") {
    return {
      type: "trending",
      colorScheme: {
        primary: colors.accents.green.main,
        secondary: colors.status.success.dark,
        accent: colors.accents.green.main,
        background: colors.background.primary,
        cardBackground: colors.surface.primary,
        textPrimary: colors.text.primary,
        textSecondary: colors.text.secondary,
      },
    };
  }

  return {
    type: "discover",
    colorScheme: {
      primary: colors.accents.blue.main,
      secondary: colors.status.info.dark,
      accent: colors.accents.blue.main,
      background: colors.background.primary,
      cardBackground: colors.surface.primary,
      textPrimary: colors.text.primary,
      textSecondary: colors.text.secondary,
    },
  };
};

export const RepositoryDetailScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { colors } = useModernTheme();

  const [repository, setRepository] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Determine the type from the repository data or URL params
  const repositoryData = params.repository as string;
  const listingType = (params.type as string) || "discover";

  const config = getDetailConfig(listingType, colors);

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
      pathname: "/screens/SearchScreen",
      params: { query: topic, type: "topic" },
    });
  };

  if (loading) {
    return (
      <SafeAreaView
        className="flex-1"
        style={{ backgroundColor: config.colorScheme.background }}
      >
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={config.colorScheme.primary} />
          <Text
            className="text-base mt-4"
            style={{ color: colors.text.primary }}
          >
            Loading repository...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !repository) {
    return (
      <SafeAreaView
        className="flex-1"
        style={{ backgroundColor: config.colorScheme.background }}
      >
        <View className="flex-1 justify-center items-center px-4">
          <Text
            className="text-lg font-semibold mb-2"
            style={{ color: colors.status.error.main }}
          >
            Error Loading Repository
          </Text>
          <Text
            className="text-base text-center mb-4"
            style={{ color: colors.text.tertiary }}
          >
            {error || "Repository data not found"}
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="px-6 py-3 rounded-lg"
            style={{ backgroundColor: config.colorScheme.primary }}
          >
            <Text
              className="font-medium"
              style={{ color: colors.text.inverse }}
            >
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: config.colorScheme.background }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={config.colorScheme.primary}
          />
        }
      >
        <RepoHeader
          repository={repository}
          config={config}
          onBack={() => router.back()}
        />

        <RepoStats repository={repository} config={config} />

        <RepoTopics
          repository={repository}
          config={config}
          onTopicPress={handleTopicPress}
        />

        <RepoLanguages repository={repository} config={config} />

        <RepoDetails repository={repository} config={config} />

        <RepoActions repository={repository} config={config} />

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RepositoryDetailScreen;
