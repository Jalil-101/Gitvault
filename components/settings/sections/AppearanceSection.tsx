// components/settings/sections/AppearanceSection.tsx
import React from "react";
import { SettingSection } from "../SettingSection";
import { SettingItem } from "../SettingItem";
import { useTheme } from "@/context/ThemeContext";
import { useSettingsActions } from "@/hooks/useSettingsActions";
import { useSettingsSwitch } from "@/utils/settingsUtils";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export const AppearanceSection: React.FC = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const { showComingSoon } = useSettingsActions();
  const { renderSwitch } = useSettingsSwitch();

  return (
    <SettingSection title="Appearance">
      <SettingItem
        title="Dark Mode"
        subtitle={`Currently using ${
          theme === "dark" ? "dark" : "light"
        } theme`}
        icon={
          <Ionicons
            name={theme === "dark" ? "moon" : "sunny"}
            size={20}
            color={colors.fg.default}
          />
        }
        rightElement={renderSwitch(theme === "dark", toggleTheme)}
        animated
      />

      <SettingItem
        title="Font Size"
        subtitle="Adjust text size for better readability"
        icon={
          <MaterialIcons
            name="text-fields"
            size={20}
            color={colors.fg.default}
          />
        }
        onPress={() => showComingSoon("Font size adjustment")}
        showChevron
        animated
      />
    </SettingSection>
  );
};
