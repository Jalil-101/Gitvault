// components/stars/TrendingRepositoryCard.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { StarredRepository, useStarsStore } from "@/store/starsStore";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TrendingRepositoryCardProps {
  repository: StarredRepository;
  onPress?: () => void;
}

export const TrendingRepositoryCard: React.FC<TrendingRepositoryCardProps> = ({
  repository,
  onPress,
}) => {
  const { colors, shadows, isDarkTheme } = useModernTheme();
  const { addStarredRepository, removeStarredRepository } = useStarsStore();
  const [isStarred, setIsStarred] = useState(repository.isStarred);

  const handleStarToggle = async () => {
    try {
      // Immediate visual feedback
      setIsStarred(!isStarred);

      if (!isStarred) {
        // Star the repository
        await addStarredRepository(repository);
      } else {
        // Unstar the repository
        await removeStarredRepository(repository.id);
      }
    } catch (error) {
      // Revert the visual state if there's an error
      setIsStarred(repository.isStarred);
      // Mute error console log - only show user alert
      Alert.alert("Error", "Failed to update repository star");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const getLanguageColor = (language?: string) => {
    const lightColors: { [key: string]: string } = {
      JavaScript: "#f1e05a",
      TypeScript: "#2b7489",
      Python: "#3572A5",
      Java: "#b07219",
      "C++": "#f34b7d",
      C: "#555555",
      Go: "#00ADD8",
      Rust: "#dea584",
      Swift: "#ffac45",
      Kotlin: "#F18E33",
      Dart: "#00B4AB",
      PHP: "#4F5D95",
      Ruby: "#701516",
      "C#": "#239120",
      HTML: "#e34c26",
      CSS: "#1572B6",
      React: "#61DAFB",
      "React Native": "#61DAFB",
    };

    const darkColors: { [key: string]: string } = {
      JavaScript: "#f7df1e",
      TypeScript: "#3178c6",
      Python: "#4584b6",
      Java: "#ed8b00",
      "C++": "#f34b7d",
      C: "#a8b9cc",
      Go: "#00add8",
      Rust: "#dea584",
      Swift: "#fa7343",
      Kotlin: "#7f52ff",
      Dart: "#0175c2",
      PHP: "#777bb4",
      Ruby: "#cc342d",
      "C#": "#239120",
      HTML: "#e34c26",
      CSS: "#1572b6",
      React: "#61dafb",
      "React Native": "#61dafb",
    };

    const colorMap = isDarkTheme ? darkColors : lightColors;
    return colorMap[language || ""] || colors.text.quaternary;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.surface.primary,
          borderColor: colors.border.secondary,
          ...shadows.sm,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.ownerInfo}>
          <View
            style={[
              styles.ownerAvatar,
              { backgroundColor: colors.accents.blue.light },
            ]}
          >
            <Text
              style={[
                styles.ownerAvatarText,
                { color: colors.accents.blue.main },
              ]}
            >
              {repository.owner.login.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={[styles.ownerName, { color: colors.text.secondary }]}>
            {repository.owner.login}
          </Text>
        </View>

        <View
          style={[
            styles.publicBadge,
            {
              backgroundColor: isDarkTheme
                ? "rgba(52, 199, 89, 0.2)"
                : colors.status.success.light,
              borderColor: colors.status.success.main,
            },
          ]}
        >
          <Ionicons
            name="globe-outline"
            size={12}
            color={colors.status.success.main}
          />
          <Text
            style={[styles.publicText, { color: colors.status.success.main }]}
          >
            Public
          </Text>
        </View>
      </View>

      <Text style={[styles.repositoryName, { color: colors.text.primary }]}>
        {repository.name}
      </Text>

      {repository.description && (
        <Text
          style={[styles.description, { color: colors.text.secondary }]}
          numberOfLines={2}
        >
          {repository.description}
        </Text>
      )}

      <View style={styles.metadata}>
        {repository.language && (
          <View style={styles.languageContainer}>
            <View
              style={[
                styles.languageDot,
                { backgroundColor: getLanguageColor(repository.language) },
              ]}
            />
            <Text
              style={[styles.languageText, { color: colors.text.tertiary }]}
            >
              {repository.language}
            </Text>
          </View>
        )}

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="star" size={14} color={colors.text.tertiary} />
            <Text style={[styles.statText, { color: colors.text.tertiary }]}>
              {repository.stargazersCount.toLocaleString()}
            </Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons
              name="git-branch"
              size={14}
              color={colors.text.tertiary}
            />
            <Text style={[styles.statText, { color: colors.text.tertiary }]}>
              {repository.forksCount.toLocaleString()}
            </Text>
          </View>
        </View>

        <Text style={[styles.updatedAt, { color: colors.text.tertiary }]}>
          Updated {formatDate(repository.updatedAt)}
        </Text>
      </View>

      <View
        style={[styles.actions, { borderTopColor: colors.border.tertiary }]}
      >
        <TouchableOpacity
          style={[
            styles.starButton,
            {
              backgroundColor: isStarred
                ? isDarkTheme
                  ? "rgba(255, 215, 0, 0.2)"
                  : "#FFF5E6"
                : colors.background.secondary,
              borderColor: isStarred ? "#FFD700" : colors.border.secondary,
            },
            isStarred && { borderWidth: 1 },
          ]}
          onPress={handleStarToggle}
        >
          <Ionicons
            name={isStarred ? "star" : "star-outline"}
            size={16}
            color={isStarred ? "#FFD700" : colors.text.tertiary}
          />
          <Text
            style={[
              styles.starButtonText,
              {
                color: isStarred
                  ? isDarkTheme
                    ? "#FFD700"
                    : "#B8860B"
                  : colors.text.tertiary,
              },
            ]}
          >
            {isStarred ? "Starred" : "Star"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: colors.background.secondary },
          ]}
        >
          <Ionicons
            name="open-outline"
            size={16}
            color={colors.text.tertiary}
          />
          <Text
            style={[styles.actionButtonText, { color: colors.text.tertiary }]}
          >
            View
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: colors.background.secondary },
          ]}
        >
          <Ionicons
            name="share-outline"
            size={16}
            color={colors.text.tertiary}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  ownerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  ownerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  ownerAvatarText: {
    fontWeight: "bold",
    fontSize: 12,
  },
  ownerName: {
    fontSize: 14,
    fontWeight: "500",
  },
  publicBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  publicText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  repositoryName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  metadata: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    flexWrap: "wrap",
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  languageDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  languageText: {
    fontSize: 12,
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  statText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  updatedAt: {
    fontSize: 12,
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    gap: 8,
  },
  starButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
  },
  starButtonText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
});
