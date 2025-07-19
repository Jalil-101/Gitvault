import React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { Repository, ListingConfig } from "@/types/repository";
import { useModernTheme } from "@/context/ThemeContext";

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

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const getLanguageColor = (language: string): string => {
    const languageColors: Record<string, string> = {
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
    return languageColors[language] || colors.text.quaternary;
  };

  return (
    <TouchableOpacity
      className="mx-4 mb-4 rounded-xl overflow-hidden"
      style={{
        backgroundColor: config.colorScheme.background,
        shadowColor: colors.shadow.md,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
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
                className="font-semibold text-base"
                style={{ color: colors.text.primary }}
                numberOfLines={1}
              >
                {repository.name}
              </Text>
              <Text
                className="text-sm"
                style={{ color: colors.text.tertiary }}
                numberOfLines={1}
              >
                {repository.owner}
              </Text>
            </View>
          </View>
          {repository.isPrivate && (
            <View
              className="px-2 py-1 rounded-md"
              style={{ backgroundColor: colors.status.warning.main }}
            >
              <Text
                className="text-xs font-medium"
                style={{ color: colors.text.inverse }}
              >
                Private
              </Text>
            </View>
          )}
        </View>

        {/* Description */}
        {repository.description && (
          <Text
            className="text-sm mb-3 leading-5"
            style={{ color: colors.text.secondary }}
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
                className="mr-2 mb-1 px-2 py-1 rounded-md"
                style={{ backgroundColor: config.colorScheme.secondary }}
              >
                <Text
                  className="text-xs"
                  style={{ color: colors.text.primary }}
                >
                  {topic}
                </Text>
              </View>
            ))}
            {repository.topics.length > 3 && (
              <View
                className="px-2 py-1 rounded-md"
                style={{ backgroundColor: colors.surface.tertiary }}
              >
                <Text
                  className="text-xs"
                  style={{ color: colors.text.primary }}
                >
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
                <Text
                  className="text-sm"
                  style={{ color: colors.text.secondary }}
                >
                  {repository.language}
                </Text>
              </View>
            )}
            <View className="flex-row items-center mr-4">
              <Text
                className="text-sm mr-1"
                style={{ color: colors.text.secondary }}
              >
                ⭐
              </Text>
              <Text
                className="text-sm"
                style={{ color: colors.text.secondary }}
              >
                {formatNumber(repository.stars)}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text
                className="text-sm mr-1"
                style={{ color: colors.text.secondary }}
              >
                🍴
              </Text>
              <Text
                className="text-sm"
                style={{ color: colors.text.secondary }}
              >
                {formatNumber(repository.forks)}
              </Text>
            </View>
          </View>
          <View
            className="w-1 h-6 rounded-full"
            style={{ backgroundColor: config.colorScheme.primary }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
