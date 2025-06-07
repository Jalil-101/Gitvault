// components/TabButton.tsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface TabButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({
  title,
  isActive,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-2 border-b-2 ${
      isActive
        ? "border-github-light-accent-emphasis dark:border-github-dark-accent-emphasis"
        : "border-transparent"
    }`}
  >
    <Text
      className={`font-medium text-sm ${
        isActive
          ? "text-github-light-accent-emphasis dark:text-github-dark-accent-emphasis"
          : "text-github-light-fg-muted dark:text-github-dark-fg-muted"
      }`}
    >
      {title}
    </Text>
  </TouchableOpacity>
);
