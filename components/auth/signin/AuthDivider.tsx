// components/ui/AuthDivider.tsx
import React from "react";
import { View, Text } from "react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

interface AuthDividerProps {
  text?: string;
  variant?: "default" | "glass";
}

export const AuthDivider: React.FC<AuthDividerProps> = ({
  text = "or",
  variant = "default",
}) => {
  const { colors, glass, gradients } = useModernTheme();

  if (variant === "glass") {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 32,
        }}
      >
        <LinearGradient
          colors={[
            colors.border.tertiary,
            colors.border.primary,
            colors.border.tertiary,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flex: 1,
            height: 1,
          }}
        />
        <View
          style={{
            backgroundColor: glass.light.backgroundColor,
            borderColor: glass.light.borderColor,
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 20,
            paddingVertical: 8,
            marginHorizontal: 16,
          }}
        >
          <Text
            style={{
              color: colors.text.tertiary,
              fontSize: 14,
              fontWeight: "600",
              letterSpacing: 0.5,
              textTransform: "uppercase",
            }}
          >
            {text}
          </Text>
        </View>
        <LinearGradient
          colors={[
            colors.border.tertiary,
            colors.border.primary,
            colors.border.tertiary,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flex: 1,
            height: 1,
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 28,
      }}
    >
      <View
        style={{
          flex: 1,
          height: 1.5,
          backgroundColor: colors.border.primary,
          borderRadius: 1,
        }}
      />
      <View
        style={{
          backgroundColor: colors.surface.secondary,
          borderRadius: 16,
          paddingHorizontal: 18,
          paddingVertical: 6,
          marginHorizontal: 16,
          borderWidth: 1,
          borderColor: colors.border.tertiary,
        }}
      >
        <Text
          style={{
            color: colors.text.quaternary,
            fontSize: 14,
            fontWeight: "600",
            letterSpacing: 0.3,
          }}
        >
          {text}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          height: 1.5,
          backgroundColor: colors.border.primary,
          borderRadius: 1,
        }}
      />
    </View>
  );
};
