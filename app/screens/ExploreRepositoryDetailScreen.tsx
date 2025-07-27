import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StatusBar, Text, View } from "react-native";

import { ReadmeTab } from "../../components/readme/ReadmeTab";
import { RepositoryCloneSection } from "../../components/repository/RepositoryCloneSection";
import { RepositoryDetailHeader } from "../../components/repository/RepositoryDetailHeader";
import { RepositoryInfo } from "../../components/repository/RepositoryInfo";
import { RepositoryStatsGrid } from "../../components/repository/RepositoryStatsGrid";
import { RepositoryTopics } from "../../components/repository/RepositoryTopics";
import { Button } from "../../components/ui/Button";
import { useModernTheme } from "../../context/ThemeContext";
import { useThemeClasses } from "../../hooks/useThemeColor";
import { GitHubRepository as Repository } from "../../types/repository";

type TabType = "overview" | "readme";

export default function ExploreRepositoryDetailScreen() {
  const { repositoryData } = useLocalSearchParams();
  const router = useRouter();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Theme hooks
  const { colors, isDarkTheme } = useModernTheme();
  const themeClasses = useThemeClasses();

  useEffect(() => {
    if (repositoryData && typeof repositoryData === "string") {
      try {
        const parsedRepo = JSON.parse(repositoryData) as Repository;
        setRepository(parsedRepo);
      } catch (error) {
        console.error("Error parsing repository data:", error);
        Alert.alert("Error", "Failed to load repository data");
        router.back();
      }
    }
  }, [repositoryData]);

  if (!repository) {
    return (
      <View
        className={`flex-1 justify-center items-center ${themeClasses.bg.primary}`}
      >
        <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} />
        <Text className={`text-base ${themeClasses.text.secondary}`}>
          Loading repository details...
        </Text>
      </View>
    );
  }

  // Validate that we have the minimum required repository data
  if (!repository.id || !repository.name) {
    return (
      <View
        className={`flex-1 justify-center items-center ${themeClasses.bg.primary}`}
      >
        <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} />
        <Text className={`text-base ${themeClasses.text.secondary}`}>
          Invalid repository data
        </Text>
      </View>
    );
  }

  const renderTabContent = () => {
    // Ensure we have valid repository data with proper fallbacks
    const safeRepository = {
      ...repository,
      owner: repository.owner || { login: "Unknown", avatar_url: "" },
      license: repository.license || { name: "Unknown", spdx_id: "" },
    };

    const transformedRepository = {
      ...safeRepository,
      isPrivate: safeRepository.private,
      owner: {
        id: 0,
        firstName: safeRepository.owner?.login || "Unknown",
        lastName: "",
        email: "",
      },
      license: safeRepository.license?.name || "Unknown",
    };

    switch (activeTab) {
      case "readme":
        return <ReadmeTab repository={transformedRepository} />;
      case "overview":
      default:
        return (
          <ScrollView className={`flex-1 ${themeClasses.bg.primary}`}>
            {safeRepository.description && (
              <View className={`${themeClasses.surface.primary} mt-2 p-4`}>
                <Text
                  className={`text-base ${themeClasses.text.primary} leading-6`}
                >
                  {safeRepository.description}
                </Text>
              </View>
            )}
            <RepositoryStatsGrid repository={repository} />
            <RepositoryInfo repository={transformedRepository} />
            <RepositoryTopics repository={transformedRepository} />
            <RepositoryCloneSection repository={repository} />
          </ScrollView>
        );
    }
  };

  return (
    <View className={`flex-1 ${themeClasses.bg.primary}`}>
      <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} />
      <RepositoryDetailHeader repository={repository} />

      {/* Tab Navigation */}
      <View
        className={`${themeClasses.surface.primary} ${themeClasses.border.primary} border-b`}
      >
        <View className="flex-row px-4">
          <Button
            variant={activeTab === "overview" ? "primary" : "ghost"}
            onPress={() => setActiveTab("overview")}
            size="sm"
          >
            Overview
          </Button>
          <Button
            variant={activeTab === "readme" ? "primary" : "ghost"}
            onPress={() => setActiveTab("readme")}
            size="sm"
          >
            README
          </Button>
        </View>
      </View>

      {/* Tab Content */}
      {renderTabContent()}
    </View>
  );
}
