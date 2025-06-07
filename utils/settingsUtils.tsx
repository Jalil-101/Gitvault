// utils/settingsUtils.tsx
import React from "react";
import { Switch, Platform } from "react-native";
import { useTheme } from "@/context/ThemeContext";

export const useSettingsSwitch = () => {
  const { colors } = useTheme();

  const renderSwitch = (
    value: boolean,
    onValueChange: (value: boolean) => void
  ) => {
    return (
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: colors.border.default,
          true: colors.accent.emphasis,
        }}
        thumbColor={Platform.OS === "ios" ? undefined : colors.canvas.default}
        ios_backgroundColor={colors.border.default}
      />
    );
  };

  return { renderSwitch };
};

