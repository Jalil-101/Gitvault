// components/security/ChangePasswordSection.tsx
import { useModernTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PasswordInput } from './PasswordInput';

interface ChangePasswordSectionProps {
  currentPassword: string;
  newPassword: string;
  showCurrentPassword: boolean;
  showNewPassword: boolean;
  onCurrentPasswordChange: (text: string) => void;
  onNewPasswordChange: (text: string) => void;
  onToggleCurrentPassword: () => void;
  onToggleNewPassword: () => void;
  onUpdatePassword: () => void;
}

export function ChangePasswordSection({
  currentPassword,
  newPassword,
  showCurrentPassword,
  showNewPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onToggleCurrentPassword,
  onToggleNewPassword,
  onUpdatePassword
}: ChangePasswordSectionProps) {
  const { colors } = useModernTheme();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
        Change Password
      </Text>
      <View style={[
        styles.passwordCard,
        {
          backgroundColor: colors.surface.secondary,
          borderColor: colors.border.primary,
        }
      ]}>
        <PasswordInput
          label="Current Password"
          placeholder="Enter current password"
          show={showCurrentPassword}
          onToggleShow={onToggleCurrentPassword}
          value={currentPassword}
          onChangeText={onCurrentPasswordChange}
        />
        <PasswordInput
          label="New Password"
          placeholder="Enter new password"
          show={showNewPassword}
          onToggleShow={onToggleNewPassword}
          value={newPassword}
          onChangeText={onNewPasswordChange}
        />
        <TouchableOpacity 
          style={[
            styles.updateButton,
            { backgroundColor: colors.status.success.main }
          ]}
          activeOpacity={0.8}
          onPress={onUpdatePassword}
        >
          <Text style={[styles.updateButtonText, { color: colors.text.inverse }]}>
            Update Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  passwordCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  updateButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
