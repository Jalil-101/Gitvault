// Main component using all the modular components
// screens/PasswordSecurityScreen.tsx
import { useModernTheme } from '@/context/ThemeContext';
import { useThemeClasses } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// Import all the modular components
import { AccountRecoverySection } from '@/components/security/AccountRecoverySection';
import { ChangePasswordSection } from '@/components/security/ChangePasswordSection';
import { DangerZoneSection } from '@/components/security/DangerZoneSection';
import { SecurityHeader } from '@/components/security/SecurityHeader';
import { SecurityOptionsSection } from '@/components/security/SecurityOptionsSection';

export default function PasswordSecurityScreen() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { colors } = useModernTheme();
  const themeClasses = useThemeClasses();

  const handleBackPress = () => {
    // Handle navigation back
  };

  const handleUpdatePassword = () => {
    // Handle password update logic
  };

  const handleSSHKeysPress = () => {
    // Navigate to SSH keys management
  };

  const handleSecurityLogPress = () => {
    // Navigate to security log
  };

  const handleUpdateEmail = () => {
    // Handle email update
  };

  const handleAddPhone = () => {
    // Handle phone number addition
  };

  const handleDeleteAccount = () => {
    // Handle account deletion confirmation
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <SecurityHeader onBackPress={handleBackPress} />

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ChangePasswordSection
          currentPassword={currentPassword}
          newPassword={newPassword}
          showCurrentPassword={showCurrentPassword}
          showNewPassword={showNewPassword}
          onCurrentPasswordChange={setCurrentPassword}
          onNewPasswordChange={setNewPassword}
          onToggleCurrentPassword={() => setShowCurrentPassword(!showCurrentPassword)}
          onToggleNewPassword={() => setShowNewPassword(!showNewPassword)}
          onUpdatePassword={handleUpdatePassword}
        />

        <SecurityOptionsSection
          twoFactorEnabled={twoFactorEnabled}
          onToggleTwoFactor={setTwoFactorEnabled}
          onSSHKeysPress={handleSSHKeysPress}
          onSecurityLogPress={handleSecurityLogPress}
        />

        <AccountRecoverySection
          recoveryEmail="sarah.chen.dev@gmail.com"
          onUpdateEmail={handleUpdateEmail}
          onAddPhone={handleAddPhone}
        />

        <DangerZoneSection
          onDeleteAccount={handleDeleteAccount}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
});
