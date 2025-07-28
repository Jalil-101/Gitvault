// components/SignUpHeader.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export const SignUpHeader: React.FC = () => {
  const { colors, shadows } = useModernTheme();

  return (
    <View
      style={{
        alignItems: "center",
        marginTop: 80,
        marginBottom: 40,
      }}
    >
      {/* Logo/Icon */}
      <View
        style={[
          {
            width: 80,
            height: 80,
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: 40,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          },
          shadows.lg,
        ]}
      >
        <Ionicons name="git-branch" size={40} color={colors.text.inverse} />
      </View>

      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          color: colors.text.inverse,
          textAlign: "center",
          marginBottom: 8,
          textShadowColor: "rgba(0,0,0,0.3)",
          textShadowOffset: { width: 0, height: 2 },
          textShadowRadius: 4,
        }}
      >
        Join Vault
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "rgba(255,255,255,0.9)",
          textAlign: "center",
          fontWeight: "500",
        }}
      >
        Start your coding journey today
      </Text>
    </View>
  );
};
