// components/GradientBackground.tsx
import React from "react";
import { View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useModernTheme } from "@/context/ThemeContext";

const { height } = Dimensions.get("window");

export const GradientBackground: React.FC = () => {
  const { gradients, colors } = useModernTheme();

  return (
    <>
      {/* Background Gradient */}
      <LinearGradient
        colors={gradients.primary as [string, string, ...string[]]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: height * 0.4,
        }}
      />

      {/* Decorative Elements */}
      <View
        style={{
          position: "absolute",
          top: 60,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 120,
          left: -30,
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: "rgba(255,255,255,0.05)",
        }}
      />
    </>
  );
};
