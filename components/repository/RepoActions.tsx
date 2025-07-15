// components/RepoActions.tsx
import React from "react";
import { View, TouchableOpacity, Text, Linking } from "react-native";
import { Repository } from "@/types/repo";
import { useModernTheme } from "@/context/ThemeContext";
import { useThemeClasses } from "@/hooks/useThemeColor";

interface RepoActionsProps {
  repository: Repository;
}

export const RepoActions: React.FC<RepoActionsProps> = ({ repository }) => {
  const { colors } = useModernTheme();
  const themeClasses = useThemeClasses();

  const actions = [
    {
      icon: "⭐",
      label: "Star",
      onPress: () => Linking.openURL(`${repository.url}/stargazers`),
    },
    {
      icon: "👀",
      label: "Watch",
      onPress: () => Linking.openURL(`${repository.url}/watchers`),
    },
    {
      icon: "🍴",
      label: "Fork",
      onPress: () => Linking.openURL(`${repository.url}/fork`),
    },
    {
      icon: "🐛",
      label: "Issues",
      onPress: () => Linking.openURL(`${repository.url}/issues`),
    },
  ];

  return (
    <View className="px-4 mb-6">
      <Text
        className={`${themeClasses.text.primary} text-lg font-semibold mb-4`}
      >
        Actions
      </Text>

      <View className="flex-row justify-between">
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            onPress={action.onPress}
            className={`flex-1 mx-1 p-4 rounded-xl items-center ${themeClasses.surface.elevated}`}
            style={{ shadowColor: colors.shadow.md, shadowOpacity: 0.1, shadowRadius: 3, elevation: 5 }}
            activeOpacity={0.8}
          >
            <Text className="text-2xl mb-2">{action.icon}</Text>
            <Text
              className={`${themeClasses.text.primary} text-sm font-medium`}
            >
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
