import React, { useState } from "react";
import { Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";
import { useExploreData } from "@/hooks/useExploreData";
import { ExploreTab } from "@/types/explore";
import { ExploreTabs } from "@/components/explore/ExploreTabs";
import { ExploreHeader } from "@/components/explore/ExploreHeader";
import { ExploreContent } from "@/components/explore/ExploreContent";

const ExploreScreen = () => {
  const { colors, isDarkTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<ExploreTab>("repositories");
  const [refreshing, setRefreshing] = useState(false);

  const {
    mockTrendingRepos,
    mockTrendingDevs,
    mockTrendingTopics,
    loading,
    error,
    refetch,
  } = useExploreData();

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleTabChange = (tab: ExploreTab) => {
    setActiveTab(tab);
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case "repositories":
        return mockTrendingRepos;
      case "developers":
        return mockTrendingDevs;
      case "topics":
        return mockTrendingTopics;
      default:
        return [];
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-github-light-canvas-subtle dark:bg-github-dark-canvas-subtle"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor={
          isDarkTheme ? colors.canvas.subtle : colors.canvas.subtle
        }
        translucent={false}
      />

      <ExploreHeader>
        <ExploreTabs activeTab={activeTab} setActiveTab={handleTabChange} />
      </ExploreHeader>

      <ExploreContent
        activeTab={activeTab}
        data={getCurrentData()}
        loading={loading}
        error={error}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

export default ExploreScreen;
