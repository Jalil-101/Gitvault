// components/RepositoryCard.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { Repository } from "@/types/search";

interface RepositoryCardProps {
  repository: Repository;
  onPress?: (repository: Repository) => void;
  showOwner?: boolean;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  repository,
  onPress,
  showOwner = false,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => onPress?.(repository)}
      className="bg-github-light-canvas-default dark:bg-github-dark-canvas-overlay border border-github-light-border-default dark:border-github-dark-border-default rounded-xl p-4 mb-3"
      activeOpacity={0.7}
    >
      <View className="flex-row items-start justify-between mb-2">
        <Text className="text-github-light-fg-default dark:text-github-dark-fg-default font-semibold text-base flex-1">
          {showOwner ? repository.full_name : repository.name}
        </Text>
        <View className="flex-row items-center">
          <Ionicons name="star" size={16} color={colors.attention.fg} />
          <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-sm ml-1">
            {repository.stargazers_count.toLocaleString()}
          </Text>
        </View>
      </View>

      {repository.description && (
        <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-sm mb-3">
          {repository.description}
        </Text>
      )}

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          {repository.language && (
            <View className="flex-row items-center mr-4">
              <View className="w-3 h-3 rounded-full bg-github-light-accent-fg dark:bg-github-dark-accent-fg mr-1" />
              <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-sm">
                {repository.language}
              </Text>
            </View>
          )}
          <View className="flex-row items-center">
            <Ionicons name="git-branch" size={14} color={colors.fg.muted} />
            <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-sm ml-1">
              {repository.forks_count.toLocaleString()}
            </Text>
          </View>
        </View>
        <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-xs">
          Updated {new Date(repository.updated_at).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
