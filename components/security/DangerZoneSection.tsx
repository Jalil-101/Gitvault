// components/security/DangerZoneSection.tsx
import { useModernTheme } from '@/context/ThemeContext';
import { ChevronRight } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DangerZoneSectionProps {
  onDeleteAccount: () => void;
}

export function DangerZoneSection({ onDeleteAccount }: DangerZoneSectionProps) {
  const { colors } = useModernTheme();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.status.error.main }]}>
        Danger Zone
      </Text>
      <View style={[
        styles.dangerZone,
        {
          borderColor: colors.status.error.main,
          backgroundColor: colors.status.error.light,
        }
      ]}>
        <TouchableOpacity 
          style={styles.dangerOption}
          activeOpacity={0.7}
          onPress={onDeleteAccount}
        >
          <View>
            <Text style={[styles.dangerTitle, { color: colors.text.primary }]}>
              Delete Account
            </Text>
            <Text style={[styles.dangerDescription, { color: colors.text.secondary }]}>
              Permanently delete your account and all data
            </Text>
          </View>
          <ChevronRight size={20} color={colors.status.error.main} />
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
  dangerZone: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  dangerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  dangerDescription: {
    fontSize: 14,
    marginTop: 4,
  },
});