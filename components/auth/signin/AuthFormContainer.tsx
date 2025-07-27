// components/auth/AuthFormContainer.tsx
import React from "react";
import { View } from "react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

interface AuthFormContainerProps {
  children: React.ReactNode;
  variant?: "default" | "glass" | "gradient";
}

export const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  children,
  variant = "default",
}) => {
  const { colors, shadows, glass } = useModernTheme();

  const getContainerStyle = () => {
    const baseStyle = {
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      paddingHorizontal: 32,
      paddingTop: 44,
      paddingBottom: 44,
      flex: 1,
      ...shadows.xl,
    };

    switch (variant) {
      case "glass":
        return {
          ...baseStyle,
          backgroundColor: glass.strong.backgroundColor,
          borderWidth: 1,
          borderColor: glass.strong.borderColor,
          borderTopWidth: 1,
        };
      case "gradient":
        return baseStyle;
      default:
        return {
          ...baseStyle,
          backgroundColor: colors.surface.primary,
        };
    }
  };

  // Handle gradient variant separately for type safety
  if (variant === "gradient") {
    return (
      <LinearGradient
        colors={[colors.surface.primary, colors.surface.secondary] as const}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={getContainerStyle()}
      >
        <View style={{ flex: 1 }}>{children}</View>
      </LinearGradient>
    );
  }

  // Handle default and glass variants
  return (
    <View style={getContainerStyle()}>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
};
