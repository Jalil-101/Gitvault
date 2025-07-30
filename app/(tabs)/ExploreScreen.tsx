// app/(tabs)/explore.tsx - Enhanced version with better spacing
import { RepositoryCard } from "@/components/RepositoryCard";
import { useModernTheme } from "@/context/ThemeContext";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";

import { ExploreTab, useExplore } from "@/hooks/useExplore";
import { PushNotificationService } from "@/services/PushNotificationService";
import { vaultApiService } from "@/services/VaultApiService";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  authorUsername: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  commentsCount: number;
  likedByCurrentUser: boolean;
  comments: Comment[];
}

interface Comment {
  id: number;
  content: string;
  authorId: number;
  authorUsername: string;
  createdAt: string;
}

export default function ExploreScreen() {
  const { colors, isDarkTheme, shadows, getGlassStyle } = useModernTheme();
  const router = useRouter();
  const { addCommentNotification } = useNotificationStore();
  const { user } = useAuthStore();

  const {
    activeTab,
    posts,
    repositories,
    githubRepositories,
    loading,
    refreshing,
    hasMorePosts,
    hasMoreRepos,
    searchQuery,
    isSearching,
    useGitHubFallback,
    setActiveTab,
    setSearchQuery,
    loadPosts,
    loadRepositories,
    loadGitHubRepositories,
    handleLikePost,
    handleStarRepository,
    updatePost,
    updateRepository,
    searchContent,
    clearSearch,
  } = useExplore();

  const [createPostModalVisible, setCreatePostModalVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newComment, setNewComment] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  // Animation for search bar
  const searchAnimation = new Animated.Value(0);

  // Initialize push notifications and get current user
  useEffect(() => {
    PushNotificationService.initializePushNotifications();
    PushNotificationService.setupNotificationHandlers();
    // getCurrentUser(); // This function is now handled by useAuthStore
  }, []);

  // const getCurrentUser = async () => {
  //   try {
  //     const user = await vaultApiService.getCurrentUser();
  //     setCurrentUser(user.username || "");
  //   } catch (error) {
  //     // Silently handle 403 errors (user not authenticated) - this is expected
  //     if (error instanceof Error && error.message.includes("403")) {
  //       // User is not authenticated, which is normal for public explore screen
  //       setCurrentUser("");
  //       return;
  //     }
  //     // Only log other errors that might be actual issues
  //     console.log("Could not get current user");
  //   }
  // };

  // Animate search bar when focused
  useEffect(() => {
    Animated.timing(searchAnimation, {
      toValue: searchFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [searchFocused]);

  const handleCreatePost = async () => {
    if (isCreatingPost) return; // Prevent multiple simultaneous requests

    if (!newPostTitle.trim() || !newPostContent.trim()) {
      Alert.alert("Error", "Please fill in both title and content");
      return;
    }

    setIsCreatingPost(true);
    try {
      const postData = {
        title: newPostTitle.trim(),
        content: newPostContent.trim(),
      };

      const newPost = await vaultApiService.createPost(postData);
      updatePost(newPost);
      setCreatePostModalVisible(false);
      setNewPostTitle("");
      setNewPostContent("");
      Alert.alert("Success", "Post created successfully!");
    } catch (error) {
      console.log("Could not create post");
      Alert.alert("Error", "Failed to create post");
    } finally {
      setIsCreatingPost(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedPost) return;

    try {
      const commentData = { content: newComment.trim() };
      const comment = await vaultApiService.addComment(
        selectedPost.id,
        commentData
      );

      const updatedPost = {
        ...selectedPost,
        comments: [...selectedPost.comments, comment],
        commentsCount: selectedPost.commentsCount + 1,
      };

      setSelectedPost(updatedPost);
      updatePost(updatedPost);
      setNewComment("");

      // Send notification to post author
      if (user && user.email !== selectedPost.authorUsername) {
        await PushNotificationService.sendCommentNotification(
          selectedPost.authorUsername,
          selectedPost.title,
          user.email,
          selectedPost.id.toString()
        );

        // Add social notification
        addCommentNotification(
          selectedPost.id.toString(),
          selectedPost.title,
          user.email,
          selectedPost.authorUsername
        );
      }
    } catch (error) {
      console.log("Could not add comment");
      Alert.alert("Error", "Failed to add comment");
    }
  };

  const openComments = async (post: Post) => {
    try {
      const comments = await vaultApiService.getComments(post.id);
      setSelectedPost({ ...post, comments });
      setCommentModalVisible(true);
    } catch (error) {
      console.log("Could not load comments");
      Alert.alert("Error", "Failed to load comments");
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchContent();
    }
  };

  const handleClearSearch = () => {
    clearSearch();
    setSearchFocused(false);
  };

  const handleTestGitHubFallback = () => {
    loadGitHubRepositories();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const renderPost = ({ item: post }: { item: Post }) => (
    <View
      style={[
        styles.postCard,
        {
          backgroundColor: colors.surface.primary,
          ...shadows.md,
          borderColor: colors.border.primary,
        },
      ]}
    >
      <View style={styles.postHeader}>
        <View style={styles.authorInfo}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: colors.interactive.primary },
            ]}
          >
            <Text style={[styles.avatarText, { color: colors.text.inverse }]}>
              {post.authorUsername.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={[styles.authorName, { color: colors.text.primary }]}>
              {post.authorUsername}
            </Text>
            <Text style={[styles.postDate, { color: colors.text.tertiary }]}>
              {formatDate(post.createdAt)}
            </Text>
          </View>
        </View>
      </View>

      <Text style={[styles.postTitle, { color: colors.text.primary }]}>
        {post.title}
      </Text>
      <Text style={[styles.postContent, { color: colors.text.secondary }]}>
        {post.content}
      </Text>

      <View
        style={[styles.postActions, { borderTopColor: colors.border.tertiary }]}
      >
        <TouchableOpacity
          style={[
            styles.actionButton,
            post.likedByCurrentUser && styles.likedButton,
          ]}
          onPress={() => handleLikePost(post.id)}
        >
          <Ionicons
            name={post.likedByCurrentUser ? "heart" : "heart-outline"}
            size={20}
            color={
              post.likedByCurrentUser
                ? colors.status.error.main
                : colors.text.tertiary
            }
          />
          <Text
            style={[
              styles.actionText,
              { color: colors.text.tertiary },
              post.likedByCurrentUser && { color: colors.status.error.main },
            ]}
          >
            {post.likesCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => openComments(post)}
        >
          <Ionicons
            name="chatbubble-outline"
            size={20}
            color={colors.text.tertiary}
          />
          <Text style={[styles.actionText, { color: colors.text.tertiary }]}>
            {post.commentsCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons
            name="share-outline"
            size={20}
            color={colors.text.tertiary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRepository = ({ item: repository }: { item: any }) => {
    // Ensure we have valid repository data
    if (!repository || !repository.id) {
      return null;
    }

    // Create a safe GitHub repository object with fallbacks
    const safeRepository = {
      ...repository,
      name: repository.name || "Unnamed Repository",
      description: repository.description || "",
      owner: repository.owner || { login: "Unknown", avatar_url: "" },
      private:
        repository.private !== undefined
          ? repository.private
          : !repository.isPublic,
      stargazers_count:
        repository.stargazers_count || repository.starCount || 0,
      forks_count: repository.forks_count || 0,
      watchers_count: repository.watchers_count || 0,
      open_issues_count: repository.open_issues_count || 0,
      language: repository.language || "Unknown",
      updated_at: repository.updated_at || repository.updatedAt || "",
      created_at: repository.created_at || repository.createdAt || "",
      pushed_at: repository.pushed_at || repository.updatedAt || "",
      html_url: repository.html_url || "",
      clone_url: repository.clone_url || "",
      ssh_url: repository.ssh_url || "",
      full_name:
        repository.full_name ||
        `${repository.owner?.login || "unknown"}/${repository.name || "repo"}`,
      topics: repository.topics || [],
      license: repository.license || null,
      size: repository.size || 0,
      default_branch: repository.default_branch || "main",
    };

    return (
      <RepositoryCard
        repository={safeRepository}
        onPress={() => {
          // Navigate to explore repository detail screen
          router.push({
            pathname: "/screens/ExploreRepositoryDetailScreen",
            params: {
              repositoryData: JSON.stringify(safeRepository),
            },
          });
        }}
        onOptionsPress={() => {
          // Handle options press (e.g., show menu)
        }}
      />
    );
  };

  const renderComment = ({ item: comment }: { item: Comment }) => (
    <View
      style={[
        styles.commentCard,
        { borderBottomColor: colors.border.tertiary },
      ]}
    >
      <View style={styles.commentHeader}>
        <View
          style={[
            styles.smallAvatar,
            { backgroundColor: colors.interactive.primary },
          ]}
        >
          <Text
            style={[styles.smallAvatarText, { color: colors.text.inverse }]}
          >
            {comment.authorUsername.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.commentInfo}>
          <Text style={[styles.commentAuthor, { color: colors.text.primary }]}>
            {comment.authorUsername}
          </Text>
          <Text style={[styles.commentDate, { color: colors.text.tertiary }]}>
            {formatDate(comment.createdAt)}
          </Text>
        </View>
      </View>
      <Text style={[styles.commentContent, { color: colors.text.secondary }]}>
        {comment.content}
      </Text>
    </View>
  );

  const renderTabButton = (tab: ExploreTab, label: string, icon: string) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        activeTab === tab && {
          borderBottomColor: colors.interactive.primary,
        },
      ]}
      onPress={() => setActiveTab(tab)}
    >
      <Ionicons
        name={icon as any}
        size={20}
        color={
          activeTab === tab ? colors.interactive.primary : colors.text.tertiary
        }
      />
      <Text
        style={[
          styles.tabButtonText,
          { color: colors.text.tertiary },
          activeTab === tab && {
            color: colors.interactive.primary,
            fontWeight: "600",
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const searchBarWidth = searchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["70%", "100%"],
  });

  const glassStyle = getGlassStyle("medium");

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.primary }]}
    >
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
      {/* Header with Search */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.surface.primary,
            borderBottomColor: colors.border.primary,
            ...shadows.sm,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.searchContainer,
            {
              width: searchBarWidth,
              backgroundColor: colors.background.secondary,
              borderColor: colors.border.secondary,
            },
          ]}
        >
          <Ionicons
            name="search"
            size={20}
            color={colors.text.tertiary}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, { color: colors.text.primary }]}
            placeholder={`Search ${activeTab}...`}
            placeholderTextColor={colors.text.quaternary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => !searchQuery && setSearchFocused(false)}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchQuery ? (
            <TouchableOpacity
              onPress={handleClearSearch}
              style={styles.clearButton}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={colors.text.tertiary}
              />
            </TouchableOpacity>
          ) : null}
        </Animated.View>

        {!searchFocused && (
          <TouchableOpacity
            style={[
              styles.createButton,
              {
                backgroundColor: isCreatingPost
                  ? colors.text.quaternary
                  : colors.interactive.primary,
                ...shadows.md,
              },
            ]}
            onPress={() => {
              if (!isCreatingPost) {
                setCreatePostModalVisible(true);
              }
            }}
            disabled={isCreatingPost}
          >
            {isCreatingPost ? (
              <ActivityIndicator size="small" color={colors.text.inverse} />
            ) : (
              <Ionicons name="add" size={24} color={colors.text.inverse} />
            )}
          </TouchableOpacity>
        )}

        {/* Test GitHub Fallback Button for Repositories Tab */}
        {!searchFocused && activeTab === "repositories" && (
          <TouchableOpacity
            style={[
              styles.createButton,
              {
                backgroundColor: colors.status.warning.main,
                marginLeft: 8,
                ...shadows.md,
              },
            ]}
            onPress={handleTestGitHubFallback}
          >
            <Ionicons
              name="logo-github"
              size={20}
              color={colors.text.inverse}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Tabs */}
      <View
        style={[
          styles.tabsContainer,
          {
            backgroundColor: colors.surface.primary,
            borderBottomColor: colors.border.primary,
          },
        ]}
      >
        {renderTabButton("posts", "Posts", "document-text-outline")}
        {renderTabButton("repositories", "Repositories", "folder-outline")}
      </View>

      {/* Content */}
      {activeTab === "posts" ? (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item, index) =>
            `post-${item.id}-${item.authorId}-${item.createdAt}-${index}`
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadPosts(true)}
              tintColor={colors.interactive.primary}
              colors={[colors.interactive.primary]}
            />
          }
          onEndReached={() => {
            if (searchQuery) return; // Don't paginate search results

            if (hasMorePosts && !loading) {
              loadPosts();
            }
          }}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="document-text-outline"
                size={64}
                color={colors.text.quaternary}
              />
              <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>
                {searchQuery ? "No results found" : `No posts yet`}
              </Text>
              <Text
                style={[
                  styles.emptyDescription,
                  { color: colors.text.tertiary },
                ]}
              >
                {searchQuery
                  ? `Try adjusting your search terms`
                  : "Be the first to create a post!"}
              </Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={useGitHubFallback ? githubRepositories : repositories}
          renderItem={renderRepository}
          keyExtractor={(item) => `repo-${item.id}-${item.updatedAt}`}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadRepositories(true)}
              tintColor={colors.interactive.primary}
              colors={[colors.interactive.primary]}
            />
          }
          onEndReached={() => {
            if (searchQuery) return; // Don't paginate search results

            if (hasMoreRepos && !loading && !useGitHubFallback) {
              loadRepositories();
            }
          }}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={null}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="folder-outline"
                size={64}
                color={colors.text.quaternary}
              />
              <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>
                {searchQuery ? "No results found" : `No repositories yet`}
              </Text>
              <Text
                style={[
                  styles.emptyDescription,
                  { color: colors.text.tertiary },
                ]}
              >
                {searchQuery
                  ? `Try adjusting your search terms`
                  : "Check back later for public repositories"}
              </Text>
            </View>
          }
        />
      )}

      {/* Create Post Modal */}
      <Modal
        visible={createPostModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView
          style={[
            styles.modalContainer,
            { backgroundColor: colors.surface.primary },
          ]}
        >
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={[
                styles.modalHeader,
                {
                  borderBottomColor: colors.border.primary,
                  ...shadows.sm,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.modalHeaderButton}
                onPress={() => setCreatePostModalVisible(false)}
              >
                <Text
                  style={[styles.cancelButton, { color: colors.text.tertiary }]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: colors.text.primary }]}>
                Create Post
              </Text>
              <TouchableOpacity
                style={styles.modalHeaderButton}
                onPress={handleCreatePost}
                disabled={isCreatingPost}
              >
                <Text
                  style={[
                    styles.postButton,
                    { color: colors.interactive.primary },
                  ]}
                >
                  {isCreatingPost ? "Creating..." : "Post"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalContent}>
              <TextInput
                style={[
                  styles.titleInput,
                  {
                    color: colors.text.primary,
                    borderBottomColor: colors.border.primary,
                    backgroundColor: colors.background.secondary,
                  },
                ]}
                placeholder="Post title..."
                placeholderTextColor={colors.text.quaternary}
                value={newPostTitle}
                onChangeText={setNewPostTitle}
                maxLength={100}
              />
              <TextInput
                style={[
                  styles.contentInput,
                  {
                    color: colors.text.primary,
                    backgroundColor: colors.background.secondary,
                  },
                ]}
                placeholder="What's on your mind?"
                placeholderTextColor={colors.text.quaternary}
                value={newPostContent}
                onChangeText={setNewPostContent}
                multiline
                maxLength={500}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>

      {/* Comments Modal */}
      <Modal
        visible={commentModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView
          style={[
            styles.modalContainer,
            { backgroundColor: colors.surface.primary },
          ]}
        >
          <View
            style={[
              styles.modalHeader,
              {
                borderBottomColor: colors.border.primary,
                ...shadows.sm,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.modalHeaderButton}
              onPress={() => setCommentModalVisible(false)}
            >
              <Text
                style={[styles.cancelButton, { color: colors.text.tertiary }]}
              >
                Close
              </Text>
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: colors.text.primary }]}>
              Comments
            </Text>
            <View style={styles.modalHeaderButton} />
          </View>

          {selectedPost && (
            <>
              <FlatList
                data={selectedPost.comments}
                renderItem={renderComment}
                keyExtractor={(item) => item.id.toString()}
                style={styles.commentsList}
              />

              <View
                style={[
                  styles.commentInput,
                  {
                    borderTopColor: colors.border.primary,
                    backgroundColor: colors.surface.primary,
                    ...shadows.sm,
                  },
                ]}
              >
                <TextInput
                  style={[
                    styles.commentTextInput,
                    {
                      backgroundColor: colors.background.secondary,
                      color: colors.text.primary,
                      borderColor: colors.border.secondary,
                    },
                  ]}
                  placeholder="Add a comment..."
                  placeholderTextColor={colors.text.quaternary}
                  value={newComment}
                  onChangeText={setNewComment}
                  multiline
                />
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  <Ionicons
                    name="send"
                    size={20}
                    color={
                      newComment.trim()
                        ? colors.interactive.primary
                        : colors.text.quaternary
                    }
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 36,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 8,
  },
  createButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabButtonText: {
    fontSize: 16,
    marginLeft: 6,
    fontWeight: "500",
  },
  listContainer: {
    paddingBottom: 20,
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
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  // Post styles
  postCard: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
  },
  postHeader: {
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "600",
  },
  postDate: {
    fontSize: 12,
    marginTop: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  postContent: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  likedButton: {
    opacity: 1,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
  },
  // Modal styles
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalHeaderButton: {
    minWidth: 60,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cancelButton: {
    fontSize: 17,
    fontWeight: "500",
  },
  postButton: {
    fontSize: 17,
    fontWeight: "600",
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "600",
    borderBottomWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: "top",
    padding: 12,
    borderRadius: 8,
  },
  commentsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  commentCard: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  smallAvatarText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  commentInfo: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: "600",
  },
  commentDate: {
    fontSize: 12,
  },
  commentContent: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 42,
  },
  commentInput: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  commentTextInput: {
    flex: 1,
    maxHeight: 100,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 16,
    borderWidth: 1,
  },
  sendButton: {
    marginLeft: 12,
    padding: 8,
  },
  fallbackHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
  },
  fallbackText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
});
