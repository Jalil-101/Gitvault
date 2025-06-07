import React, { useState, useEffect } from "react";
import { View, Text, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/context/ThemeContext";
import { ExploreTab } from "@/types/explore";

interface ExploreAnimatedHeaderProps {
  activeTab: ExploreTab;
  scrollY: Animated.Value;
  dataLength: number;
}

export const ExploreAnimatedHeader: React.FC<ExploreAnimatedHeaderProps> = ({
  activeTab,
  scrollY,
  dataLength,
}) => {
  const { isDarkTheme } = useTheme();
  const [headerOpacity] = useState(new Animated.Value(1));
  const [headerHeight] = useState(new Animated.Value(1));

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      const opacity = Math.max(0, Math.min(1, 1 - value / 120));
      const scale = Math.max(0.85, Math.min(1, 1 - value / 300));
      headerOpacity.setValue(opacity);
      headerHeight.setValue(scale);
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY, headerOpacity, headerHeight]);

  const getTabConfig = (tab: ExploreTab) => {
    const configs = {
      repositories: {
        emoji: "🔥",
        title: "Trending Repositories",
        description: "Discover the hottest projects on GitHub",
        timeframe: "24h",
      },
      developers: {
        emoji: "👨‍💻",
        title: "Trending Developers",
        description: "Follow the most active developers",
        timeframe: "Week",
      },
      topics: {
        emoji: "🏷️",
        title: "Trending Topics",
        description: "Explore popular technologies and themes",
        timeframe: "Month",
      },
    };
    return configs[tab] || configs.repositories;
  };

  const config = getTabConfig(activeTab);

  return (
    <Animated.View
      className="px-4 pt-2 pb-4 mb-2"
      style={{
        opacity: headerOpacity,
        transform: [
          {
            translateY: scrollY.interpolate({
              inputRange: [0, 100],
              outputRange: [0, -20],
              extrapolate: "clamp",
            }),
          },
          {
            scale: headerHeight,
          },
        ],
      }}
    >
      <LinearGradient
        colors={
          isDarkTheme
            ? ["rgba(22, 27, 34, 0.98)", "rgba(13, 17, 23, 0.95)"]
            : ["rgba(246, 248, 250, 0.98)", "rgba(255, 255, 255, 0.95)"]
        }
        className="rounded-2xl border border-github-light-border-default dark:border-github-dark-border-default shadow-sm"
        style={{
          shadowColor: isDarkTheme ? "#000" : "#0001",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDarkTheme ? 0.3 : 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <View className="p-5">
          <View className="flex-row items-center mb-3">
            <Text className="text-3xl mr-3">{config.emoji}</Text>
            <View className="flex-1">
              <Text className="text-xl font-bold text-github-light-fg-default dark:text-github-dark-fg-default mb-1">
                {config.title}
              </Text>
              <Text className="text-sm text-github-light-fg-muted dark:text-github-dark-fg-muted leading-5">
                {config.description}
              </Text>
            </View>
            <View className="bg-github-light-accent-subtle dark:bg-github-dark-accent-subtle px-3 py-2 rounded-full">
              <Text className="text-xs font-semibold text-github-light-accent-fg dark:text-github-dark-accent-fg">
                {dataLength}
              </Text>
            </View>
          </View>

          {/* Stats Row */}
          <View className="flex-row justify-between pt-3 border-t border-github-light-border-muted dark:border-github-dark-border-muted">
            <View className="flex-1 items-center">
              <Text className="text-lg font-bold text-github-light-fg-default dark:text-github-dark-fg-default">
                {config.timeframe}
              </Text>
              <Text className="text-xs text-github-light-fg-muted dark:text-github-dark-fg-muted">
                Timeframe
              </Text>
            </View>
            <View className="flex-1 items-center border-l border-r border-github-light-border-muted dark:border-github-dark-border-muted">
              <Text className="text-lg font-bold text-github-light-success-fg dark:text-github-dark-success-fg">
                {Math.floor(Math.random() * 50) + 10}%
              </Text>
              <Text className="text-xs text-github-light-fg-muted dark:text-github-dark-fg-muted">
                Growth
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-lg font-bold text-github-light-accent-fg dark:text-github-dark-accent-fg">
                Live
              </Text>
              <Text className="text-xs text-github-light-fg-muted dark:text-github-dark-fg-muted">
                Status
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
