// components/billing/BillingHeader.tsx
import { useModernTheme } from '@/context/ThemeContext';
import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

export const BillingHeader: React.FC = () => {
  const { colors, getShadow } = useModernTheme();

  const containerStyle: ViewStyle = {
    backgroundColor: colors.surface.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
    ...getShadow('sm')
  };

  const titleStyle: TextStyle = {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4
  };

  const subtitleStyle: TextStyle = {
    color: colors.text.secondary,
    fontSize: 16
  };

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>
        Billing & Plans
      </Text>
      <Text style={subtitleStyle}>
        Manage your subscription and usage
      </Text>
    </View>
  );
};

