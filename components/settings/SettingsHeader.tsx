// components/settings/SettingsHeader.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useModernThemeColor } from "../../hooks/useThemeColor";

interface SettingsHeaderProps {
  onBack?: () => void;
  title?: string;
  showNotifications?: boolean;
  onNotificationsPress?: () => void;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  onBack,
  title = "Settings",
  showNotifications = true,
  onNotificationsPress,
}) => {
  const { background, surface, text } = useModernThemeColor();

  return (
    <View
      className="flex-row items-center justify-between px-4 py-3"
      style={{ backgroundColor: background.primary }}
    >
      {onBack ? (
        <TouchableOpacity
          onPress={onBack}
          className="w-10 h-10 rounded-xl items-center justify-center"
          style={{ backgroundColor: surface.secondary }}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={text.primary}
          />
        </TouchableOpacity>
      ) : (
        <View className="w-10" />
      )}

      <Text
        className="text-xl font-semibold"
        style={{ color: text.primary }}
      >
        {title}
      </Text>

      {showNotifications ? (
        <TouchableOpacity
          onPress={onNotificationsPress}
          className="w-10 h-10 rounded-xl items-center justify-center"
          style={{ backgroundColor: surface.secondary }}
        >
          <Ionicons
            name="notifications-outline"
            size={20}
            color={text.primary}
          />
        </TouchableOpacity>
      ) : (
        <View className="w-10" />
      )}
    </View>
  );
};