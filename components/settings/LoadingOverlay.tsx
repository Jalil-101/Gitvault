// components/settings/LoadingOverlay.tsx
import React from "react";
import { View, Text, Animated } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message = "Loading...",
}) => {
  const { colors } = useTheme();
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      const animation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      );
      animation.start();
      return () => animation.stop();
    }
  }, [visible, rotateAnim]);

  if (!visible) return null;

  return (
    <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center">
      <View
        className="bg-github-light-canvas-default dark:bg-github-dark-canvas-overlay 
                       rounded-lg p-6 items-center"
      >
        <Animated.View
          style={{
            transform: [
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          }}
        >
          <MaterialIcons name="sync" size={32} color={colors.accent.emphasis} />
        </Animated.View>
        <Text
          className="text-github-light-fg-default dark:text-github-dark-fg-default 
                         mt-3 font-medium"
        >
          {message}
        </Text>
      </View>
    </View>
  );
};
