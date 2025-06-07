// components/settings/sections/DataPrivacySection.tsx
import React from "react";
import { SettingSection } from "../SettingSection";
import { SettingItem } from "../SettingItem";
import { useTheme } from "@/context/ThemeContext";
import { useSettingsActions } from "@/hooks/useSettingsActions";
import { useSettingsSwitch } from "@/utils/settingsUtils";
import { MaterialIcons } from "@expo/vector-icons";

interface DataPrivacySectionProps {
  analyticsEnabled: boolean;
  setAnalyticsEnabled: (value: boolean) => void;
}

export const DataPrivacySection: React.FC<DataPrivacySectionProps> = ({
  analyticsEnabled,
  setAnalyticsEnabled,
}) => {
  const { colors } = useTheme();
  const { showComingSoon } = useSettingsActions();
  const { renderSwitch } = useSettingsSwitch();

  return (
    <SettingSection title="Data & Privacy">
      <SettingItem
        title="Analytics & Insights"
        subtitle="Help improve the app experience"
        icon={
          <MaterialIcons name="analytics" size={20} color={colors.fg.default} />
        }
        rightElement={renderSwitch(analyticsEnabled, setAnalyticsEnabled)}
      />

      <SettingItem
        title="Data Export"
        subtitle="Download your account data"
        icon={
          <MaterialIcons name="download" size={20} color={colors.fg.default} />
        }
        onPress={() => showComingSoon("Data export")}
        showChevron
        animated
      />
    </SettingSection>
  );
};
