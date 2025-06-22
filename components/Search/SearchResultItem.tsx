// components/search/SearchResultItem.tsx
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Star, GitFork, Circle } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { ThemedText } from "@/components/ThemedText";

export interface SearchResult {
  id: string;
  type: "repository" | "user" | "topic";
  title: string;
  subtitle?: string;
  description?: string;
  language?: string;
  stars?: number;
  forks?: number;
  avatar?: string;
  verified?: boolean;
}

interface SearchResultItemProps {
  item: SearchResult;
  onPress: (item: SearchResult) => void;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  item,
  onPress,
}) => {
  const { colors, isDarkTheme } = useModernTheme();

  const getLanguageColor = (language: string) => {
    const languageColors: Record<string, string> = {
      JavaScript: "#F7DF1E",
      TypeScript: "#3178C6",
      Python: "#3776AB",
      Java: "#ED8B00",
      React: "#61DAFB",
      Vue: "#4FC08D",
      Angular: "#DD0031",
    };
    return languageColors[language] || colors.text.tertiary;
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      className={`${
        isDarkTheme
          ? "bg-modern-dark-surface-secondary"
          : "bg-modern-light-surface-secondary"
      } mx-4 mb-3 p-4 rounded-2xl`}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <ThemedText
              className={`${
                isDarkTheme
                  ? "text-modern-dark-text-primary"
                  : "text-modern-light-text-primary"
              } font-semibold text-base`}
            >
              {item.title}
            </ThemedText>
            {item.verified && (
              <View
                className={`ml-2 w-4 h-4 ${
                  isDarkTheme
                    ? "bg-modern-dark-interactive-primary"
                    : "bg-modern-light-interactive-primary"
                } rounded-full items-center justify-center`}
              >
                <ThemedText
                  className={`${
                    isDarkTheme
                      ? "text-modern-dark-text-inverse"
                      : "text-modern-light-text-inverse"
                  } text-xs`}
                >
                  ✓
                </ThemedText>
              </View>
            )}
          </View>

          {item.subtitle && (
            <ThemedText
              className={`${
                isDarkTheme
                  ? "text-modern-dark-text-tertiary"
                  : "text-modern-light-text-tertiary"
              } text-sm mb-2`}
            >
              {item.subtitle}
            </ThemedText>
          )}

          {item.description && (
            <ThemedText
              className={`${
                isDarkTheme
                  ? "text-modern-dark-text-secondary"
                  : "text-modern-light-text-secondary"
              } text-sm mb-3 leading-5`}
            >
              {item.description}
            </ThemedText>
          )}

          <View className="flex-row items-center">
            {item.language && (
              <View className="flex-row items-center mr-4">
                <Circle
                  size={12}
                  fill={getLanguageColor(item.language)}
                  color={getLanguageColor(item.language)}
                />
                <ThemedText
                  className={`${
                    isDarkTheme
                      ? "text-modern-dark-text-tertiary"
                      : "text-modern-light-text-tertiary"
                  } text-sm ml-1`}
                >
                  {item.language}
                </ThemedText>
              </View>
            )}

            {item.stars !== undefined && (
              <View className="flex-row items-center mr-4">
                <Star size={14} color={colors.text.tertiary} />
                <ThemedText
                  className={`${
                    isDarkTheme
                      ? "text-modern-dark-text-tertiary"
                      : "text-modern-light-text-tertiary"
                  } text-sm ml-1`}
                >
                  {item.stars > 1000
                    ? `${(item.stars / 1000).toFixed(1)}k`
                    : item.stars}
                </ThemedText>
              </View>
            )}

            {item.forks !== undefined && (
              <View className="flex-row items-center">
                <GitFork size={14} color={colors.text.tertiary} />
                <ThemedText
                  className={`${
                    isDarkTheme
                      ? "text-modern-dark-text-tertiary"
                      : "text-modern-light-text-tertiary"
                  } text-sm ml-1`}
                >
                  {item.forks > 1000
                    ? `${(item.forks / 1000).toFixed(1)}k`
                    : item.forks}
                </ThemedText>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
