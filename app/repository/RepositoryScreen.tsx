// screens/RepositoriesScreen.tsx
import { CreateRepositoryModal } from "@/components/CreateRepositoryModal";
import { EditRepositoryModal } from "@/components/EditRepositoryModal";
import { InternalRepositoryCard } from "@/components/repository/InternalRepositoryCard";
import { RepositoryOptionsModal } from "@/components/RepositoryOptionsModal";
import { useModernTheme } from "@/context/ThemeContext";
import { repositoryService } from "@/services/repositoryService";
import { Repository } from "@/types/repo/repository";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RepositoriesScreen() {
  const router = useRouter();
  const { colors, shadows, gradients, isDarkTheme } = useModernTheme();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filteredRepositories, setFilteredRepositories] = useState<
    Repository[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRepository, setSelectedRepository] =
    useState<Repository | null>(null);
  const [activeTab, setActiveTab] = useState<"my" | "public">("my");

  const fetchRepositories = useCallback(async () => {
    try {
      let repos: Repository[];
      if (activeTab === "my") {
        repos = await repositoryService.getUserRepositories();
      } else {
        repos = await repositoryService.getPublicRepositories();
      }
      setRepositories(repos);
      setFilteredRepositories(repos);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch repositories");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  useEffect(() => {
    const filtered = repositories.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRepositories(filtered);
  }, [searchQuery, repositories]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchRepositories();
  };

  const handleRepositoryPress = (repository: Repository) => {
    router.push(`/repository/${repository.id}`);
  };

  const handleOptionsPress = (repository: Repository) => {
    setSelectedRepository(repository);
    setShowOptionsModal(true);
  };

  const handleEdit = () => {
    setShowOptionsModal(false);
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    if (!selectedRepository) return;

    try {
      await repositoryService.deleteRepository(selectedRepository.id);
      setShowOptionsModal(false);
      setSelectedRepository(null);
      fetchRepositories();
      Alert.alert("Success", "Repository deleted successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to delete repository");
    }
  };

  const handleViewFiles = () => {
    setShowOptionsModal(false);
    if (selectedRepository) {
      router.push(`/repository/${selectedRepository.id}/files`);
    }
  };

  const renderRepository = ({ item }: { item: Repository }) => (
    <InternalRepositoryCard
      repository={item}
      onPress={() => handleRepositoryPress(item)}
      onOptionsPress={() => handleOptionsPress(item)}
    />
  );

  const renderEmptyState = () => (
    <View style={dynamicStyles.emptyState}>
      <Ionicons
        name="folder-outline"
        size={64}
        color={colors.text.quaternary}
      />
      <Text style={dynamicStyles.emptyTitle}>
        {activeTab === "my" ? "No repositories yet" : "No public repositories"}
      </Text>
      <Text style={dynamicStyles.emptySubtitle}>
        {activeTab === "my"
          ? "Create your first repository to get started"
          : "Check back later for public repositories"}
      </Text>
      {activeTab === "my" && (
        <TouchableOpacity
          style={dynamicStyles.createFirstButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Text style={dynamicStyles.createFirstButtonText}>
            Create Repository
          </Text>
        </TouchableOpacity>
      )}
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
    createButton: {
      backgroundColor: colors.interactive.primary,
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: "center",
      alignItems: "center",
      ...shadows.md,
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
    createFirstButton: {
      backgroundColor: colors.interactive.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 12,
      marginTop: 24,
      ...shadows.md,
    },
    createFirstButtonText: {
      color: colors.text.inverse,
      fontSize: 16,
      fontWeight: "600",
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
          <Text style={dynamicStyles.screenTitle}>Repositories</Text>
          {activeTab === "my" && (
            <TouchableOpacity
              style={dynamicStyles.createButton}
              onPress={() => setShowCreateModal(true)}
            >
              <Ionicons name="add" size={24} color={colors.text.inverse} />
            </TouchableOpacity>
          )}
        </BlurView>

        <View style={dynamicStyles.tabContainer}>
          <TouchableOpacity
            style={[
              dynamicStyles.tab,
              activeTab === "my" && dynamicStyles.activeTab,
            ]}
            onPress={() => setActiveTab("my")}
          >
            <Text
              style={[
                dynamicStyles.tabText,
                activeTab === "my" && dynamicStyles.activeTabText,
              ]}
            >
              My Repositories
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
              Public
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
              : undefined
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.interactive.primary}
              colors={[colors.interactive.primary]}
            />
          }
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />

        <CreateRepositoryModal
          visible={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={fetchRepositories}
        />

        <RepositoryOptionsModal
          visible={showOptionsModal}
          repository={selectedRepository}
          onClose={() => setShowOptionsModal(false)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewFiles={handleViewFiles}
        />

        <EditRepositoryModal
          visible={showEditModal}
          repository={selectedRepository}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false);
            fetchRepositories();
          }}
        />
      </SafeAreaView>
    </View>
  );
}
