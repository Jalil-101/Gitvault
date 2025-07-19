// components/RepoActions.tsx
import React from "react";
import { View, TouchableOpacity, Text, Linking } from "react-native";
import { Repository, DetailConfig } from "@/types/repository";
import { useModernThemeColor } from "@/hooks/useThemeColor";

interface RepoActionsProps {
  repository: Repository;
  config: DetailConfig;
}

export const RepoActions: React.FC<RepoActionsProps> = ({
  repository,
  config,
}) => {
  const { colors } = useModernThemeColor();

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
        className="text-lg font-semibold mb-4"
        style={{ color: colors.text.primary }}
      >
        Actions
      </Text>

      <View className="flex-row justify-between">
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            onPress={action.onPress}
            className="flex-1 mx-1 p-4 rounded-xl items-center"
            style={{ backgroundColor: colors.surface.secondary }}
            activeOpacity={0.8}
          >
            <Text className="text-2xl mb-2">{action.icon}</Text>
            <Text
              className="text-sm font-medium"
              style={{ color: colors.text.primary }}
            >
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
