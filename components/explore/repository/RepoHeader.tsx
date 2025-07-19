// components/RepoHeader.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import { Repository, DetailConfig } from "@/types/repository";
import { useModernThemeColor } from "@/hooks/useThemeColor";

interface RepoHeaderProps {
  repository: Repository;
  config: DetailConfig;
  onBack: () => void;
}

export const RepoHeader: React.FC<RepoHeaderProps> = ({
  repository,
  config,
  onBack,
}) => {
  const { colors } = useModernThemeColor();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${repository.fullName} on GitHub: ${repository.url}`,
        url: repository.url,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleOpenInBrowser = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View className="px-4 py-4">
      {/* Navigation */}
      <View className="flex-row justify-between items-center mb-4">
        <TouchableOpacity
          onPress={onBack}
          className="p-2 rounded-lg"
          style={{ backgroundColor: colors.surface.elevated }}
        >
          <Text className="text-base" style={{ color: colors.text.primary }}>
            ← Back
          </Text>
        </TouchableOpacity>

        <View className="flex-row space-x-2">
          <TouchableOpacity
            onPress={handleShare}
            className="p-2 rounded-lg"
            style={{ backgroundColor: colors.surface.elevated }}
          >
            <Text className="text-base">📤</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleOpenInBrowser}
            className="p-2 rounded-lg"
            style={{ backgroundColor: colors.interactive.primary }}
          >
            <Text className="text-base" style={{ color: colors.text.inverse }}>
              🌐
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Repository Info */}
      <View className="flex-row items-start mb-4">
        <Image
          source={{ uri: repository.avatar }}
          className="w-16 h-16 rounded-full mr-4"
          resizeMode="cover"
        />

        <View className="flex-1">
          <Text
            className="text-xl font-bold mb-1"
            style={{ color: colors.text.primary }}
          >
            {repository.name}
          </Text>

          <Text
            className="text-base mb-2"
            style={{ color: colors.text.tertiary }}
          >
            {repository.owner}
          </Text>

          <View className="flex-row items-center">
            {repository.isPrivate && (
              <View
                className="px-2 py-1 rounded-md mr-2"
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

            <View
              className="px-2 py-1 rounded-md"
              style={{ backgroundColor: colors.accents.blue.main }}
            >
              <Text
                className="text-xs font-medium"
                style={{ color: colors.text.inverse }}
              >
                {config.type === "trending" ? "Trending" : "Popular"}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Description */}
      {repository.description && (
        <Text
          className="text-base leading-6 mb-4"
          style={{ color: colors.text.secondary }}
        >
          {repository.description}
        </Text>
      )}

      {/* Homepage Link */}
      {repository.homepage && (
        <TouchableOpacity
          onPress={() => Linking.openURL(repository.homepage!)}
          className="mb-4"
        >
          <Text
            style={{ color: colors.accents.blue.main }}
            className="text-base"
          >
            🔗 {repository.homepage}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
