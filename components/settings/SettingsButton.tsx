// components/settings/SettingsButton.tsx
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useModernThemeColor } from "@/hooks/useThemeColor";

interface SettingsButtonProps {
  title: string;
  subtitle?: string;
  variant?: "primary" | "secondary" | "danger";
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({
  title,
  subtitle,
  variant = "primary",
  icon,
  onPress,
  disabled = false,
  loading = false,
}) => {
  const { colors } = useModernThemeColor();

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          background: "bg-modern-dark-interactive-primary",
          text: "text-modern-dark-text-inverse",
        };
      case "secondary":
        return {
          background: "bg-modern-dark-surface-tertiary",
          text: "text-modern-dark-text-primary",
        };
      case "danger":
        return {
          background: "bg-modern-dark-error-main",
          text: "text-modern-dark-text-inverse",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`mx-4 mb-4 p-4 rounded-2xl ${styles.background} ${
        disabled ? "opacity-50" : ""
      }`}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center justify-center">
        {loading ? (
          <View className="w-5 h-5 mr-2">
            {/* Add your loading spinner component here */}
            <Text className={`text-sm ${styles.text}`}>Loading...</Text>
          </View>
        ) : (
          icon && (
            <Ionicons
              name={icon}
              size={20}
              color={
                variant === "secondary"
                  ? colors.text.primary
                  : colors.text.inverse
              }
              style={{ marginRight: 8 }}
            />
          )
        )}

        <View className="flex-1 items-center">
          <Text className={`text-base font-semibold ${styles.text}`}>
            {title}
          </Text>
          {subtitle && (
            <Text className={`text-sm ${styles.text} opacity-80 mt-1`}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
