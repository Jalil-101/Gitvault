// components/profile/RepositoryCard.tsx
import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { Repository } from "@/types/profile";

interface RepositoryCardProps {
  repo: Repository;
  index: number;
  formatNumber: (num: number) => string;
  getLanguageColor: (language: string) => string;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  repo,
  index,
  formatNumber,
  getLanguageColor,
}) => {
  const { theme, colors } = useTheme();
  const cardAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(cardAnim, {
      toValue: 1,
      duration: 500,
      delay: index * 150,
      useNativeDriver: true,
    }).start();
  }, []);

  const cardTransform = cardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 0],
  });

  return (
    <Animated.View
      style={{
        opacity: cardAnim,
        transform: [{ translateY: cardTransform }],
      }}
      className="bg-github-light-canvas-overlay dark:bg-github-dark-canvas-overlay border border-github-light-border-default dark:border-github-dark-border-default rounded-2xl p-5 mb-4 shadow-sm"
    >
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-1">
          <View className="flex-row items-center">
            <Ionicons
              name="folder-outline"
              size={16}
              color={
                theme === "dark"
                  ? colors.accent.emphasis
                  : colors.accent.emphasis
              }
              style={{ marginRight: 8 }}
            />
            <Text className="text-github-light-accent-emphasis dark:text-github-dark-accent-emphasis font-bold text-base">
              {repo.name}
            </Text>
            {repo.isPrivate && (
              <View className="ml-2 bg-github-light-attention-subtle dark:bg-github-dark-attention-subtle px-2 py-1 rounded-full">
                <Text className="text-github-light-attention-emphasis dark:text-github-dark-attention-emphasis text-xs font-medium">
                  Private
                </Text>
              </View>
            )}
          </View>
          <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-sm mt-2 leading-5">
            {repo.description}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-4">
          <View className="flex-row items-center">
            <View
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: getLanguageColor(repo.language) }}
            />
            <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-sm">
              {repo.language}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons
              name="star-outline"
              size={14}
              color={theme === "dark" ? colors.fg.muted : colors.fg.muted}
            />
            <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-sm ml-1">
              {formatNumber(repo.stars)}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons
              name="git-branch-outline"
              size={14}
              color={theme === "dark" ? colors.fg.muted : colors.fg.muted}
            />
            <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-sm ml-1">
              {formatNumber(repo.forks)}
            </Text>
          </View>
        </View>

        <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-sm">
          {repo.updatedAt}
        </Text>
      </View>
    </Animated.View>
  );
};
