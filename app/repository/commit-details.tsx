// app/repository/commit-details.tsx
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
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CommitDetail {
  hash: string;
  message: string;
  author: string;
  date: string;
  files: CommitFile[];
}

interface CommitFile {
  name: string;
  path: string;
  status: "added" | "modified" | "deleted";
  additions?: number;
  deletions?: number;
}

export default function CommitDetailsScreen() {
  const router = useRouter();
  const { hash, repoId } = useLocalSearchParams();
  const { colors, shadows, glass, isDarkTheme } = useModernTheme();

  const [commit, setCommit] = useState<CommitDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const styles = createThemedStyles(colors, shadows, glass, isDarkTheme);

  const fetchCommitDetails = useCallback(async () => {
    if (!hash || !repoId) return;

    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        Alert.alert(
          "Authentication Required",
          "Please log in to view commit details",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Login", onPress: () => router.push("/auth/signin") },
          ]
        );
        return;
      }

      // Fetch commit details
      const commitResponse = await fetch(
        `https://vault-backend-susi.onrender.com/api/git/commits/${hash}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!commitResponse.ok) {
        throw new Error(
          `Failed to fetch commit details: ${commitResponse.status}`
        );
      }

      const commitData = await commitResponse.json();

      // Fetch commit files
      const filesResponse = await fetch(
        `https://vault-backend-susi.onrender.com/api/git/commits/${hash}/files`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!filesResponse.ok) {
        throw new Error(
          `Failed to fetch commit files: ${filesResponse.status}`
        );
      }

      const filesData = await filesResponse.json();

      setCommit({
        ...commitData,
        files: filesData,
      });
    } catch (error) {
      console.error("Commit details fetch error:", error);
      Alert.alert(
        "Error",
        `Failed to fetch commit details: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  }, [hash, repoId, router]);

  useEffect(() => {
    fetchCommitDetails();
  }, [fetchCommitDetails]);

  const handleBack = () => {
    router.back();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "added":
        return { name: "add-circle", color: colors.status.success.main };
      case "modified":
        return { name: "create", color: colors.status.warning.main };
      case "deleted":
        return { name: "remove-circle", color: colors.status.error.main };
      default:
        return { name: "document", color: colors.text.secondary };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "added":
        return "Added";
      case "modified":
        return "Modified";
      case "deleted":
        return "Deleted";
      default:
        return status;
    }
  };

  const renderFile = ({ item: file }: { item: CommitFile }) => {
    const statusIcon = getStatusIcon(file.status);
    const statusText = getStatusText(file.status);

    return (
      <View style={styles.fileItem}>
        <View style={styles.fileInfo}>
          <View style={styles.fileIcon}>
            <Ionicons
              name={statusIcon.name as any}
              size={20}
              color={statusIcon.color}
            />
          </View>
          <View style={styles.fileDetails}>
            <Text style={styles.fileName}>{file.name}</Text>
            <Text style={styles.filePath}>{file.path}</Text>
          </View>
        </View>
        <View style={styles.fileStats}>
          <View style={styles.statusBadge}>
            <Text style={[styles.statusText, { color: statusIcon.color }]}>
              {statusText}
            </Text>
          </View>
          {file.additions !== undefined && file.deletions !== undefined && (
            <View style={styles.changesInfo}>
              <Text style={styles.additionsText}>+{file.additions}</Text>
              <Text style={styles.deletionsText}>-{file.deletions}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centeredContainer]}>
        <LinearGradient
          colors={GRADIENTS.light.background}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.loadingCard}>
          <ActivityIndicator size="large" color={colors.interactive.primary} />
          <Text style={styles.loadingText}>Loading commit details...</Text>
        </View>
      </View>
    );
  }

  if (!commit) {
    return (
      <View style={[styles.container, styles.centeredContainer]}>
        <LinearGradient
          colors={GRADIENTS.light.background}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.errorCard}>
          <Ionicons
            name="alert-circle-outline"
            size={48}
            color={colors.status.error.main}
          />
          <Text style={styles.errorText}>Commit not found</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleBack}>
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
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
            <Text style={styles.headerTitleText}>Commit Details</Text>
            <Text style={styles.commitHash}>{commit.hash.substring(0, 8)}</Text>
          </View>

          <View style={{ width: 40 }} />
        </BlurView>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Commit Info Card */}
          <View style={[styles.card, styles.commitInfoCard]}>
            <Text style={styles.commitMessage}>{commit.message}</Text>

            <View style={styles.commitMeta}>
              <View style={styles.metaItem}>
                <Ionicons
                  name="person"
                  size={16}
                  color={colors.text.tertiary}
                />
                <Text style={styles.metaText}>{commit.author}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="time" size={16} color={colors.text.tertiary} />
                <Text style={styles.metaText}>{formatDate(commit.date)}</Text>
              </View>
            </View>
          </View>

          {/* Files Changed */}
          <View style={[styles.card, styles.filesCard]}>
            <View style={styles.filesHeader}>
              <Text style={styles.sectionTitle}>Files Changed</Text>
              <View style={styles.fileCountBadge}>
                <Text style={styles.fileCount}>{commit.files.length}</Text>
              </View>
            </View>

            {commit.files.length > 0 ? (
              <FlatList
                data={commit.files}
                renderItem={renderFile}
                keyExtractor={(item) => `${item.path}-${item.status}`}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            ) : (
              <View style={styles.emptyFiles}>
                <Ionicons
                  name="document-outline"
                  size={48}
                  color={colors.text.quaternary}
                />
                <Text style={styles.emptyFilesText}>No files changed</Text>
              </View>
            )}
          </View>
        </ScrollView>
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
    commitHash: {
      fontSize: 12,
      color: colors.text.tertiary,
      marginTop: 2,
      fontFamily: "monospace",
    },
    content: {
      flex: 1,
    },
    card: {
      backgroundColor: colors.surface.primary,
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 16,
      padding: 20,
      ...shadows.md,
      borderWidth: 1,
      borderColor: colors.border.primary,
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
    errorCard: {
      ...glass.medium,
      padding: 32,
      borderRadius: 20,
      alignItems: "center",
      marginHorizontal: 40,
    },
    errorText: {
      fontSize: 18,
      color: colors.status.error.main,
      fontWeight: "600",
      marginTop: 16,
      textAlign: "center",
    },
    retryButton: {
      backgroundColor: colors.interactive.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
      marginTop: 16,
    },
    retryButtonText: {
      color: colors.text.inverse,
      fontSize: 14,
      fontWeight: "600",
    },
    commitInfoCard: {
      marginTop: 8,
    },
    commitMessage: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text.primary,
      lineHeight: 24,
      marginBottom: 16,
    },
    commitMeta: {
      gap: 8,
    },
    metaItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    metaText: {
      marginLeft: 8,
      fontSize: 14,
      color: colors.text.secondary,
    },
    filesCard: {
      padding: 0,
    },
    filesHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text.primary,
    },
    fileCountBadge: {
      backgroundColor: colors.accents.purple.light,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
    },
    fileCount: {
      fontSize: 12,
      fontWeight: "600",
      color: colors.accents.purple.main,
    },
    fileItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    fileInfo: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    fileIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.surface.secondary,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    fileDetails: {
      flex: 1,
    },
    fileName: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.text.primary,
    },
    filePath: {
      fontSize: 12,
      color: colors.text.tertiary,
      marginTop: 2,
    },
    fileStats: {
      alignItems: "flex-end",
    },
    statusBadge: {
      backgroundColor: colors.surface.secondary,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      marginBottom: 4,
    },
    statusText: {
      fontSize: 10,
      fontWeight: "600",
      textTransform: "uppercase",
    },
    changesInfo: {
      flexDirection: "row",
      gap: 8,
    },
    additionsText: {
      fontSize: 12,
      color: colors.status.success.main,
      fontWeight: "500",
    },
    deletionsText: {
      fontSize: 12,
      color: colors.status.error.main,
      fontWeight: "500",
    },
    separator: {
      height: 1,
      backgroundColor: colors.border.tertiary,
      marginLeft: 64,
    },
    emptyFiles: {
      alignItems: "center",
      paddingVertical: 40,
      paddingHorizontal: 20,
    },
    emptyFilesText: {
      fontSize: 16,
      color: colors.text.secondary,
      marginTop: 16,
      textAlign: "center",
    },
  });
