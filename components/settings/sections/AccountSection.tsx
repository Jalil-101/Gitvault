// components/settings/sections/AccountSection.tsx
import React from "react";
import { SettingSection } from "../SettingSection";
import { SettingItem } from "../SettingItem";
import { useTheme } from "@/context/ThemeContext";
import { useSettingsActions } from "@/hooks/useSettingsActions";
import { MaterialIcons } from "@expo/vector-icons";

export const AccountSection: React.FC = () => {
  const { colors } = useTheme();
  const { handleSignOut, handleDeleteAccount } = useSettingsActions();

  return (
    <SettingSection title="Account">
      <SettingItem
        title="Sign Out"
        subtitle="Sign out of your account"
        icon={
          <MaterialIcons name="logout" size={20} color={colors.danger.fg} />
        }
        onPress={handleSignOut}
        isDestructive
        animated
      />

      <SettingItem
        title="Delete Account"
        subtitle="Permanently delete your account"
        icon={
          <MaterialIcons
            name="delete-forever"
            size={20}
            color={colors.danger.fg}
          />
        }
        onPress={handleDeleteAccount}
        isDestructive
        animated
      />
    </SettingSection>
  );
};
