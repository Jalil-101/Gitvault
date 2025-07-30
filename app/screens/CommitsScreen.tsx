// screens/CommitsScreen.tsx
import { CommitItem } from "@/components/commits/CommitItem";
import { useModernTheme } from "@/context/ThemeContext";
import { useCommitsStore } from "@/store/commitsStore";
import { Commit } from "@/types/commits";
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

const CommitsScreen = () => {
  const { colors, shadows, gradients, isDarkTheme } = useModernTheme();
  const { privateCommits, loadCommits } = useCommitsStore();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<"private" | "public">("private");
  const [searchQuery, setSearchQuery] = useState("");
  const [publicCommits, setPublicCommits] = useState<Commit[]>([]);
  const [filteredCommits, setFilteredCommits] = useState<Commit[]>([]);

  // Load private commits from store
  useEffect(() => {
    loadCommits();
  }, [loadCommits]);

  // Simulate public commits data
  useEffect(() => {
    // Public commits (from popular GitHub repositories)
    setPublicCommits([
      {
        id: "1",
        message: "feat: add dark mode support to settings page",
        author: "alice-dev",
        avatar: "👩‍💻",
        date: "2 hours ago",
        sha: "a1b2c3d4e5f6",
        additions: 45,
        deletions: 12,
      },
      {
        id: "2",
        message: "fix: resolve authentication bug in login flow",
        author: "bob-coder",
        avatar: "👨‍💻",
        date: "4 hours ago",
        sha: "b2c3d4e5f6a7",
        additions: 23,
        deletions: 8,
      },
      {
        id: "3",
        message: "docs: update API documentation for v2.1.0",
        author: "tech-writer",
        avatar: "📝",
        date: "6 hours ago",
        sha: "c3d4e5f6a7b8",
        additions: 67,
        deletions: 15,
      },
      {
        id: "4",
        message: "test: add unit tests for user service",
        author: "test-engineer",
        avatar: "🧪",
        date: "1 day ago",
        sha: "d4e5f6a7b8c9",
        additions: 89,
        deletions: 23,
      },
      {
        id: "5",
        message: "perf: optimize database queries for better performance",
        author: "db-admin",
        avatar: "🗄️",
        date: "1 day ago",
        sha: "e5f6a7b8c9d0",
        additions: 34,
        deletions: 18,
      },
      {
        id: "6",
        message: "style: improve responsive design for mobile devices",
        author: "frontend-dev",
        avatar: "🎨",
        date: "2 days ago",
        sha: "f6a7b8c9d0e1",
        additions: 56,
        deletions: 29,
      },
      {
        id: "7",
        message: "refactor: clean up legacy code and improve maintainability",
        author: "senior-dev",
        avatar: "👨‍🔬",
        date: "2 days ago",
        sha: "a7b8c9d0e1f2",
        additions: 78,
        deletions: 45,
      },
      {
        id: "8",
        message: "ci: update GitHub Actions workflow for automated testing",
        author: "devops-engineer",
        avatar: "⚙️",
        date: "3 days ago",
        sha: "b8c9d0e1f2a3",
        additions: 42,
        deletions: 12,
      },
      {
        id: "9",
        message: "feat: implement real-time notifications system",
        author: "fullstack-dev",
        avatar: "🚀",
        date: "3 days ago",
        sha: "c9d0e1f2a3b4",
        additions: 123,
        deletions: 67,
      },
      {
        id: "10",
        message: "fix: handle edge cases in data validation",
        author: "bug-fixer",
        avatar: "🐛",
        date: "4 days ago",
        sha: "d0e1f2a3b4c5",
        additions: 28,
        deletions: 14,
      },
    ]);
  }, []);

  // Filter commits based on active tab and search query
  useEffect(() => {
    const currentCommits =
      activeTab === "private" ? privateCommits : publicCommits;
    const filtered = currentCommits.filter(
      (commit) =>
        commit.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        commit.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCommits(filtered);
  }, [activeTab, searchQuery, privateCommits, publicCommits]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleCommitPress = (commit: Commit) => {
    console.log("Commit pressed:", commit.id);
    // You can navigate to commit details screen here
    Alert.alert("Commit Details", `Viewing commit: ${commit.sha}`);
  };

  const renderCommit = ({ item }: { item: Commit }) => (
    <CommitItem commit={item} onPress={() => handleCommitPress(item)} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyState}>
        <Ionicons
          name="git-commit-outline"
          size={64}
          color={colors.text.tertiary}
        />
        <Text style={styles.emptyTitle}>
          {activeTab === "private"
            ? "No private commits yet"
            : "No public commits found"}
        </Text>
        <Text style={styles.emptySubtitle}>
          {activeTab === "private"
            ? "Your private repository commits will appear here once you create and commit to private repositories"
            : "Public repository commits will appear here"}
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
          <Text style={dynamicStyles.screenTitle}>Commits</Text>
        </BlurView>

        <View style={dynamicStyles.tabContainer}>
          <TouchableOpacity
            style={[
              dynamicStyles.tab,
              activeTab === "private" && dynamicStyles.activeTab,
            ]}
            onPress={() => setActiveTab("private")}
          >
            <Text
              style={[
                dynamicStyles.tabText,
                activeTab === "private" && dynamicStyles.activeTabText,
              ]}
            >
              Private Commits
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              dynamicStyles.tab,
              activeTab === "public" && dynamicStyles.activeTab,
            ]}
            onPress={() => setActiveTab("public")}
          >
            <Text
              style={[
                dynamicStyles.tabText,
                activeTab === "public" && dynamicStyles.activeTabText,
              ]}
            >
              Public Commits
            </Text>
          </TouchableOpacity>
        </View>

        <View style={dynamicStyles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.text.tertiary} />
          <TextInput
            style={dynamicStyles.searchInput}
            placeholder="Search commits..."
            placeholderTextColor={colors.text.quaternary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={filteredCommits}
          renderItem={renderCommit}
          keyExtractor={(item) => item.id}
          style={dynamicStyles.list}
          contentContainerStyle={
            filteredCommits.length === 0
              ? { flex: 1, justifyContent: "center" }
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

export default CommitsScreen;
