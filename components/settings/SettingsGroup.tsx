// components/settings/SettingsGroup.tsx
import React from "react";
import { View, Text } from "react-native";

interface SettingsGroupProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  variant?: "default" | "card" | "inset";
}

export const SettingsGroup: React.FC<SettingsGroupProps> = ({
  title,
  description,
  children,
  variant = "default",
}) => {
  const getGroupStyles = () => {
    switch (variant) {
      case "card":
        return "bg-modern-dark-surface-secondary rounded-2xl mx-4 overflow-hidden mb-6";
      case "inset":
        return "bg-modern-dark-surface-tertiary rounded-xl mx-6 overflow-hidden mb-4";
      default:
        return "mb-6";
    }
  };

  return (
    <View className="mb-6">
      <View className="px-4 mb-3">
        <Text className="text-lg font-semibold text-modern-dark-text-primary mb-1">
          {title}
        </Text>
        {description && (
          <Text className="text-sm text-modern-dark-text-tertiary">
            {description}
          </Text>
        )}
      </View>

      <View className={getGroupStyles()}>{children}</View>
    </View>
  );
};
