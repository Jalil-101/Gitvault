// screens/StarsScreen.tsx
import { StarredRepositoryCard } from "@/components/stars/StarredRepositoryCard";
import { TrendingRepositoryCard } from "@/components/stars/TrendingRepositoryCard";
import { useModernTheme } from "@/context/ThemeContext";
import { githubService } from "@/services/githubService";
import { StarredRepository, useStarsStore } from "@/store/starsStore";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const StarsScreen = () => {
  const { colors, shadows, gradients, isDarkTheme } = useModernTheme();
  const { starredRepositories, loadStarredRepositories } = useStarsStore();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<"personal" | "trending">(
    "personal"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingRepositories, setTrendingRepositories] = useState<
    StarredRepository[]
  >([]);
  const [filteredRepositories, setFilteredRepositories] = useState<
    StarredRepository[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Load starred repositories from store
  useEffect(() => {
    loadStarredRepositories();
  }, [loadStarredRepositories]);

  // Load trending repositories from GitHub API
  useEffect(() => {
    if (activeTab === "trending") {
      loadTrendingRepositories();
    }
  }, [activeTab]);

  const loadTrendingRepositories = async () => {
    try {
      setLoading(true);
      const githubRepos = await githubService.getPopularRepositories(page, 20);
      const convertedRepos = githubRepos.map((githubRepo) => ({
        ...githubService.convertToStarredRepository(githubRepo),
        isStarred: false, // These are not starred by default
        starredAt: "",
      }));
      setTrendingRepositories(convertedRepos);
    } catch (error) {
      // Mute error console log - only show user alert if needed
      console.log("Could not load trending repositories");
    } finally {
      setLoading(false);
    }
  };

  // Filter repositories based on active tab and search query
  useEffect(() => {
    const currentRepos =
      activeTab === "personal" ? starredRepositories : trendingRepositories;
    const filtered = currentRepos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.owner.login.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description &&
          repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredRepositories(filtered);
  }, [activeTab, searchQuery, starredRepositories, trendingRepositories]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (activeTab === "personal") {
      loadStarredRepositories();
    } else {
      loadTrendingRepositories();
    }
    setTimeout(() => setRefreshing(false), 2000);
  }, [activeTab, loadStarredRepositories]);

  const handleRepositoryPress = (repository: StarredRepository) => {
    console.log("Repository pressed:", repository.name);
    Alert.alert("Repository Details", `Viewing: ${repository.fullName}`);
  };

  const renderRepository = ({ item }: { item: StarredRepository }) => {
    if (activeTab === "trending") {
      return (
        <TrendingRepositoryCard
          repository={item}
          onPress={() => handleRepositoryPress(item)}
        />
      );
    }

    return (
      <StarredRepositoryCard
        repository={item}
        onPress={() => handleRepositoryPress(item)}
      />
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyState}>
        <Ionicons name="star-outline" size={64} color={colors.text.tertiary} />
        <Text style={styles.emptyTitle}>
          {activeTab === "personal"
            ? "No starred repositories yet"
            : "No trending repositories found"}
        </Text>
        <Text style={styles.emptySubtitle}>
          {activeTab === "personal"
            ? "Star repositories from the trending tab to see them here"
            : "Popular repositories will appear here"}
        </Text>
      </View>
    </View>
  );

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.surface.primary,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primary,
    },
    screenTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text.primary,
    },
    tabContainer: {
      flexDirection: "row",
      backgroundColor: colors.surface.primary,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primary,
    },
    tab: {
      flex: 1,
      paddingVertical: 16,
      alignItems: "center",
      borderBottomWidth: 2,
      borderBottomColor: "transparent",
    },
    activeTab: {
      borderBottomColor: colors.interactive.primary,
    },
    tabText: {
      fontSize: 16,
      color: colors.text.tertiary,
      fontWeight: "500",
    },
    activeTabText: {
      color: colors.interactive.primary,
      fontWeight: "600",
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface.primary,
      marginHorizontal: 20,
      marginVertical: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border.primary,
      ...shadows.sm,
    },
    searchInput: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: colors.text.primary,
    },
    list: {
      flex: 1,
      paddingHorizontal: 20,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
    },
    emptyState: {
      alignItems: "center",
      paddingVertical: 40,
      paddingHorizontal: 20,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text.primary,
      marginTop: 16,
      textAlign: "center",
    },
    emptySubtitle: {
      fontSize: 16,
      color: colors.text.secondary,
      textAlign: "center",
      marginTop: 8,
      marginHorizontal: 20,
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
      <LinearGradient
        colors={gradients.background as [any, any, ...any[]]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <BlurView
          intensity={80}
          tint={isDarkTheme ? "dark" : "light"}
          style={dynamicStyles.header}
        >
          <Text style={dynamicStyles.screenTitle}>Starred Repositories</Text>
        </BlurView>

        <View style={dynamicStyles.tabContainer}>
          <TouchableOpacity
            style={[
              dynamicStyles.tab,
              activeTab === "personal" && dynamicStyles.activeTab,
            ]}
            onPress={() => setActiveTab("personal")}
          >
            <Text
              style={[
                dynamicStyles.tabText,
                activeTab === "personal" && dynamicStyles.activeTabText,
              ]}
            >
              Personal Stars
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              dynamicStyles.tab,
              activeTab === "trending" && dynamicStyles.activeTab,
            ]}
            onPress={() => setActiveTab("trending")}
          >
            <Text
              style={[
                dynamicStyles.tabText,
                activeTab === "trending" && dynamicStyles.activeTabText,
              ]}
            >
              Most Starred
            </Text>
          </TouchableOpacity>
        </View>

        <View style={dynamicStyles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.text.tertiary} />
          <TextInput
            style={dynamicStyles.searchInput}
            placeholder="Search repositories..."
            placeholderTextColor={colors.text.quaternary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={filteredRepositories}
          renderItem={renderRepository}
          keyExtractor={(item) => item.id.toString()}
          style={dynamicStyles.list}
          contentContainerStyle={
            filteredRepositories.length === 0
              ? dynamicStyles.emptyContainer
              : { paddingVertical: 16 }
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.interactive.primary}
              colors={[colors.interactive.primary]}
            />
          }
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
    marginHorizontal: 20,
  },
});

export default StarsScreen;
