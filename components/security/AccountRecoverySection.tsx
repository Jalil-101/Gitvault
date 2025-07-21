// components/security/AccountRecoverySection.tsx
import { useModernTheme } from '@/context/ThemeContext';
import { Shield, Smartphone } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SecurityOption } from './SecurityOption';

interface AccountRecoverySectionProps {
  recoveryEmail: string;
  onUpdateEmail: () => void;
  onAddPhone: () => void;
}

export function AccountRecoverySection({
  recoveryEmail,
  onUpdateEmail,
  onAddPhone
}: AccountRecoverySectionProps) {
  const { colors } = useModernTheme();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
        Account Recovery
      </Text>
      
      <SecurityOption
        icon={Shield}
        title="Recovery Email"
        description={recoveryEmail}
        action="Update"
        status={{ type: 'success', text: 'Verified' }}
        onPress={onUpdateEmail}
      />

      <SecurityOption
        icon={Smartphone}
        title="Recovery Phone"
        description="Phone number for account recovery"
        action="Add"
        onPress={onAddPhone}
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
