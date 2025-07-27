// app/repository/commits.tsx
import { GRADIENTS } from "@/constants/Colors";
import { useModernTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Commit {
  hash: string;
  message: string;
  author: string;
  date: string;
  filesChanged: number;
}

export default function CommitsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { colors, shadows, glass, isDarkTheme } = useModernTheme();

  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const styles = createThemedStyles(colors, shadows, glass, isDarkTheme);

  const fetchCommits = useCallback(async () => {
    if (!id) return;

    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        Alert.alert(
          "Authentication Required",
          "Please log in to view commit history",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Login", onPress: () => router.push("/auth/signin") },
          ]
        );
        return;
      }

      const response = await fetch(
        `https://vault-backend-susi.onrender.com/api/git/repositories/${id}/commits`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch commits: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      setCommits(data);
    } catch (error) {
      console.error("Commits fetch error:", error);
      Alert.alert(
        "Error",
        `Failed to fetch commits: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id, router]);

  useEffect(() => {
    fetchCommits();
  }, [fetchCommits]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCommits();
  };

  const handleBack = () => {
    router.back();
  };

  const handleCommitPress = (commit: Commit) => {
    // Navigate to commit details
    router.push({
      pathname: "/repository/commit-details",
      params: { hash: commit.hash, repoId: id },
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderCommit = ({ item: commit }: { item: Commit }) => (
    <TouchableOpacity
      style={styles.commitItem}
      onPress={() => handleCommitPress(commit)}
    >
      <View style={styles.commitHeader}>
        <View style={styles.commitHash}>
          <Text style={styles.hashText}>{commit.hash.substring(0, 8)}</Text>
        </View>
        <View style={styles.commitInfo}>
          <Text style={styles.commitMessage} numberOfLines={2}>
            {commit.message}
          </Text>
          <Text style={styles.commitAuthor}>{commit.author}</Text>
          <Text style={styles.commitDate}>{formatDate(commit.date)}</Text>
        </View>
        <View style={styles.commitStats}>
          <View style={styles.filesChanged}>
            <Ionicons name="document" size={16} color={colors.text.tertiary} />
            <Text style={styles.filesChangedText}>{commit.filesChanged}</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={16}
            color={colors.text.quaternary}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centeredContainer]}>
        <LinearGradient
          colors={GRADIENTS.light.background}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.loadingCard}>
          <ActivityIndicator size="large" color={colors.interactive.primary} />
          <Text style={styles.loadingText}>Loading commits...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={GRADIENTS.light.background}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <BlurView
          intensity={80}
          tint={isDarkTheme ? "dark" : "light"}
          style={styles.header}
        >
          <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>

          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleText}>Commit History</Text>
            <Text style={styles.headerSubtitle}>{commits.length} commits</Text>
          </View>

          <TouchableOpacity
            onPress={handleRefresh}
            style={styles.headerButton}
            disabled={refreshing}
          >
            {refreshing ? (
              <ActivityIndicator
                size="small"
                color={colors.interactive.primary}
              />
            ) : (
              <Ionicons
                name="refresh"
                size={22}
                color={colors.text.secondary}
              />
            )}
          </TouchableOpacity>
        </BlurView>

        {/* Commits List */}
        <FlatList
          data={commits}
          renderItem={renderCommit}
          keyExtractor={(item) => item.hash}
          style={styles.commitsList}
          contentContainerStyle={styles.commitsContent}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="git-commit"
                size={64}
                color={colors.text.quaternary}
              />
              <Text style={styles.emptyTitle}>No commits yet</Text>
              <Text style={styles.emptySubtitle}>
                Make your first commit to see the history here
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
}

const createThemedStyles = (
  colors: any,
  shadows: any,
  glass: any,
  isDarkTheme: boolean
) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    centeredContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.glass,
    },
    headerButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.interactive.ghost,
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      flex: 1,
      marginHorizontal: 16,
    },
    headerTitleText: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text.primary,
    },
    headerSubtitle: {
      fontSize: 12,
      color: colors.text.tertiary,
      marginTop: 2,
    },
    loadingCard: {
      ...glass.medium,
      padding: 32,
      borderRadius: 20,
      alignItems: "center",
      marginHorizontal: 40,
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: colors.text.secondary,
      fontWeight: "500",
    },
    commitsList: {
      flex: 1,
    },
    commitsContent: {
      paddingBottom: 20,
    },
    commitItem: {
      backgroundColor: colors.surface.primary,
      marginHorizontal: 16,
      marginVertical: 4,
      borderRadius: 12,
      padding: 16,
      ...shadows.sm,
      borderWidth: 1,
      borderColor: colors.border.primary,
    },
    commitHeader: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    commitHash: {
      backgroundColor: colors.accents.purple.light,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      marginRight: 12,
    },
    hashText: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.accents.purple.main,
      fontFamily: "monospace",
    },
    commitInfo: {
      flex: 1,
    },
    commitMessage: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text.primary,
      marginBottom: 4,
      lineHeight: 20,
    },
    commitAuthor: {
      fontSize: 14,
      color: colors.text.secondary,
      marginBottom: 2,
    },
    commitDate: {
      fontSize: 12,
      color: colors.text.tertiary,
    },
    commitStats: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 8,
    },
    filesChanged: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 8,
    },
    filesChangedText: {
      fontSize: 12,
      color: colors.text.tertiary,
      marginLeft: 4,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 80,
      paddingHorizontal: 32,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text.primary,
      marginTop: 16,
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 16,
      color: colors.text.secondary,
      textAlign: "center",
      lineHeight: 22,
    },
  });
