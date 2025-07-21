// components/security/SecurityOptionsSection.tsx
import { useModernTheme } from '@/context/ThemeContext';
import { Key, Shield, Smartphone } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { SecurityOption } from './SecurityOption';

interface SecurityOptionsSectionProps {
  twoFactorEnabled: boolean;
  onToggleTwoFactor: (enabled: boolean) => void;
  onSSHKeysPress: () => void;
  onSecurityLogPress: () => void;
}

export function SecurityOptionsSection({
  twoFactorEnabled,
  onToggleTwoFactor,
  onSSHKeysPress,
  onSecurityLogPress
}: SecurityOptionsSectionProps) {
  const { colors } = useModernTheme();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
        Security Options
      </Text>
      
      <SecurityOption
        icon={Smartphone}
        title="Two-Factor Authentication"
        description="Add an extra layer of security to your account"
        status={twoFactorEnabled ? 
          { type: 'success', text: 'Enabled' } : 
          { type: 'warning', text: 'Not configured' }
        }
        action={twoFactorEnabled ? undefined : "Setup"}
        rightElement={
          <Switch
            value={twoFactorEnabled}
            onValueChange={onToggleTwoFactor}
            trackColor={{ 
              false: colors.interactive.secondary, 
              true: colors.status.success.main 
            }}
            thumbColor={twoFactorEnabled ? colors.text.inverse : colors.text.quaternary}
          />
        }
        onPress={() => onToggleTwoFactor(!twoFactorEnabled)}
      />

      <SecurityOption
        icon={Key}
        title="SSH Keys"
        description="Manage SSH keys for secure Git operations"
        onPress={onSSHKeysPress}
      />

      <SecurityOption
        icon={Shield}
        title="Security Log"
        description="Review recent security activity"
        onPress={onSecurityLogPress}
      />
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
});