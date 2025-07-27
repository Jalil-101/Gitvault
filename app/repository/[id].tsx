// app/repository/[id].tsx - Internal Repository Detail Screen with File Management
import { AddFileModal } from "@/components/repository/AddFileModal";
import { GRADIENTS } from "@/constants/Colors";
import { useModernTheme } from "@/context/ThemeContext";
import { repositoryService } from "@/services/repositoryService";
import { Repository } from "@/types/repo/repository";
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
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RepositoryDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { colors, shadows, glass, isDarkTheme, gradients } = useModernTheme();

  const [repository, setRepository] = useState<Repository | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filesLoading, setFilesLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFiles, setFilteredFiles] = useState<any[]>([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showAddFileModal, setShowAddFileModal] = useState(false);

  const fetchRepositoryDetails = useCallback(async () => {
    if (!id) return;

    try {
      // Check if user is authenticated first
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        Alert.alert(
          "Authentication Required",
          "Please log in to view repository details",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Login", onPress: () => router.push("/auth/signin") },
          ]
        );
        return;
      }

      console.log(`Fetching repository details for ID: ${id}`);
      const repoDetails = await repositoryService.getRepositoryDetails(
        Number(id)
      );
      console.log("Repository details received:", repoDetails);
      setRepository(repoDetails);
    } catch (error) {
      console.error("Repository details fetch error:", error);

      // Handle 403 specifically
      if (error instanceof Error && error.message.includes("403")) {
        Alert.alert(
          "Access Denied",
          "You don't have permission to view this repository. Please check if you're logged in with the correct account.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Login", onPress: () => router.push("/auth/signin") },
          ]
        );
      } else {
        Alert.alert(
          "Error",
          `Failed to fetch repository details: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
      router.back();
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  const fetchFiles = useCallback(async () => {
    if (!id) return;

    setFilesLoading(true);
    try {
      const repoFiles = await repositoryService.getRepositoryFiles(Number(id));
      setFiles(repoFiles);
      setFilteredFiles(repoFiles);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch repository files");
    } finally {
      setFilesLoading(false);
    }
  }, [id]);

  const styles = createThemedStyles(colors, shadows, glass, isDarkTheme);

  useEffect(() => {
    checkAuthStatus(); // Debug auth status
    fetchRepositoryDetails();
    fetchFiles();
  }, [fetchRepositoryDetails, fetchFiles]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = files.filter(
        (file) =>
          file.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          file.path?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFiles(filtered);
    } else {
      setFilteredFiles(files);
    }
  }, [searchQuery, files]);

  const handleBack = () => {
    router.back();
  };

  const handleAddFile = () => {
    setShowAddFileModal(true);
  };

  const handleFileAdded = () => {
    // Refresh files list after adding a file
    fetchFiles();
  };

  const handleViewCommits = () => {
    router.push(`/repository/commits?id=${id}`);
  };

  const handleSearchPress = () => {
    setShowSearchModal(true);
  };

  // Debug function to check authentication status
  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      console.log("=== AUTH STATUS DEBUG ===");
      console.log("Access token exists:", !!token);
      console.log("Refresh token exists:", !!refreshToken);
      if (token) {
        console.log("Token preview:", token.substring(0, 50) + "...");
      }
      console.log("=========================");
    } catch (error) {
      console.error("Error checking auth status:", error);
    }
  };

  const renderFileItem = (file: any, index: number) => (
    <TouchableOpacity key={index} style={styles.fileItem}>
      <View style={styles.fileInfo}>
        <View
          style={[
            styles.fileIconContainer,
            {
              backgroundColor:
                file.type === "folder"
                  ? colors.accents.orange.light
                  : colors.accents.blue.light,
            },
          ]}
        >
          <Ionicons
            name={file.type === "folder" ? "folder" : "document-text"}
            size={18}
            color={
              file.type === "folder"
                ? colors.accents.orange.main
                : colors.accents.blue.main
            }
          />
        </View>
        <View style={styles.fileDetails}>
          <Text style={styles.fileName}>{file.name || "Unknown file"}</Text>
          <Text style={styles.filePath}>{file.path || ""}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.fileActionButton}>
        <Ionicons
          name="chevron-forward"
          size={16}
          color={colors.text.quaternary}
        />
      </TouchableOpacity>
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
          <Text style={styles.loadingText}>Loading repository...</Text>
        </View>
      </View>
    );
  }

  if (!repository) {
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
          <Text style={styles.errorText}>Repository not found</Text>
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
            <Text style={styles.repoName} numberOfLines={1}>
              {repository.name}
            </Text>
            <View style={styles.visibilityBadge}>
              <Ionicons
                name={repository.isPrivate ? "lock-closed" : "globe-outline"}
                size={12}
                color={
                  repository.isPrivate
                    ? colors.status.error.main
                    : colors.status.success.main
                }
              />
              <Text
                style={[
                  styles.visibilityText,
                  {
                    color: repository.isPrivate
                      ? colors.status.error.main
                      : colors.status.success.main,
                  },
                ]}
              >
                {repository.isPrivate ? "Private" : "Public"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSearchPress}
            style={styles.headerButton}
          >
            <Ionicons name="search" size={22} color={colors.text.secondary} />
          </TouchableOpacity>

          <LinearGradient
            colors={GRADIENTS.light.primary}
            style={styles.addButton}
          >
            <TouchableOpacity
              onPress={handleAddFile}
              style={styles.addButtonInner}
            >
              <Ionicons name="add" size={20} color={colors.text.inverse} />
            </TouchableOpacity>
          </LinearGradient>
        </BlurView>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Repository Info Card */}
          <View style={[styles.card, styles.repoInfoCard]}>
            <Text style={styles.description}>{repository.description}</Text>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleViewCommits}
              >
                <LinearGradient
                  colors={[
                    colors.accents.green.light,
                    colors.accents.green.main,
                  ]}
                  style={styles.actionButtonGradient}
                >
                  <Ionicons
                    name="git-commit"
                    size={18}
                    color={colors.text.inverse}
                  />
                  <Text style={styles.actionButtonText}>Commits</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <LinearGradient
                  colors={[colors.accents.blue.light, colors.accents.blue.main]}
                  style={styles.actionButtonGradient}
                >
                  <Ionicons
                    name="download"
                    size={18}
                    color={colors.text.inverse}
                  />
                  <Text style={styles.actionButtonText}>Clone</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Files Section */}
          <View style={[styles.card, styles.filesCard]}>
            <View style={styles.filesSectionHeader}>
              <Text style={styles.sectionTitle}>Files & Folders</Text>
              <View style={styles.fileCountBadge}>
                <Text style={styles.fileCount}>{filteredFiles.length}</Text>
              </View>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={16}
                color={colors.text.quaternary}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Filter files..."
                placeholderTextColor={colors.text.quaternary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Ionicons
                    name="close-circle"
                    size={16}
                    color={colors.text.quaternary}
                  />
                </TouchableOpacity>
              )}
            </View>

            {filesLoading ? (
              <View style={styles.filesLoadingContainer}>
                <ActivityIndicator
                  size="small"
                  color={colors.interactive.primary}
                />
                <Text style={styles.filesLoadingText}>Loading files...</Text>
              </View>
            ) : filteredFiles.length > 0 ? (
              <View style={styles.filesList}>
                {filteredFiles.map(renderFileItem)}
              </View>
            ) : (
              <View style={styles.emptyFiles}>
                <View style={styles.emptyIconContainer}>
                  <Ionicons
                    name="folder-open-outline"
                    size={48}
                    color={colors.text.quaternary}
                  />
                </View>
                <Text style={styles.emptyFilesText}>
                  {searchQuery ? "No files match your search" : "No files yet"}
                </Text>
                {!searchQuery && (
                  <LinearGradient
                    colors={GRADIENTS.light.primary}
                    style={styles.addFirstFileButton}
                  >
                    <TouchableOpacity
                      onPress={handleAddFile}
                      style={styles.addFirstFileButtonInner}
                    >
                      <Ionicons
                        name="add-circle-outline"
                        size={20}
                        color={colors.text.inverse}
                      />
                      <Text style={styles.addFirstFileText}>
                        Add your first file
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                )}
              </View>
            )}
          </View>
        </ScrollView>

        {/* Search Modal */}
        <FileSearchModal
          visible={showSearchModal}
          repositoryId={Number(id)}
          onClose={() => setShowSearchModal(false)}
          onFileSelect={(file) => {
            console.log("Selected file:", file);
            setShowSearchModal(false);
          }}
        />

        {/* Add File Modal */}
        <AddFileModal
          visible={showAddFileModal}
          repositoryId={Number(id)}
          onClose={() => setShowAddFileModal(false)}
          onSuccess={handleFileAdded}
        />
      </SafeAreaView>
    </View>
  );
}

// File Search Modal Component
interface FileSearchModalProps {
  visible: boolean;
  repositoryId: number;
  onClose: () => void;
  onFileSelect: (file: any) => void;
}

const FileSearchModal: React.FC<FileSearchModalProps> = ({
  visible,
  repositoryId,
  onClose,
  onFileSelect,
}) => {
  const { colors, shadows, glass, isDarkTheme, gradients } = useModernTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const styles = createThemedStyles(colors, shadows, glass, isDarkTheme);

  useEffect(() => {
    if (searchQuery.trim() && visible) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, visible]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const results = await repositoryService.searchRepositoryFiles(
        repositoryId,
        searchQuery
      );
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (file: any) => {
    onFileSelect(file);
    onClose();
    setSearchQuery("");
    setSearchResults([]);
  };

  const renderSearchResult = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.searchResultItem}
      onPress={() => handleFileSelect(item)}
    >
      <View
        style={[
          styles.fileIconContainer,
          {
            backgroundColor:
              item.type === "folder"
                ? colors.accents.orange.light
                : colors.accents.blue.light,
          },
        ]}
      >
        <Ionicons
          name={item.type === "folder" ? "folder" : "document-text"}
          size={18}
          color={
            item.type === "folder"
              ? colors.accents.orange.main
              : colors.accents.blue.main
          }
        />
      </View>
      <View style={styles.resultInfo}>
        <Text style={styles.resultName}>{item.name}</Text>
        <Text style={styles.resultPath}>{item.path}</Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={16}
        color={colors.text.quaternary}
      />
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.searchModalContainer}>
        <LinearGradient
          colors={GRADIENTS.light.background}
          style={StyleSheet.absoluteFillObject}
        />

        <SafeAreaView style={styles.searchModalSafeArea}>
          <BlurView
            intensity={80}
            tint={isDarkTheme ? "dark" : "light"}
            style={styles.searchModalHeader}
          >
            <TouchableOpacity onPress={onClose} style={styles.headerButton}>
              <Ionicons name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
            <Text style={styles.searchModalTitle}>Search Files</Text>
            <View style={{ width: 40 }} />
          </BlurView>

          <View style={[styles.card, styles.searchInputCard]}>
            <View style={styles.searchInputContainer}>
              <Ionicons
                name="search"
                size={20}
                color={colors.text.quaternary}
              />
              <TextInput
                style={styles.searchModalInput}
                placeholder="Search by file name or path..."
                placeholderTextColor={colors.text.quaternary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={colors.text.quaternary}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {loading ? (
            <View style={styles.searchLoadingContainer}>
              <ActivityIndicator
                size="large"
                color={colors.interactive.primary}
              />
              <Text style={styles.searchLoadingText}>Searching...</Text>
            </View>
          ) : searchResults.length > 0 ? (
            <View style={[styles.card, styles.searchResultsCard]}>
              <FlatList
                data={searchResults}
                renderItem={renderSearchResult}
                keyExtractor={(item, index) => `${item.path}-${index}`}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          ) : searchQuery.trim() ? (
            <View style={styles.emptySearchContainer}>
              <Ionicons
                name="search"
                size={48}
                color={colors.text.quaternary}
              />
              <Text style={styles.noResultsText}>No files found</Text>
              <Text style={styles.noResultsSubtext}>
                Try a different search term
              </Text>
            </View>
          ) : (
            <View style={styles.searchHintContainer}>
              <Ionicons
                name="information-circle-outline"
                size={48}
                color={colors.text.quaternary}
              />
              <Text style={styles.searchHintText}>
                Start typing to search files
              </Text>
            </View>
          )}
        </SafeAreaView>
      </View>
    </Modal>
  );
};

// Themed Styles Factory
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

    // Cards
    card: {
      backgroundColor: colors.surface.primary,
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 16,
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

    errorCard: {
      ...glass.medium,
      padding: 32,
      borderRadius: 20,
      alignItems: "center",
      marginHorizontal: 40,
    },

    // Header
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

    repoName: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text.primary,
      marginBottom: 4,
    },

    visibilityBadge: {
      flexDirection: "row",
      alignItems: "center",
    },

    visibilityText: {
      fontSize: 12,
      fontWeight: "600",
      marginLeft: 4,
    },

    addButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginLeft: 8,
    },

    addButtonInner: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    // Content
    content: {
      flex: 1,
    },

    repoInfoCard: {
      padding: 20,
      marginTop: 8,
    },

    description: {
      fontSize: 16,
      color: colors.text.secondary,
      lineHeight: 24,
      marginBottom: 20,
    },

    actionButtons: {
      flexDirection: "row",
      gap: 12,
    },

    actionButton: {
      flex: 1,
      borderRadius: 12,
      overflow: "hidden",
    },

    actionButtonGradient: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
    },

    actionButtonText: {
      marginLeft: 8,
      fontSize: 14,
      color: colors.text.inverse,
      fontWeight: "600",
    },

    // Files Section
    filesCard: {
      padding: 0,
      overflow: "hidden",
    },

    filesSectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
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

    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 20,
      marginBottom: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.surface.secondary,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border.secondary,
    },

    searchInput: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: colors.text.primary,
    },

    // Loading States
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: colors.text.secondary,
      fontWeight: "500",
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

    filesLoadingContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 40,
    },

    filesLoadingText: {
      marginLeft: 12,
      fontSize: 14,
      color: colors.text.secondary,
    },

    // Files List
    filesList: {
      paddingBottom: 20,
    },

    fileItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.tertiary,
    },

    fileInfo: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },

    fileIconContainer: {
      width: 36,
      height: 36,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },

    fileDetails: {
      marginLeft: 12,
      flex: 1,
    },

    fileName: {
      fontSize: 16,
      color: colors.text.primary,
      fontWeight: "500",
    },

    filePath: {
      fontSize: 12,
      color: colors.text.tertiary,
      marginTop: 2,
    },

    fileActionButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.surface.secondary,
      justifyContent: "center",
      alignItems: "center",
    },

    // Empty States
    emptyFiles: {
      alignItems: "center",
      paddingVertical: 40,
      paddingHorizontal: 20,
    },

    emptyIconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.surface.secondary,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
    },

    emptyFilesText: {
      fontSize: 16,
      color: colors.text.secondary,
      marginBottom: 20,
      textAlign: "center",
    },

    addFirstFileButton: {
      borderRadius: 12,
      overflow: "hidden",
    },

    addFirstFileButtonInner: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingVertical: 12,
    },

    addFirstFileText: {
      color: colors.text.inverse,
      fontSize: 14,
      fontWeight: "600",
      marginLeft: 8,
    },

    // Search Modal
    searchModalContainer: {
      flex: 1,
    },

    searchModalSafeArea: {
      flex: 1,
    },

    searchModalHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.glass,
    },

    searchModalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text.primary,
    },

    searchInputCard: {
      marginTop: 8,
      padding: 0,
    },

    searchInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
    },

    searchModalInput: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: colors.text.primary,
    },

    searchLoadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    searchLoadingText: {
      marginTop: 16,
      fontSize: 16,
      color: colors.text.secondary,
    },

    searchResultsCard: {
      flex: 1,
      margin: 16,
      padding: 0,
    },

    searchResultItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
    },

    resultInfo: {
      marginLeft: 12,
      flex: 1,
    },

    resultName: {
      fontSize: 16,
      color: colors.text.primary,
      fontWeight: "500",
    },

    resultPath: {
      fontSize: 12,
      color: colors.text.tertiary,
      marginTop: 2,
    },

    separator: {
      height: 1,
      backgroundColor: colors.border.tertiary,
      marginLeft: 68,
    },

    emptySearchContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 40,
    },

    noResultsText: {
      fontSize: 18,
      color: colors.text.secondary,
      fontWeight: "600",
      marginTop: 16,
    },

    noResultsSubtext: {
      fontSize: 14,
      color: colors.text.tertiary,
      marginTop: 8,
      textAlign: "center",
    },

    searchHintContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 40,
    },

    searchHintText: {
      fontSize: 16,
      color: colors.text.secondary,
      marginTop: 16,
      textAlign: "center",
    },
  });
