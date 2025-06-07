import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Topic } from "@/types/explore";
import { useTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  topic: Topic;
}

const topicIcons: { [key: string]: string } = {
  react: "⚛️",
  "machine-learning": "🤖",
  typescript: "📘",
  "artificial-intelligence": "🧠",
  blockchain: "⛓️",
  web3: "🌐",
  docker: "🐳",
  kubernetes: "☸️",
  python: "🐍",
  javascript: "💛",
  nodejs: "💚",
  vue: "💚",
  angular: "🔺",
  flutter: "💙",
  "react-native": "📱",
  swift: "🍎",
  kotlin: "📱",
  rust: "🦀",
  go: "🐹",
  java: "☕",
  csharp: "🔷",
  cpp: "⚡",
  php: "🐘",
  ruby: "💎",
  devops: "🚀",
  "cloud-computing": "☁️",
  aws: "🟠",
  azure: "🔵",
  gcp: "🔴",
  mongodb: "🍃",
  postgresql: "🐘",
  mysql: "🐬",
  redis: "🔴",
  graphql: "💜",
  "rest-api": "🔗",
  microservices: "🔧",
  cybersecurity: "🔒",
  "data-science": "📊",
  "deep-learning": "🧠",
  "computer-vision": "👁️",
  "natural-language-processing": "💬",
  iot: "📡",
  "augmented-reality": "🥽",
  "virtual-reality": "🎮",
  "game-development": "🎮",
  unity: "🎲",
  "unreal-engine": "🎮",
};

export const TopicCard: React.FC<Props> = ({ topic }) => {
  const { isDarkTheme } = useTheme();
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

  const getTopicIcon = (name: string): string => {
    return topicIcons[name] || "🏷️";
  };

  const getGradientColors = (
    featured: boolean
  ): [string, string] | [string, string, string] => {
    if (featured) {
      return isDarkTheme
        ? ["#1f6feb", "#8b5cf6", "#f59e0b"]
        : ["#0969da", "#7c3aed", "#d97706"];
    }
    return isDarkTheme ? ["#161b22", "#0d1117"] : ["#f6f8fa", "#ffffff"];
  };

  return (
    <Animated.View
      style={{ transform: [{ scale: scaleAnim }] }}
      className="mx-4 mb-3"
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        className={`rounded-xl border overflow-hidden shadow-sm ${
          topic.featured
            ? "border-github-light-accent-emphasis dark:border-github-dark-accent-emphasis"
            : "border-github-light-border-default dark:border-github-dark-border-default"
        }`}
      >
        <LinearGradient
          colors={getGradientColors(topic.featured)}
          className="p-4"
        >
          <View className="flex-row items-start justify-between">
            <View className="flex-1">
              <View className="flex-row items-center mb-2">
                <Text className="text-2xl mr-2">
                  {getTopicIcon(topic.name)}
                </Text>
                <Text
                  className={`text-lg font-bold ${
                    topic.featured
                      ? "text-white"
                      : "text-github-light-fg-default dark:text-github-dark-fg-default"
                  }`}
                  numberOfLines={1}
                >
                  {topic.display_name}
                </Text>
              </View>

              <Text
                className={`text-sm leading-5 mb-3 ${
                  topic.featured
                    ? "text-white/90"
                    : "text-github-light-fg-muted dark:text-github-dark-fg-muted"
                }`}
                numberOfLines={2}
              >
                {topic.short_description}
              </Text>

              {/* Topic stats mock */}
              <View className="flex-row items-center space-x-4">
                <View className="flex-row items-center">
                  <Text className="text-xs mr-1">📈</Text>
                  <Text
                    className={`text-xs font-medium ${
                      topic.featured
                        ? "text-white/80"
                        : "text-github-light-fg-muted dark:text-github-dark-fg-muted"
                    }`}
                  >
                    {Math.floor(Math.random() * 10000) + 1000} repos
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-xs mr-1">👥</Text>
                  <Text
                    className={`text-xs font-medium ${
                      topic.featured
                        ? "text-white/80"
                        : "text-github-light-fg-muted dark:text-github-dark-fg-muted"
                    }`}
                  >
                    {Math.floor(Math.random() * 1000000) + 10000} developers
                  </Text>
                </View>
              </View>
            </View>

            {topic.featured && (
              <View className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full ml-2">
                <Text className="text-xs font-bold text-white">
                  ⭐ FEATURED
                </Text>
              </View>
            )}
          </View>
        </LinearGradient>

        {/* Bottom accent line */}
        {!topic.featured && (
          <View className="h-1 bg-gradient-to-r from-github-light-accent-muted to-github-light-success-muted dark:from-github-dark-accent-muted dark:to-github-dark-success-muted" />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};
