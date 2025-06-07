// components/settings/sections/NotificationsSection.tsx
import React from "react";
import { SettingSection } from "../SettingSection";
import { SettingItem } from "../SettingItem";
import { useTheme } from "@/context/ThemeContext";
import { useSettingsActions } from "@/hooks/useSettingsActions";
import { useSettingsSwitch } from "@/utils/settingsUtils";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface NotificationsSectionProps {
  notificationsEnabled: boolean;
  setNotificationsEnabled: (value: boolean) => void;
}

export const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  notificationsEnabled,
  setNotificationsEnabled,
}) => {
  const { colors } = useTheme();
  const { showComingSoon } = useSettingsActions();
  const { renderSwitch } = useSettingsSwitch();

  return (
    <SettingSection title="Notifications">
      <SettingItem
        title="Push Notifications"
        subtitle="Receive notifications about activity"
        icon={
          <Ionicons name="notifications" size={20} color={colors.fg.default} />
        }
        rightElement={renderSwitch(
          notificationsEnabled,
          setNotificationsEnabled
        )}
      />

      <SettingItem
        title="Email Notifications"
        subtitle="Configure email notification preferences"
        icon={
          <MaterialIcons name="email" size={20} color={colors.fg.default} />
        }
        onPress={() => showComingSoon("Email notification settings")}
        showChevron
        animated
      />
    </SettingSection>
  );
};
