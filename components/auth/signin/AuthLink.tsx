// components/ui/AuthLink.tsx
import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useModernTheme } from "@/context/ThemeContext";

interface AuthLinkProps {
  text: string;
  linkText: string;
  onPress: () => void;
}

export const AuthLink: React.FC<AuthLinkProps> = ({
  text,
  linkText,
  onPress,
}) => {
  const { colors } = useModernTheme();
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.96,
      useNativeDriver: true,
      tension: 400,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 400,
      friction: 10,
    }).start();
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          color: colors.text.secondary,
          fontSize: 16,
          fontWeight: "500",
          letterSpacing: 0.2,
        }}
      >
        {text}{" "}
      </Text>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={{
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 8,
          }}
          activeOpacity={0.8}
        >
          <Text
            style={{
              color: colors.interactive.primary,
              fontSize: 16,
              fontWeight: "700",
              letterSpacing: 0.3,
            }}
          >
            {linkText}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
