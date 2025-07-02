// components/settings/SettingsItem.tsx
import React from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useModernThemeColor, useAccentColors } from "../../hooks/useThemeColor";

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBackground?: string;
  title: string;
  subtitle?: string;
  value?: string;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  onPress?: () => void;
  isLast?: boolean;
  showChevron?: boolean;
  badge?: number;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  iconColor,
  iconBackground,
  title,
  subtitle,
  value,
  hasSwitch = false,
  switchValue = false,
  onSwitchChange,
  onPress,
  isLast = false,
  showChevron = true,
  badge,
}) => {
  const { text, border, status } = useModernThemeColor();
  const { blue } = useAccentColors();

  // Use provided colors or fall back to theme defaults
  const finalIconColor = iconColor || text.primary;
  const finalIconBackground = iconBackground || blue.main;

  const handlePress = () => {
    if (hasSwitch && onSwitchChange) {
      onSwitchChange(!switchValue);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row items-center p-4"
      style={{
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: border.primary,
      }}
    >
      <View
        className="w-8 h-8 rounded-lg items-center justify-center mr-3"
        style={{ backgroundColor: finalIconBackground }}
      >
        <Ionicons name={icon} size={18} color={finalIconColor} />
      </View>

      <View className="flex-1">
        <View className="flex-row items-center">
          <Text
            className="text-base font-medium"
            style={{ color: text.primary }}
          >
            {title}
          </Text>
          {badge && badge > 0 && (
            <View
              className="ml-2 w-5 h-5 rounded-full items-center justify-center"
              style={{ backgroundColor: status.error.main }}
            >
              <Text
                className="text-xs font-bold"
                style={{ color: text.inverse }}
              >
                {badge > 9 ? "9+" : badge}
              </Text>
            </View>
          )}
        </View>
        {subtitle && (
          <Text
            className="text-sm mt-1"
            style={{ color: text.tertiary }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {hasSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{
            false: border.secondary,
            true: status.success.main,
          }}
          thumbColor={text.inverse}
        />
      ) : (
        <View className="flex-row items-center">
          {value && (
            <Text
              className="text-sm mr-2"
              style={{ color: text.tertiary }}
            >
              {value}
            </Text>
          )}
          {showChevron && (
            <Ionicons
              name="chevron-forward"
              size={16}
              color={text.quaternary}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};