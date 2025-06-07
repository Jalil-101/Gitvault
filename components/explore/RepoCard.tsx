import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  Animated,
} from "react-native";
import { Repository } from "@/types/explore";
import { useTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  repo: Repository;
}

const languageColors: { [key: string]: string } = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  Swift: "#fa7343",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  PHP: "#4F5D95",
  Ruby: "#701516",
  "C#": "#239120",
  HTML: "#e34c26",
  CSS: "#1572B6",
};

export const RepoCard: React.FC<Props> = ({ repo }) => {
  const { colors, isDarkTheme } = useTheme();
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const openRepo = () => {
    Linking.openURL(repo.html_url);
  };

  const formatStarCount = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count.toString();
  };

  const languageColor = languageColors[repo.language] || "#8b949e";

  return (
    <Animated.View
      style={{ transform: [{ scale: scaleAnim }] }}
      className="mx-4 mb-3"
    >
      <TouchableOpacity
        onPress={openRepo}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        className="bg-github-light-canvas-default dark:bg-github-dark-canvas-overlay rounded-xl border border-github-light-border-default dark:border-github-dark-border-default overflow-hidden shadow-sm"
      >
        {/* Gradient Header */}
        <LinearGradient
          colors={isDarkTheme ? ["#161b22", "#0d1117"] : ["#f6f8fa", "#ffffff"]}
          className="px-4 py-3 border-b border-github-light-border-muted dark:border-github-dark-border-muted"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <Image
                source={{ uri: repo.owner.avatar_url }}
                className="w-6 h-6 rounded-full mr-2"
              />
              <Text
                className="text-base font-bold text-github-light-accent-fg dark:text-github-dark-accent-fg"
                numberOfLines={1}
              >
                {repo.full_name}
              </Text>
            </View>
            <View className="bg-github-light-accent-subtle dark:bg-github-dark-accent-subtle px-2 py-1 rounded-full">
              <Text className="text-xs font-medium text-github-light-accent-fg dark:text-github-dark-accent-fg">
                Public
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Content */}
        <View className="p-4">
          <Text
            className="text-sm text-github-light-fg-default dark:text-github-dark-fg-default mb-3 leading-5"
            numberOfLines={2}
          >
            {repo.description}
          </Text>

          {/* Stats Row */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-4">
              {/* Language */}
              <View className="flex-row items-center">
                <View
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: languageColor }}
                />
                <Text className="text-xs font-medium text-github-light-fg-muted dark:text-github-dark-fg-muted">
                  {repo.language}
                </Text>
              </View>

              {/* Stars */}
              <View className="flex-row items-center">
                <Text className="text-xs mr-1">⭐</Text>
                <Text className="text-xs font-semibold text-github-light-fg-default dark:text-github-dark-fg-default">
                  {formatStarCount(repo.stargazers_count)}
                </Text>
              </View>
            </View>

            {/* Trending Indicator */}
            <View className="bg-github-light-success-subtle dark:bg-github-dark-success-subtle px-2 py-1 rounded-full">
              <Text className="text-xs font-medium text-github-light-success-fg dark:text-github-dark-success-fg">
                📈 Trending
              </Text>
            </View>
          </View>
        </View>

        {/* Subtle Bottom Border */}
        <View className="h-1 bg-gradient-to-r from-github-light-accent-muted to-github-light-success-muted dark:from-github-dark-accent-muted dark:to-github-dark-success-muted" />
      </TouchableOpacity>
    </Animated.View>
  );
};
