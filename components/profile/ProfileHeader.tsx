// components/profile/ProfileHeader.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { UserProfile } from "@/types/profile";

interface ProfileHeaderProps {
  profile: UserProfile;
  avatarScale: Animated.AnimatedAddition<number>;
  scaleAnim: Animated.Value;
  slideAnim: Animated.Value;
  fadeAnim: Animated.Value;
  sparkleAnim: Animated.Value;
  formatNumber: (num: number) => string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  avatarScale,
  scaleAnim,
  slideAnim,
  fadeAnim,
  sparkleAnim,
  formatNumber,
}) => {
  const { colors } = useTheme();

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
        opacity: fadeAnim,
      }}
      className="relative px-6 pt-8 pb-6"
    >
      {/* Background Gradient */}
      <View className="absolute inset-0 bg-gradient-to-br from-github-light-accent-subtle to-github-light-canvas-subtle dark:from-github-dark-accent-subtle dark:to-github-dark-canvas-subtle opacity-30" />

      {/* Sparkle Effects */}
      <Animated.View
        style={{
          opacity: sparkleAnim,
          position: "absolute",
          top: 20,
          right: 30,
        }}
      >
        <Ionicons name="sparkles" size={16} color={colors.accent.emphasis} />
      </Animated.View>

      <View className="flex-row items-start relative z-10 pt-4">
        <Animated.View
          style={{ transform: [{ scale: avatarScale }] }}
          className="relative"
        >
          <View className="w-24 h-24 rounded-2xl bg-gradient-to-br from-github-light-accent-emphasis to-github-light-success-emphasis dark:from-github-dark-accent-emphasis dark:to-github-dark-success-emphasis p-0.5">
            <Image
              source={{ uri: profile.avatar }}
              className="w-full h-full rounded-2xl"
            />
          </View>
          {/* Online indicator */}
          <View className="absolute -bottom-1 -right-1 w-6 h-6 bg-github-light-success-emphasis dark:bg-github-dark-success-emphasis rounded-full border-2 border-github-light-canvas-default dark:border-github-dark-canvas-default" />
        </Animated.View>

        <View className="flex-1 ml-4">
          <Text className="text-github-light-fg-default dark:text-github-dark-fg-default text-2xl font-bold mb-1">
            {profile.name}
          </Text>
          <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-base mb-3">
            {profile.username}
          </Text>

          <View className="flex-row space-x-6">
            <TouchableOpacity className="items-center">
              <Text className="text-github-light-fg-default dark:text-github-dark-fg-default font-bold text-lg mr-4">
                {formatNumber(profile.followers)}
              </Text>
              <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-sm mr-4">
                followers
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center">
              <Text className="text-github-light-fg-default dark:text-github-dark-fg-default font-bold text-lg mr-4">
                {formatNumber(profile.following)}
              </Text>
              <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-sm mr-4">
                following
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};
