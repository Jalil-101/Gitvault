// components/settings/SettingItem.tsx
import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface SettingItemProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showChevron?: boolean;
  isDestructive?: boolean;
  animated?: boolean;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  rightElement,
  showChevron = false,
  isDestructive = false,
  animated = false,
}) => {
  const { colors } = useTheme();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (animated) {
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (animated) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="bg-github-light-canvas-default dark:bg-github-dark-canvas-overlay 
                   border-b border-github-light-border-muted dark:border-github-dark-border-muted"
        activeOpacity={0.7}
      >
        <View className="flex-row items-center px-4 py-4">
          <View className="mr-3">{icon}</View>

          <View className="flex-1">
            <Text
              className={`text-base font-medium ${
                isDestructive
                  ? "text-github-light-danger-fg dark:text-github-dark-danger-fg"
                  : "text-github-light-fg-default dark:text-github-dark-fg-default"
              }`}
            >
              {title}
            </Text>
            {subtitle && (
              <Text className="text-sm text-github-light-fg-muted dark:text-github-dark-fg-muted mt-1">
                {subtitle}
              </Text>
            )}
          </View>

          <View className="flex-row items-center">
            {rightElement}
            {showChevron && (
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.fg.muted}
                style={{ marginLeft: 8 }}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
