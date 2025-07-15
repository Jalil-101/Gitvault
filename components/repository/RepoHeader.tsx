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
import { Repository } from "@/types/repo";
import { useModernTheme } from "@/context/ThemeContext";
import { useThemeClasses } from "@/hooks/useThemeColor";

interface RepoHeaderProps {
  repository: Repository;
  onBack: () => void;
  listingType?: "trending" | "discover";
}

export const RepoHeader: React.FC<RepoHeaderProps> = ({
  repository,
  onBack,
  listingType = "discover",
}) => {
  const { colors, gradients } = useModernTheme();
  const themeClasses = useThemeClasses();

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
          className={`p-2 rounded-lg ${themeClasses.surface.secondary}`}
        >
          <Text className={`${themeClasses.text.primary} text-base`}>
            ← Back
          </Text>
        </TouchableOpacity>

        <View className="flex-row space-x-2">
          <TouchableOpacity
            onPress={handleShare}
            className={`p-2 rounded-lg ${themeClasses.surface.secondary}`}
          >
            <Text className={`${themeClasses.text.primary} text-base`}>📤</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleOpenInBrowser}
            className={`p-2 rounded-lg ${themeClasses.interactive.primary}`}
          >
            <Text className="text-white text-base">🌐</Text>
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
            className={`${themeClasses.text.primary} text-xl font-bold mb-1`}
          >
            {repository.name}
          </Text>

          <Text className={`${themeClasses.text.secondary} text-base mb-2`}>
            {repository.owner}
          </Text>

          <View className="flex-row items-center">
            {repository.isPrivate && (
              <View
                className={`${themeClasses.status.warning.bg} px-2 py-1 rounded-md mr-2`}
              >
                <Text
                  className={`${themeClasses.status.warning.text} text-xs font-medium`}
                >
                  Private
                </Text>
              </View>
            )}

            <View
              className={`px-2 py-1 rounded-md ${
                listingType === "trending"
                  ? themeClasses.accents.green.bg
                  : themeClasses.accents.blue.bg
              }`}
            >
              <Text className="text-white text-xs font-medium">
                {listingType === "trending" ? "Trending" : "Popular"}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Description */}
      {repository.description && (
        <Text
          className={`${themeClasses.text.secondary} text-base leading-6 mb-4`}
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
          <Text className={`${themeClasses.accents.blue.main} text-base`}>
            🔗 {repository.homepage}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
