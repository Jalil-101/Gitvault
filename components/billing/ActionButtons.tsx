// components/billing/ActionButtons.tsx
import { useModernTheme } from '@/context/ThemeContext';
import React from 'react';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

interface ActionButtonsProps {
  selectedPlan: string;
  currentPlan?: string;
  onUpgrade?: () => void;
  onViewHistory?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  selectedPlan, 
  currentPlan = 'pro',
  onUpgrade,
  onViewHistory
}) => {
  const { colors, getShadow } = useModernTheme();

  const isCurrentPlan = selectedPlan === currentPlan;

  const containerStyle: ViewStyle = {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
    gap: 12
  };

  const primaryButtonStyle: ViewStyle = {
    backgroundColor: colors.interactive.primary,
    paddingVertical: 16,
    borderRadius: 8,
    ...getShadow('md')
  };

  const primaryButtonTextStyle: TextStyle = {
    color: colors.text.inverse,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16
  };

  const secondaryButtonStyle: ViewStyle = {
    borderWidth: 1,
    borderColor: colors.border.primary,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: colors.surface.primary
  };

  const secondaryButtonTextStyle: TextStyle = {
    color: colors.text.secondary,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16
  };

  return (
    <View style={containerStyle}>
      <TouchableOpacity 
        style={primaryButtonStyle}
        onPress={onUpgrade}
      >
        <Text style={primaryButtonTextStyle}>
          {isCurrentPlan ? 'Current Plan' : 'Upgrade Plan'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={secondaryButtonStyle}
        onPress={onViewHistory}
      >
        <Text style={secondaryButtonTextStyle}>
          View Billing History
        </Text>
      </TouchableOpacity>
    </View>
  );
};