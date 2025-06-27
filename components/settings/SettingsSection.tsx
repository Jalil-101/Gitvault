// components/settings/SettingsSection.tsx
import React from "react";
import { View, Text } from "react-native";
import { MODERN_DARK } from "../../constants/Colors";

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
}) => {
  return (
    <View className="mb-6">
      <Text
        className="text-sm font-medium px-4 mb-3 uppercase tracking-wider"
        style={{ color: MODERN_DARK.text.quaternary }}
      >
        {title}
      </Text>
      <View
        className="mx-4 rounded-2xl overflow-hidden"
        style={{ backgroundColor: MODERN_DARK.surface.secondary }}
      >
        {children}
      </View>
    </View>
  );
};
