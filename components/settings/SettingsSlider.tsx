// components/settings/SettingsSlider.tsx
import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { useModernThemeColor } from "@/hooks/useThemeColor";

interface SettingsSliderProps {
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBackground?: string;
  title: string;
  subtitle?: string;
  value: number;
  minimumValue: number;
  maximumValue: number;
  step?: number;
  onValueChange: (value: number) => void;
  formatValue?: (value: number) => string;
  isLast?: boolean;
}

export const SettingsSlider: React.FC<SettingsSliderProps> = ({
  icon,
  iconColor,
  iconBackground,
  title,
  subtitle,
  value,
  minimumValue,
  maximumValue,
  step = 1,
  onValueChange,
  formatValue,
  isLast = false,
}) => {
  const { colors } = useModernThemeColor();

  return (
    <View
      className={`p-4 ${
        !isLast ? "border-b border-modern-dark-border-primary" : ""
      }`}
    >
      <View className="flex-row items-center mb-3">
        {icon && (
          <View
            className="w-8 h-8 rounded-lg items-center justify-center mr-3"
            style={{
              backgroundColor: iconBackground || colors.accents.blue.main,
            }}
          >
            <Ionicons
              name={icon}
              size={18}
              color={iconColor || colors.text.inverse}
            />
          </View>
        )}

        <View className="flex-1">
          <Text className="text-base font-medium text-modern-dark-text-primary">
            {title}
          </Text>
          {subtitle && (
            <Text className="text-sm text-modern-dark-text-tertiary">
              {subtitle}
            </Text>
          )}
        </View>

        <Text className="text-sm font-medium text-modern-dark-text-secondary">
          {formatValue ? formatValue(value) : value.toString()}
        </Text>
      </View>

      <Slider
        value={value}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        onValueChange={onValueChange}
        minimumTrackTintColor={colors.accents.blue.main}
        maximumTrackTintColor={colors.surface.tertiary}
      />

      <View className="flex-row justify-between mt-1">
        <Text className="text-xs text-modern-dark-text-quaternary">
          {formatValue ? formatValue(minimumValue) : minimumValue}
        </Text>
        <Text className="text-xs text-modern-dark-text-quaternary">
          {formatValue ? formatValue(maximumValue) : maximumValue}
        </Text>
      </View>
    </View>
  );
};
