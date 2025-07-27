// components/FooterLink.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useModernTheme } from "@/context/ThemeContext";

interface FooterLinkProps {
  message: string;
  linkText: string;
  onPress: () => void;
}

export const FooterLink: React.FC<FooterLinkProps> = ({
  message,
  linkText,
  onPress,
}) => {
  const { colors } = useModernTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: colors.text.tertiary,
          fontSize: 15,
          fontWeight: "500",
        }}
      >
        {message}{" "}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={{
            color: colors.interactive.primary,
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          {linkText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
