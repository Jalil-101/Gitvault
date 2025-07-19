// components/RepoTopics.tsx
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Repository, DetailConfig } from "@/types/repository";
import { useModernTheme } from "@/context/ThemeContext";

interface RepoTopicsProps {
  repository: Repository;
  config: DetailConfig;
  onTopicPress?: (topic: string) => void;
}

export const RepoTopics: React.FC<RepoTopicsProps> = ({
  repository,
  config,
  onTopicPress,
}) => {
  const { colors } = useModernTheme();

  if (!repository.topics || repository.topics.length === 0) {
    return null;
  }

  return (
    <View className="px-4 mb-6">
      <Text
        className="text-lg font-semibold mb-4"
        style={{ color: colors.text.primary }}
      >
        Topics
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {repository.topics.map((topic, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onTopicPress?.(topic)}
            className="mr-2 px-3 py-2 rounded-full"
            style={{ backgroundColor: config.colorScheme.secondary }}
            activeOpacity={0.8}
          >
            <Text className="text-sm" style={{ color: colors.text.primary }}>
              {topic}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
