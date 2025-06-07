// components/settings/sections/SupportSection.tsx
import React from "react";
import { SettingSection } from "../SettingSection";
import { SettingItem } from "../SettingItem";
import { useTheme } from "@/context/ThemeContext";
import { useSettingsActions } from "@/hooks/useSettingsActions";
import { MaterialIcons } from "@expo/vector-icons";

export const SupportSection: React.FC = () => {
  const { colors } = useTheme();
  const { showHelp, showFeedback, showAbout } = useSettingsActions();

  return (
    <SettingSection title="Support">
      <SettingItem
        title="Help Center"
        subtitle="Get help and find answers"
        icon={<MaterialIcons name="help" size={20} color={colors.fg.default} />}
        onPress={showHelp}
        showChevron
        animated
      />

      <SettingItem
        title="Send Feedback"
        subtitle="Help us improve the app"
        icon={
          <MaterialIcons name="feedback" size={20} color={colors.fg.default} />
        }
        onPress={showFeedback}
        showChevron
        animated
      />

      <SettingItem
        title="About"
        subtitle="App version and information"
        icon={<MaterialIcons name="info" size={20} color={colors.fg.default} />}
        onPress={showAbout}
        showChevron
        animated
      />
    </SettingSection>
  );
};
