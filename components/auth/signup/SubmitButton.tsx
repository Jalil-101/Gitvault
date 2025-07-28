// components/SubmitButton.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface SubmitButtonProps {
  onPress: () => void;
  loading: boolean;
  title: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "left" | "right";
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onPress,
  loading,
  title,
  disabled = false,
  variant = "primary",
  icon,
  iconPosition = "right",
}) => {
  const { colors, shadows } = useModernTheme();

  const getButtonStyles = () => {
    const isDisabled = loading || disabled;

    switch (variant) {
      case "primary":
        return {
          backgroundColor: isDisabled
            ? colors.text.quaternary
            : colors.interactive.primary,
          borderRadius: 12,
          paddingVertical: 16,
          marginBottom: 20,
          ...(!isDisabled && shadows.lg), // Apply shadow only when not disabled
        };
      case "secondary":
        return {
          backgroundColor: colors.surface.secondary,
          borderWidth: 2,
          borderColor: colors.border.primary,
          borderRadius: 12,
          paddingVertical: 16,
          marginBottom: 20,
          ...shadows.md,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderRadius: 12,
          paddingVertical: 16,
          marginBottom: 20,
        };
      default:
        return {};
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "primary":
        return colors.text.inverse;
      case "secondary":
        return colors.text.primary;
      case "ghost":
        return colors.interactive.primary;
      default:
        return colors.text.primary;
    }
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator color={getTextColor()} size="small" />;
    }

    const textElement = (
      <Text
        style={{
          color: getTextColor(),
          textAlign: "center",
          fontSize: 18,
          fontWeight: "bold",
          marginHorizontal: icon ? 8 : 0,
        }}
      >
        {title}
      </Text>
    );

    const iconElement = icon ? (
      <Ionicons name={icon} size={20} color={getTextColor()} />
    ) : null;

    if (!icon) return textElement;

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {iconPosition === "left" && iconElement}
        {textElement}
        {iconPosition === "right" && iconElement}
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disabled}
      style={getButtonStyles()}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};
