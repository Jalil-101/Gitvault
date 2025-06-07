// components/settings/SettingSection.tsx
import React from "react";
import { View, Text } from "react-native";

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

export const SettingSection: React.FC<SettingSectionProps> = ({
  title,
  children,
}) => {
  return (
    <View className="mb-6">
      <Text
        className="text-sm font-semibold text-github-light-fg-muted dark:text-github-dark-fg-muted 
                       uppercase tracking-wide px-4 mb-2"
      >
        {title}
      </Text>
      <View
        className="bg-github-light-canvas-default dark:bg-github-dark-canvas-overlay 
                       border-t border-b border-github-light-border-default dark:border-github-dark-border-default"
      >
        {children}
      </View>
    </View>
  );
};
