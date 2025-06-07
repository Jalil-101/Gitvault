import React, { useEffect } from "react";
import { View, Animated, Easing } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

export const LoadingSpinner: React.FC = () => {
  const { isDarkTheme } = useTheme();
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => spin());
    };
    spin();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="flex-1 justify-center items-center py-20">
      <View className="relative">
        {/* Outer rotating ring */}
        <Animated.View
          style={{ transform: [{ rotate: spin }] }}
          className="w-12 h-12 rounded-full border-2 border-transparent"
        >
          <LinearGradient
            colors={
              isDarkTheme
                ? ["#2f81f7", "#3fb950", "#d29922", "#2f81f7"]
                : ["#0969da", "#1a7f37", "#9a6700", "#0969da"]
            }
            className="w-full h-full rounded-full"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>

        {/* Inner circle */}
        <View className="absolute inset-2 rounded-full bg-github-light-canvas-default dark:bg-github-dark-canvas-default" />

        {/* Center dot */}
        <View className="absolute inset-0 justify-center items-center">
          <View className="w-2 h-2 rounded-full bg-github-light-accent-fg dark:bg-github-dark-accent-fg" />
        </View>
      </View>

      {/* Loading text with subtle animation */}
      <Animated.Text
        className="text-sm text-github-light-fg-muted dark:text-github-dark-fg-muted mt-4"
        style={{
          opacity: spinValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.5, 1, 0.5],
          }),
        }}
      >
        Loading amazing content...
      </Animated.Text>
    </View>
  );
};
