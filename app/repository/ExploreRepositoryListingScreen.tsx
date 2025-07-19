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
  StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Repository, ListingConfig } from "@/types/repository";
import { RepositoryCard } from "@/components/explore/repository/RepositoryCard";
import { SearchAndFilter } from "@/components/explore/repository/SearchAndFilter";
import { useModernTheme } from "@/context/ThemeContext";

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

const getListingConfig = (type: string, colors: any): ListingConfig => {
  if (type === "trending") {
    return {
      type: "trending",
      title: "Trending Today",
      subtitle: "Most starred repositories",
      colorScheme: {
        primary: colors.accents.green.main,
        secondary: colors.status.success.dark,
        accent: colors.accents.green.main,
        background: colors.background.primary,
      },
    };
  }

  return {
    type: "discover",
    title: "Discover",
    subtitle: "Popular repositories",
    colorScheme: {
      primary: colors.accents.blue.main,
      secondary: colors.status.info.dark,
      accent: colors.accents.blue.main,
      background: colors.background.primary,
    },
  };
};

export const RepositoryListingScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const listingType = (params.type as string) || "trending";
  const { colors, shadows } = useModernTheme();

  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<any>({});
  const [sortBy, setSortBy] = useState<any>({ field: "stars", order: "desc" });

  const config = getListingConfig(listingType, colors);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      color: colors.text.primary,
      fontSize: 16,
      marginTop: 16,
    },
    header: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
    },
    backButton: {
      marginBottom: 16,
    },
    backButtonText: {
      color: colors.accents.blue.main,
      fontSize: 16,
    },
    titleContainer: {
      marginBottom: 16,
    },
    title: {
      color: colors.text.primary,
      fontSize: 24,
      fontWeight: "bold",
    },
    subtitle: {
      color: colors.text.tertiary,
      fontSize: 16,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 80,
    },
    emptyText: {
      color: colors.text.tertiary,
      fontSize: 16,
      textAlign: "center",
    },
    flatListContent: {
      paddingBottom: 20,
    },
  });

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
      pathname: "../repository/ExploreRepositoryDetailScreen",
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
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{config.title}</Text>
        <Text style={styles.subtitle}>{config.subtitle}</Text>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        No repositories found matching your criteria
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={config.colorScheme.primary} />
          <Text style={styles.loadingText}>Loading repositories...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={config.colorScheme.primary}
          />
        }
        ListEmptyComponent={renderEmpty}
      />
    </SafeAreaView>
  );
};

export default RepositoryListingScreen;
