// components/settings/sections/ProfileSection.tsx
import React from "react";
import { SettingSection } from "../SettingSection";
import { SettingItem } from "../SettingItem";
import { useTheme } from "@/context/ThemeContext";
import { useSettingsActions } from "@/hooks/useSettingsActions";
import { useSettingsSwitch } from "@/utils/settingsUtils";
import { Feather, MaterialIcons } from "@expo/vector-icons";

interface ProfileSectionProps {
  privateProfileEnabled: boolean;
  setPrivateProfileEnabled: (value: boolean) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  privateProfileEnabled,
  setPrivateProfileEnabled,
}) => {
  const { colors } = useTheme();
  const { showComingSoon } = useSettingsActions();
  const { renderSwitch } = useSettingsSwitch();

  return (
    <SettingSection title="Profile">
      <SettingItem
        title="Edit Profile"
        subtitle="Update your profile information"
        icon={<Feather name="user" size={20} color={colors.fg.default} />}
        onPress={() => showComingSoon("Profile editing")}
        showChevron
        animated
      />

      <SettingItem
        title="Privacy Settings"
        subtitle="Control your privacy preferences"
        icon={
          <MaterialIcons
            name="privacy-tip"
            size={20}
            color={colors.fg.default}
          />
        }
        rightElement={renderSwitch(
          privateProfileEnabled,
          setPrivateProfileEnabled
        )}
      />
    </SettingSection>
  );
};
