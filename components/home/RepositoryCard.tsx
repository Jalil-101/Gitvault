// components/home/RepositoryCard.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { Repository } from "@/types";
import { formatTimeAgo, getLanguageColor } from "@/utils/helpers";

interface RepositoryCardProps {
  repository: Repository;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  repository,
}) => {
  const { colors } = useTheme();
  const languageColor = getLanguageColor(repository.language || "");

  return (
    <TouchableOpacity
      className="mx-4 mb-4 p-4 rounded-lg border"
      style={{
        backgroundColor: colors.canvas.default,
        borderColor: colors.border.default,
      }}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <Ionicons
            name={repository.private ? "lock-closed" : "folder-outline"}
            size={16}
            color={colors.fg.muted}
          />
          <Text
            className="text-base font-semibold ml-2 flex-1"
            style={{ color: colors.accent.fg }}
            numberOfLines={1}
          >
            {repository.name}
          </Text>
        </View>
        <Text className="text-xs" style={{ color: colors.fg.muted }}>
          {formatTimeAgo(repository.updated_at)}
        </Text>
      </View>

      {repository.description && (
        <Text
          className="text-sm mb-3 leading-5"
          style={{ color: colors.fg.muted }}
          numberOfLines={2}
        >
          {repository.description}
        </Text>
      )}

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-4">
          {repository.language && (
            <View className="flex-row items-center">
              <View
                className="w-3 h-3 rounded-full mr-1"
                style={{ backgroundColor: languageColor }}
              />
              <Text
                className="text-xs font-medium"
                style={{ color: colors.fg.default }}
              >
                {repository.language}
              </Text>
            </View>
          )}

          <View className="flex-row items-center">
            <Ionicons name="star-outline" size={14} color={colors.fg.muted} />
            <Text className="text-xs ml-1" style={{ color: colors.fg.muted }}>
              {repository.stargazers_count}
            </Text>
          </View>
        </View>

        {repository.private && (
          <View
            className="px-2 py-1 rounded-full"
            style={{ backgroundColor: colors.attention.subtle }}
          >
            <Text
              className="text-xs font-medium"
              style={{ color: colors.attention.fg }}
            >
              Private
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
