// components/billing/BillingToggle.tsx
import { useModernTheme } from '@/context/ThemeContext';
import React from 'react';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

interface BillingToggleProps {
  isYearly: boolean;
  onToggle: (isYearly: boolean) => void;
}

export const BillingToggle: React.FC<BillingToggleProps> = ({ isYearly, onToggle }) => {
  const { colors, getShadow } = useModernTheme();

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface.secondary,
    borderRadius: 20,
    padding: 4
  };

  const getButtonStyle = (isActive: boolean): ViewStyle => ({
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: isActive ? colors.surface.primary : 'transparent',
    ...(isActive ? getShadow('sm') : {})
  });

  const getTextStyle = (isActive: boolean): TextStyle => ({
    fontSize: 14,
    color: isActive ? colors.text.primary : colors.text.secondary,
    fontWeight: isActive ? '500' : '400'
  });

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onPress={() => onToggle(false)}
        style={getButtonStyle(!isYearly)}
      >
        <Text style={getTextStyle(!isYearly)}>
          Monthly
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onToggle(true)}
        style={getButtonStyle(isYearly)}
      >
        <Text style={getTextStyle(isYearly)}>
          Yearly
        </Text>
      </TouchableOpacity>
    </View>
  );
};