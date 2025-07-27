import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useModernTheme } from "@/context/ThemeContext";

interface ErrorDisplayProps {
  error: string | null;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  const { colors } = useModernTheme();

  if (!error) return null;

  return (
    <View
      style={{
        backgroundColor: colors.status.error.light,
        borderLeftWidth: 4,
        borderLeftColor: colors.status.error.main,
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="alert-circle"
          size={20}
          color={colors.status.error.main}
        />
        <Text
          style={{
            color: colors.status.error.text,
            marginLeft: 8,
            fontSize: 14,
            fontWeight: "500",
          }}
        >
          {error}
        </Text>
      </View>
    </View>
  );
};
