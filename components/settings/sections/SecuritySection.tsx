// components/settings/sections/SecuritySection.tsx
import React from "react";
import { SettingSection } from "../SettingSection";
import { SettingItem } from "../SettingItem";
import { useTheme } from "@/context/ThemeContext";
import { useSettingsActions } from "@/hooks/useSettingsActions";
import { useSettingsSwitch } from "@/utils/settingsUtils";
import { MaterialIcons } from "@expo/vector-icons";

interface SecuritySectionProps {
  biometricEnabled: boolean;
  setBiometricEnabled: (value: boolean) => void;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({
  biometricEnabled,
  setBiometricEnabled,
}) => {
  const { colors } = useTheme();
  const { showComingSoon } = useSettingsActions();
  const { renderSwitch } = useSettingsSwitch();

  return (
    <SettingSection title="Security">
      <SettingItem
        title="Biometric Authentication"
        subtitle="Use fingerprint or face unlock"
        icon={
          <MaterialIcons
            name="fingerprint"
            size={20}
            color={colors.fg.default}
          />
        }
        rightElement={renderSwitch(biometricEnabled, setBiometricEnabled)}
      />

      <SettingItem
        title="Two-Factor Authentication"
        subtitle="Add an extra layer of security"
        icon={
          <MaterialIcons name="security" size={20} color={colors.fg.default} />
        }
        onPress={() => showComingSoon("2FA setup")}
        showChevron
        animated
      />

      <SettingItem
        title="Change Password"
        subtitle="Update your account password"
        icon={<MaterialIcons name="lock" size={20} color={colors.fg.default} />}
        onPress={() => showComingSoon("Password change")}
        showChevron
        animated
      />
    </SettingSection>
  );
};
