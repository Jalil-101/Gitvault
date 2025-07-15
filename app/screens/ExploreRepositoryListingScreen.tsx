// screens/RepositoryListingScreen.tsx
import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  FlatList,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Repository, ListingConfig } from "@/types/repo";
import { RepositoryCard } from "@/components/explore/repolist/RepositoryCards";
import { SearchAndFilter } from "@/components/explore/repolist/SearchAndFilter";
import { useModernTheme } from "@/context/ThemeContext";
import { useThemeClasses } from "@/hooks/useThemeColor";

// Mock data - replace with actual API calls
const mockRepositories: Repository[] = [
  {
    id: "1",
    name: "react",
    fullName: "facebook/react",
    description:
      "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    language: "JavaScript",
    stars: 220000,
    forks: 45000,
    avatar: "https://avatars.githubusercontent.com/u/69631?v=4",
    owner: "facebook",
    updatedAt: "2024-01-15T10:30:00Z",
    isPrivate: false,
    topics: ["javascript", "react", "frontend", "ui"],
    url: "https://github.com/facebook/react",
  },
  {
    id: "2",
    name: "vue",
    fullName: "vuejs/vue",
    description:
      "This is the repo for Vue 2. For Vue 3, go to https://github.com/vuejs/core",
    language: "JavaScript",
    stars: 207000,
    forks: 33000,
    avatar: "https://avatars.githubusercontent.com/u/6128107?v=4",
    owner: "vuejs",
    updatedAt: "2024-01-14T15:20:00Z",
    isPrivate: false,
    topics: ["vue", "frontend", "javascript"],
    url: "https://github.com/vuejs/vue",
  },
  {
    id: "3",
    name: "next.js",
    fullName: "vercel/next.js",
    description: "The React Framework for the Web",
    language: "JavaScript",
    stars: 118000,
    forks: 25000,
    avatar: "https://avatars.githubusercontent.com/u/14985020?v=4",
    owner: "vercel",
    updatedAt: "2024-01-16T09:45:00Z",
    isPrivate: false,
    topics: ["react", "nextjs", "vercel", "frontend"],
    url: "https://github.com/vercel/next.js",
  },
  // Add more mock repositories as needed
];

const getListingConfig = (type: string): ListingConfig => {
  if (type === "trending") {
    return {
      type: "trending",
      title: "Trending Today",
      subtitle: "Most starred repositories",
      accentColor: "green",
    };
  }

  return {
    type: "discover",
    title: "Discover",
    subtitle: "Popular repositories",
    accentColor: "blue",
  };
};

export const RepositoryListingScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const listingType = (params.type as string) || "trending";
  const { colors } = useModernTheme();
  const themeClasses = useThemeClasses();

  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<any>({});
  const [sortBy, setSortBy] = useState<any>({ field: "stars", order: "desc" });

  const config = getListingConfig(listingType);

  useEffect(() => {
    loadRepositories();
  }, []);

  const loadRepositories = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setRepositories(mockRepositories);
    } catch (error) {
      console.error("Error loading repositories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadRepositories();
    setRefreshing(false);
  };

  const handleRepositoryPress = (repository: Repository) => {
    router.push({
      pathname: "/repository/[id]",
      params: { id: repository.id, repository: JSON.stringify(repository) },
    });
  };

  const filteredAndSortedRepositories = useMemo(() => {
    let filtered = repositories;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.owner.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.language) {
      filtered = filtered.filter((repo) => repo.language === filters.language);
    }
    if (filters.minStars > 0) {
      filtered = filtered.filter((repo) => repo.stars >= filters.minStars);
    }
    if (filters.hasTopics) {
      filtered = filtered.filter((repo) => repo.topics.length > 0);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy.field as keyof Repository];
      let bValue: any = b[sortBy.field as keyof Repository];

      if (sortBy.field === "name") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortBy.order === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [repositories, searchQuery, filters, sortBy]);

  const renderRepository = ({
    item,
    index,
  }: {
    item: Repository;
    index: number;
  }) => (
    <RepositoryCard
      repository={item}
      config={config}
      onPress={handleRepositoryPress}
      index={index}
    />
  );

  const renderHeader = () => (
    <View className="px-4 pt-4 pb-2">
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <Text
          className={`text-base ${
            themeClasses.accents[config.accentColor].main
          }`}
        >
          ← Back
        </Text>
      </TouchableOpacity>

      <View className="mb-4">
        <Text className={`text-2xl font-bold ${themeClasses.text.primary}`}>
          {config.title}
        </Text>
        <Text className={`text-base ${themeClasses.text.secondary}`}>
          {config.subtitle}
        </Text>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View className="flex-1 justify-center items-center py-20">
      <Text className={`text-base text-center ${themeClasses.text.secondary}`}>
        No repositories found matching your criteria
      </Text>
    </View>
  );

  const getAccentColor = () => {
    return colors.accents[config.accentColor].main;
  };

  if (loading) {
    return (
      <SafeAreaView className={`flex-1 ${themeClasses.bg.primary}`}>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={getAccentColor()} />
          <Text className={`text-base mt-4 ${themeClasses.text.primary}`}>
            Loading repositories...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={`flex-1 ${themeClasses.bg.primary}`}>
      {renderHeader()}

      <SearchAndFilter
        onSearch={setSearchQuery}
        onFilter={setFilters}
        onSort={setSortBy}
        config={config}
      />

      <FlatList
        data={filteredAndSortedRepositories}
        renderItem={renderRepository}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={getAccentColor()}
          />
        }
        ListEmptyComponent={renderEmpty}
      />
    </SafeAreaView>
  );
};

export default RepositoryListingScreen;
