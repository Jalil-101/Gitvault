// components/profile/AnimatedHeader.tsx
import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { Link, useRouter } from "expo-router";

interface AnimatedHeaderProps {
  username: string;
  headerOpacity: Animated.AnimatedAddition<number>;
}
  const router = useRouter();
export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  username,
  headerOpacity,
}) => {
  const { theme, colors } = useTheme();

  return (
    <Animated.View
      style={{
        opacity: headerOpacity,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
      className="bg-github-light-canvas-default/95 dark:bg-github-dark-canvas-default/95 backdrop-blur-lg border-b border-github-light-border-default/50 dark:border-github-dark-border-default/50"
    >
      <SafeAreaView>
        <View className="flex-row items-center justify-between px-6 py-4">
          <Text className="text-github-light-fg-default dark:text-github-dark-fg-default font-bold text-lg">
            {username}
          </Text>
          <View className="flex-row space-x-4">
            <TouchableOpacity className="p-2">
              <Link href="/screens/SettingsScreen">
                <Ionicons
                  name="settings-outline"
                  size={24}
                  color={
                    theme === "dark" ? colors.fg.default : colors.fg.default
                  }
                />
              </Link>
            </TouchableOpacity>
            <TouchableOpacity className="p-2">
              <Ionicons
                name="ellipsis-horizontal"
                size={24}
                color={theme === "dark" ? colors.fg.default : colors.fg.default}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};
