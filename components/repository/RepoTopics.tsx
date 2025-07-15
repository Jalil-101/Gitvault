// components/RepoTopics.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { useThemeClasses } from "@/hooks/useThemeColor";
import { Repository } from "@/types/repo";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface RepoTopicsProps {
  repository: Repository;
  onTopicPress?: (topic: string) => void;
}

export const RepoTopics: React.FC<RepoTopicsProps> = ({
  repository,
  onTopicPress,
}) => {
  const { colors } = useModernTheme();
  const themeClasses = useThemeClasses();

  if (!repository.topics || repository.topics.length === 0) {
    return null;
  }

  return (
    <View className="px-4 mb-6">
      <Text
        className={`${themeClasses.text.primary} text-lg font-semibold mb-4`}
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
            className={`mr-2 px-3 py-2 rounded-full ${themeClasses.surface.glass}`}
            style={{ backgroundColor: colors.shadow.sm }}
            activeOpacity={0.8}
          >
            <Text className={`${themeClasses.text.primary} text-sm`}>
              {topic}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
