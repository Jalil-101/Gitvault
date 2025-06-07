// components/settings/SettingsHeader.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export const SettingsHeader: React.FC = () => {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View
      className="bg-github-light-canvas-default dark:bg-github-dark-canvas-overlay 
                     border-b border-github-light-border-default dark:border-github-dark-border-default"
    >
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 -ml-2"
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.fg.default} />
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-github-light-fg-default dark:text-github-dark-fg-default">
          Settings
        </Text>

        <View style={{ width: 40 }} />
      </View>
    </View>
  );
};
