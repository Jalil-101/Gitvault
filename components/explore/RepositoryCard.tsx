// components/explore/RepositoryCard.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Star, GitFork, TrendingUp } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useModernTheme } from "@/context/ThemeContext";
import { Repository } from "@/types/explore";


interface RepositoryCardProps {
  repository: Repository;
  onPress?: () => void;
  variant?: "default" | "trending" | "discover";
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  repository,
  onPress,
  variant = "default",
}) => {
  const { colors, shadows } = useModernTheme();

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const getAccentColor = () => {
    switch (variant) {
      case "trending":
        return colors.accents.green;
      case "discover":
        return colors.accents.blue;
      default:
        return colors.accents.purple;
    }
  };

  const accentColor = getAccentColor();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-2xl"
      style={{
        backgroundColor: colors.surface.primary,
        borderColor: `${accentColor.main}20`,
        borderWidth: 2,
        width: variant === "trending" ? 300 : undefined,
        minWidth: variant === "trending" ? 300 : undefined,
        ...shadows.md,
      }}
    >
      {/* Gradient Background */}
      <LinearGradient
        colors={[`${accentColor.main}05`, `${accentColor.light}05`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-2xl"
      />

      <View className="p-5">
        {/* Repository Header */}
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-1 mr-4">
            <Text
              className="text-base font-semibold leading-6"
              style={{ color: colors.text.primary }}
              numberOfLines={1}
            >
              {repository.name}
            </Text>
            <View
              className="h-0.5 mt-2 rounded-full"
              style={{
                backgroundColor: accentColor.main,
                width: "30%",
              }}
            />
          </View>

          {variant === "trending" && repository.todayStars && (
            <View
              className="flex-row items-center px-3 py-2 rounded-xl"
              style={{
                backgroundColor: colors.surface.secondary,
                borderWidth: 1,
                borderColor: `${colors.accents.green.main}20`,
                ...shadows.sm,
              }}
            >
              <LinearGradient
                colors={[
                  `${colors.accents.green.main}10`,
                  `${colors.accents.green.light}10`,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute inset-0 rounded-xl"
              />
              <View
                className="w-6 h-6 rounded-lg items-center justify-center mr-2"
                style={{ backgroundColor: `${colors.accents.green.main}15` }}
              >
                <TrendingUp size={12} color={colors.accents.green.main} />
              </View>
              <Text
                className="text-xs font-semibold"
                style={{ color: colors.accents.green.main }}
              >
                +{repository.todayStars}
              </Text>
            </View>
          )}
        </View>

        {/* Description */}
        <Text
          className="text-sm font-medium mb-4 leading-5"
          style={{ color: colors.text.secondary }}
          numberOfLines={3}
        >
          {repository.description}
        </Text>

        {/* Repository Stats */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-4">
            {/* Language */}
            <View className="flex-row items-center">
              <View
                className="w-8 h-8 rounded-xl items-center justify-center mr-2"
                style={{
                  backgroundColor: colors.surface.secondary,
                  borderWidth: 1,
                  borderColor: `${repository.languageColor}20`,
                }}
              >
                <View
                  className="w-4 h-4 rounded-lg"
                  style={{ backgroundColor: repository.languageColor }}
                />
              </View>
              <Text
                className="text-xs font-semibold"
                style={{ color: colors.text.primary }}
              >
                {repository.language}
              </Text>
            </View>

            {/* Stars */}
            <View className="flex-row items-center">
              <View
                className="w-8 h-8 rounded-xl items-center justify-center mr-2"
                style={{
                  backgroundColor: colors.surface.secondary,
                  borderWidth: 1,
                  borderColor: `${colors.accents.green.main}20`, // or any other existing color
                }}
              >
                <Star
                  size={14}
                  color={colors.accents.green.main} // or any other existing color
                  fill={colors.accents.green.main} // or any other existing color
                />
              </View>
              <Text
                className="text-xs font-semibold"
                style={{ color: colors.text.primary }}
              >
                {formatNumber(repository.stars)}
              </Text>
            </View>

            {/* Forks */}
            {repository.forks && (
              <View className="flex-row items-center">
                <View
                  className="w-8 h-8 rounded-xl items-center justify-center mr-2"
                  style={{
                    backgroundColor: colors.surface.secondary,
                    borderWidth: 1,
                    borderColor: `${accentColor.main}20`,
                  }}
                >
                  <GitFork size={14} color={accentColor.main} />
                </View>
                <Text
                  className="text-xs font-semibold"
                  style={{ color: colors.text.primary }}
                >
                  {formatNumber(repository.forks)}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
