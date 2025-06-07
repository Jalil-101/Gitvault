// components/UserCard.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { User } from "@/types/search";

interface UserCardProps {
  user: User;
  onPress?: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => onPress?.(user)}
      className="bg-github-light-canvas-default dark:bg-github-dark-canvas-overlay border border-github-light-border-default dark:border-github-dark-border-default rounded-xl p-4 mb-3"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        <View className="w-12 h-12 rounded-full bg-github-light-canvas-inset dark:bg-github-dark-canvas-inset mr-3" />
        <View className="flex-1">
          <Text className="text-github-light-fg-default dark:text-github-dark-fg-default font-semibold text-base">
            {user.name || user.login}
          </Text>
          <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-sm">
            @{user.login}
          </Text>
          {user.bio && (
            <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-sm mt-1">
              {user.bio}
            </Text>
          )}
        </View>
      </View>

      <View className="flex-row items-center mt-3 space-x-4">
        <View className="flex-row items-center">
          <Ionicons name="book" size={14} color={colors.fg.muted} />
          <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-sm ml-1">
            {user.public_repos} repos
          </Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="people" size={14} color={colors.fg.muted} />
          <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-sm ml-1">
            {user.followers} followers
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
