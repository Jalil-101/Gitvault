// StarsScreen.tsx
import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { useThemeClasses } from "@/hooks/useThemeColor";
import { dummyStarredRepos } from "@/data/dummyData";
import { useRepositorySearch } from "@/hooks/useRepositorySearch";
import { StarsHeader } from "@/components/stars/StarsHeader";
import { SearchBar } from "@/components/stars/SearchBar";
import { RepositoryList } from "@/components/stars/RepositoryList";
import { Repository } from "@/types/starRepository";

export const StarsScreen = ({ navigation }: any) => {
  const { colors, isDarkTheme } = useModernTheme();
  const themeClasses = useThemeClasses();

  const [refreshing, setRefreshing] = useState(false);

  const { searchQuery, setSearchQuery, filteredRepositories } =
    useRepositorySearch(dummyStarredRepos);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleRepositoryPress = (repository: Repository) => {
    // Navigate to repository details or handle repository press
    console.log("Repository pressed:", repository.name);
  };

  const handleStarToggle = (repository: Repository) => {
    // Handle star/unstar functionality
    console.log("Star toggled for:", repository.name);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background.primary }}
    >
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor={colors.surface.secondary}
      />

      <StarsHeader
        onBackPress={() => navigation.goBack()}
        repositoryCount={dummyStarredRepos.length}
      />

      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <RepositoryList
        repositories={filteredRepositories}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onRepositoryPress={handleRepositoryPress}
        onStarToggle={handleStarToggle}
      />
    </SafeAreaView>
  );
};
