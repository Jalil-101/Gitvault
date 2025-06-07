// components/profile/ProfileActions.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

export const ProfileActions: React.FC = () => {
  const { theme, colors } = useTheme();

  return (
    <View className="flex-row px-6 pb-6 space-x-3">
      <TouchableOpacity className="flex-1 bg-github-light-accent-emphasis dark:bg-github-dark-accent-emphasis rounded-xl py-3  px-6 shadow-lg ">
        
        <Text className="text-white text-center font-semibold">Follow</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-1 bg-github-light-canvas-overlay dark:bg-github-dark-canvas-overlay border border-github-light-border-default dark:border-github-dark-border-default rounded-xl py-3">
        <Text className="text-github-light-fg-default dark:text-github-dark-fg-default text-center font-semibold">
          Message
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="w-12 h-12 bg-github-light-canvas-overlay dark:bg-github-dark-canvas-overlay border border-github-light-border-default dark:border-github-dark-border-default rounded-xl items-center justify-center">
        <Ionicons
          name="share-outline"
          size={20}
          color={theme === "dark" ? colors.fg.default : colors.fg.default}
        />
      </TouchableOpacity>
    </View>
  );
};
