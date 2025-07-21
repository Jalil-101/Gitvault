// components/security/SecurityHeader.tsx
import { useModernTheme } from '@/context/ThemeContext';
import { ArrowLeft, Shield } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SecurityHeaderProps {
  onBackPress?: () => void;
}

export function SecurityHeader({ onBackPress }: SecurityHeaderProps) {
  const { colors } = useModernTheme();

  return (
    <View style={[
      styles.header,
      {
        backgroundColor: colors.surface.secondary,
        borderBottomColor: colors.border.primary,
      }
    ]}>
      <View style={styles.headerContent}>
        <TouchableOpacity 
          style={styles.backButton} 
          activeOpacity={0.7}
          onPress={onBackPress}
        >
          <ArrowLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Shield size={24} color={colors.accents.blue.main} />
          <Text style={[styles.headerTitleText, { color: colors.text.primary }]}>
            Password & Security
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingTop: 48,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
});