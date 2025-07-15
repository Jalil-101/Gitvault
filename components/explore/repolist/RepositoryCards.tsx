// components/RepositoryCard.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { Repository, ListingConfig } from "@/types/repo";
import { useModernTheme } from "@/context/ThemeContext";
import { useThemeClasses } from "@/hooks/useThemeColor";

interface RepositoryCardProps {
  repository: Repository;
  config: ListingConfig;
  onPress: (repository: Repository) => void;
  index: number;
}

const { width } = Dimensions.get("window");

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  repository,
  config,
  onPress,
  index,
}) => {
  const { colors, shadows } = useModernTheme();
  const themeClasses = useThemeClasses();

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      Python: "#3572A5",
      Java: "#b07219",
      "C++": "#f34b7d",
      Go: "#00ADD8",
      Rust: "#dea584",
      Swift: "#ffac45",
      Kotlin: "#A97BFF",
      PHP: "#4F5D95",
    };
    return colors[language] || (colors.text as any).secondary;
  };

  const getAccentColor = () => {
    return colors.accents[config.accentColor].main;
  };

  return (
    <TouchableOpacity
      className={`mx-4 mb-4 rounded-xl overflow-hidden ${themeClasses.surface.elevated}`}
      style={shadows.md}
      onPress={() => onPress(repository)}
      activeOpacity={0.8}
    >
      <View className="p-4">
        {/* Header */}
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-row items-center flex-1">
            <Image
              source={{ uri: repository.avatar }}
              className="w-10 h-10 rounded-full mr-3"
              resizeMode="cover"
            />
            <View className="flex-1">
              <Text
                className={`font-semibold text-base ${themeClasses.text.primary}`}
                numberOfLines={1}
              >
                {repository.name}
              </Text>
              <Text
                className={`text-sm ${themeClasses.text.secondary}`}
                numberOfLines={1}
              >
                {repository.owner}
              </Text>
            </View>
          </View>
          {repository.isPrivate && (
            <View
              className={`px-2 py-1 rounded-md ${themeClasses.status.warning.bg}`}
            >
              <Text
                className={`text-xs font-medium ${themeClasses.status.warning.text}`}
              >
                Private
              </Text>
            </View>
          )}
        </View>

        {/* Description */}
        {repository.description && (
          <Text
            className={`text-sm mb-3 leading-5 ${themeClasses.text.tertiary}`}
            numberOfLines={2}
          >
            {repository.description}
          </Text>
        )}

        {/* Topics */}
        {repository.topics.length > 0 && (
          <View className="flex-row flex-wrap mb-3">
            {repository.topics.slice(0, 3).map((topic, topicIndex) => (
              <View
                key={topicIndex}
                className={`mr-2 mb-1 px-2 py-1 rounded-md ${
                  themeClasses.accents[config.accentColor].bg
                }`}
              >
                <Text className={`text-xs ${themeClasses.text.inverse}`}>
                  {topic}
                </Text>
              </View>
            ))}
            {repository.topics.length > 3 && (
              <View
                className={`px-2 py-1 rounded-md ${themeClasses.surface.secondary}`}
              >
                <Text className={`text-xs ${themeClasses.text.secondary}`}>
                  +{repository.topics.length - 3}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Stats */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            {repository.language && (
              <View className="flex-row items-center mr-4">
                <View
                  className="w-3 h-3 rounded-full mr-1"
                  style={{
                    backgroundColor: getLanguageColor(repository.language),
                  }}
                />
                <Text className={`text-sm ${themeClasses.text.tertiary}`}>
                  {repository.language}
                </Text>
              </View>
            )}
            <View className="flex-row items-center mr-4">
              <Text className={`text-sm mr-1 ${themeClasses.text.tertiary}`}>
                ⭐
              </Text>
              <Text className={`text-sm ${themeClasses.text.tertiary}`}>
                {formatNumber(repository.stars)}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className={`text-sm mr-1 ${themeClasses.text.tertiary}`}>
                🍴
              </Text>
              <Text className={`text-sm ${themeClasses.text.tertiary}`}>
                {formatNumber(repository.forks)}
              </Text>
            </View>
          </View>
          <View
            className="w-1 h-6 rounded-full"
            style={{ backgroundColor: getAccentColor() }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
