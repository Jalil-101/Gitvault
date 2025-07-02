// components/ui/StatCard.tsx
import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { useModernTheme } from '@/context/ThemeContext';

interface StatCardProps {
  value: number | string;
  label: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  value, 
  label, 
  variant = 'default',
  size = 'md',
  style 
}) => {
  const { colors, shadows } = useModernTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.accents.blue.light,
          borderColor: colors.accents.blue.main,
          valueColor: colors.accents.blue.main,
        };
      case 'success':
        return {
          backgroundColor: colors.status.success.light,
          borderColor: colors.status.success.main,
          valueColor: colors.status.success.main,
        };
      case 'warning':
        return {
          backgroundColor: colors.status.warning.light,
          borderColor: colors.status.warning.main,
          valueColor: colors.status.warning.main,
        };
      case 'error':
        return {
          backgroundColor: colors.status.error.light,
          borderColor: colors.status.error.main,
          valueColor: colors.status.error.main,
        };
      case 'info':
        return {
          backgroundColor: colors.status.info.light,
          borderColor: colors.status.info.main,
          valueColor: colors.status.info.main,
        };
      default:
        return {
          backgroundColor: colors.surface.primary,
          borderColor: colors.border.primary,
          valueColor: colors.text.primary,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: 12,
          borderRadius: 6,
          valueFontSize: 16,
          labelFontSize: 10,
          gap: 2,
        };
      case 'lg':
        return {
          padding: 20,
          borderRadius: 12,
          valueFontSize: 28,
          labelFontSize: 14,
          gap: 6,
        };
      default:
        return {
          padding: 16,
          borderRadius: 8,
          valueFontSize: 20,
          labelFontSize: 12,
          gap: 4,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          backgroundColor: variantStyles.backgroundColor,
          borderColor: variantStyles.borderColor,
          padding: sizeStyles.padding,
          borderRadius: sizeStyles.borderRadius,
          gap: sizeStyles.gap,
        },
        shadows.sm,
        style,
      ]}
    >
      <Text
        style={{
          fontSize: sizeStyles.valueFontSize,
          fontWeight: '700',
          color: variantStyles.valueColor,
          textAlign: 'center',
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontSize: sizeStyles.labelFontSize,
          fontWeight: '500',
          color: colors.text.tertiary,
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        {label}
      </Text>
    </View>
  );
};