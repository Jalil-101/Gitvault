import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Animated,
} from "react-native";
import { Developer } from "@/types/explore";
import { useTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  developer: Developer;
}

export const DeveloperCard: React.FC<Props> = ({ developer }) => {
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

  const openProfile = () => {
    Linking.openURL(developer.html_url);
  };

  const getTypeIcon = (type: string) => {
    return type === "Organization" ? "🏢" : "👨‍💻";
  };

  const getTypeColor = (type: string) => {
    return type === "Organization"
      ? "text-github-light-attention-fg dark:text-github-dark-attention-fg"
      : "text-github-light-success-fg dark:text-github-dark-success-fg";
  };

  const getTypeBg = (type: string) => {
    return type === "Organization"
      ? "bg-github-light-attention-subtle dark:bg-github-dark-attention-subtle"
      : "bg-github-light-success-subtle dark:bg-github-dark-success-subtle";
  };

  return (
    <Animated.View
      style={{ transform: [{ scale: scaleAnim }] }}
      className="mx-4 mb-3"
    >
      <TouchableOpacity
        onPress={openProfile}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        className="bg-github-light-canvas-default dark:bg-github-dark-canvas-overlay rounded-xl border border-github-light-border-default dark:border-github-dark-border-default overflow-hidden shadow-sm"
      >
        <LinearGradient
          colors={isDarkTheme ? ["#161b22", "#0d1117"] : ["#f6f8fa", "#ffffff"]}
          className="p-4"
        >
          <View className="flex-row items-center">
            {/* Avatar with gradient border */}
            <View className="relative">
              <LinearGradient
                colors={["#2f81f7", "#3fb950", "#d29922"]}
                className="w-16 h-16 rounded-full p-0.5"
              >
                <View className="w-full h-full rounded-full bg-github-light-canvas-default dark:bg-github-dark-canvas-default p-0.5">
                  <Image
                    source={{ uri: developer.avatar_url }}
                    className="w-full h-full rounded-full"
                  />
                </View>
              </LinearGradient>

              {/* Online indicator */}
              <View className="absolute -bottom-1 -right-1 w-4 h-4 bg-github-light-success-fg dark:bg-github-dark-success-fg rounded-full border-2 border-github-light-canvas-default dark:border-github-dark-canvas-default" />
            </View>

            {/* User Info */}
            <View className="flex-1 ml-4">
              <View className="flex-row items-center justify-between">
                <Text
                  className="text-lg font-bold text-github-light-fg-default dark:text-github-dark-fg-default"
                  numberOfLines={1}
                >
                  {developer.login}
                </Text>
                <View
                  className={`px-3 py-1 rounded-full ${getTypeBg(
                    developer.type
                  )}`}
                >
                  <View className="flex-row items-center">
                    <Text className="text-xs mr-1">
                      {getTypeIcon(developer.type)}
                    </Text>
                    <Text
                      className={`text-xs font-semibold ${getTypeColor(
                        developer.type
                      )}`}
                    >
                      {developer.type}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Activity indicators */}
              <View className="flex-row items-center mt-2 space-x-3">
                <View className="flex-row items-center">
                  <Text className="text-xs">📊</Text>
                  <Text className="text-xs text-github-light-fg-muted dark:text-github-dark-fg-muted ml-1">
                    Active today
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-xs">🔥</Text>
                  <Text className="text-xs text-github-light-fg-muted dark:text-github-dark-fg-muted ml-1">
                    Trending
                  </Text>
                </View>
              </View>

              {/* Contribution stats mock */}
              <View className="flex-row items-center mt-2 space-x-4">
                <View className="flex-row items-center">
                  <View className="w-2 h-2 bg-github-light-accent-fg dark:bg-github-dark-accent-fg rounded-full mr-1" />
                  <Text className="text-xs font-medium text-github-light-fg-default dark:text-github-dark-fg-default">
                    {Math.floor(Math.random() * 100) + 50} repos
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <View className="w-2 h-2 bg-github-light-success-fg dark:bg-github-dark-success-fg rounded-full mr-1" />
                  <Text className="text-xs font-medium text-github-light-fg-default dark:text-github-dark-fg-default">
                    {Math.floor(Math.random() * 1000) + 100} followers
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Bottom accent */}
        <View className="h-1 bg-gradient-to-r from-github-light-accent-muted via-github-light-success-muted to-github-light-attention-muted dark:from-github-dark-accent-muted dark:via-github-dark-success-muted dark:to-github-dark-attention-muted" />
      </TouchableOpacity>
    </Animated.View>
  );
};
