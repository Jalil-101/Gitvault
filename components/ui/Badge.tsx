// components/ui/Badge.tsx
import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { useModernTheme } from '@/context/ThemeContext';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default',
  size = 'md'
}) => {
  const { colors, shadows } = useModernTheme();

  const getVariantStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case 'secondary':
        return {
          container: {
            backgroundColor: colors.surface.secondary,
            borderColor: colors.border.secondary,
          },
          text: {
            color: colors.text.secondary,
          },
        };
      case 'success':
        return {
          container: {
            backgroundColor: colors.status.success.light,
            borderColor: colors.status.success.main,
          },
          text: {
            color: colors.status.success.text,
          },
        };
      case 'warning':
        return {
          container: {
            backgroundColor: colors.status.warning.light,
            borderColor: colors.status.warning.main,
          },
          text: {
            color: colors.status.warning.text,
          },
        };
      case 'error':
        return {
          container: {
            backgroundColor: colors.status.error.light,
            borderColor: colors.status.error.main,
          },
          text: {
            color: colors.status.error.text,
          },
        };
      case 'info':
        return {
          container: {
            backgroundColor: colors.status.info.light,
            borderColor: colors.status.info.main,
          },
          text: {
            color: colors.status.info.text,
          },
        };
      default:
        return {
          container: {
            backgroundColor: colors.accents.blue.light,
            borderColor: colors.border.primary,
          },
          text: {
            color: colors.text.primary,
          },
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingHorizontal: 6,
          paddingVertical: 2,
          fontSize: 10,
        };
      case 'lg':
        return {
          paddingHorizontal: 12,
          paddingVertical: 6,
          fontSize: 14,
        };
      default:
        return {
          paddingHorizontal: 8,
          paddingVertical: 4,
          fontSize: 12,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <View
      style={[
        {
          borderRadius: 9999, // Full rounded
          borderWidth: 1,
          alignSelf: 'flex-start',
          ...sizeStyles,
        },
        variantStyles.container,
        shadows.sm,
      ]}
    >
      <Text
        style={[
          {
            fontSize: sizeStyles.fontSize,
            fontWeight: '500',
            textAlign: 'center',
          },
          variantStyles.text,
        ]}
      >
        {children}
      </Text>
    </View>
  );
};