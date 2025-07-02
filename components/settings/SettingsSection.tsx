// components/settings/SettingsSection.tsx
import React from "react";
import { View, Text } from "react-native";
import { useModernThemeColor } from "../../hooks/useThemeColor";

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
}) => {
  const { surface, text } = useModernThemeColor();

  return (
    <View className="mb-6">
      <Text
        className="text-sm font-medium px-4 mb-3 uppercase tracking-wider"
        style={{ color: text.quaternary }}
      >
        {title}
      </Text>
      <View
        className="mx-4 rounded-2xl overflow-hidden"
        style={{ backgroundColor: surface.secondary }}
      >
        {children}
      </View>
    </View>
  );
};