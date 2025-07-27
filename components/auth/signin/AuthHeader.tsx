// components/auth/AuthHeader.tsx
import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useModernTheme } from "@/context/ThemeContext";

const { height } = Dimensions.get("window");

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  iconName?: keyof typeof Ionicons.glyphMap;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
  iconName = "log-in",
}) => {
  const { gradients, colors } = useModernTheme();

  return (
    <>
      {/* Background Gradient - Using theme gradients */}
      <LinearGradient
        colors={gradients.primary as [string, string, ...string[]]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: height * 0.45,
        }}
      />

      {/* Decorative Elements */}
      <View
        style={{
          position: "absolute",
          top: 40,
          right: -60,
          width: 240,
          height: 240,
          borderRadius: 120,
          backgroundColor: "rgba(255,255,255,0.08)",
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 140,
          left: -40,
          width: 160,
          height: 160,
          borderRadius: 80,
          backgroundColor: "rgba(255,255,255,0.05)",
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 200,
          right: 30,
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: "rgba(255,255,255,0.03)",
        }}
      />

      {/* Header Content */}
      <View
        style={{
          alignItems: "center",
          marginTop: 100,
          marginBottom: 50,
        }}
      >
        {/* Logo/Icon */}
        <View
          style={{
            width: 90,
            height: 90,
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: 45,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 24,
            shadowColor: colors.shadow.lg,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 10,
          }}
        >
          <Ionicons name={iconName} size={45} color={colors.text.inverse} />
        </View>

        <Text
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: colors.text.inverse,
            textAlign: "center",
            marginBottom: 8,
            textShadowColor: "rgba(0,0,0,0.3)",
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 6,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.9)",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          {subtitle}
        </Text>
      </View>
    </>
  );
};
