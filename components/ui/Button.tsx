// components/ui/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { useModernTheme } from '@/context/ThemeContext';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'default',
  size = 'md',
  disabled = false,
  fullWidth = false,
}) => {
  const { colors, shadows } = useModernTheme();

  const getVariantStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case 'primary':
        return {
          container: {
            backgroundColor: colors.interactive.primary,
            borderColor: colors.interactive.primary,
          },
          text: {
            color: colors.text.inverse,
          },
        };
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
      case 'ghost':
        return {
          container: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          },
          text: {
            color: colors.interactive.primary,
          },
        };
      case 'success':
        return {
          container: {
            backgroundColor: colors.status.success.main,
            borderColor: colors.status.success.main,
          },
          text: {
            color: colors.text.inverse,
          },
        };
      case 'warning':
        return {
          container: {
            backgroundColor: colors.status.warning.main,
            borderColor: colors.status.warning.main,
          },
          text: {
            color: colors.text.inverse,
          },
        };
      case 'error':
        return {
          container: {
            backgroundColor: colors.status.error.main,
            borderColor: colors.status.error.main,
          },
          text: {
            color: colors.text.inverse,
          },
        };
      default:
        return {
          container: {
            backgroundColor: colors.surface.primary,
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
          paddingHorizontal: 12,
          paddingVertical: 6,
          fontSize: 12,
          borderRadius: 4,
        };
      case 'lg':
        return {
          paddingHorizontal: 24,
          paddingVertical: 12,
          fontSize: 16,
          borderRadius: 8,
        };
      default:
        return {
          paddingHorizontal: 16,
          paddingVertical: 8,
          fontSize: 14,
          borderRadius: 6,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      style={[
        {
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          ...sizeStyles,
          ...(fullWidth && { width: '100%' }),
          ...(disabled && { opacity: 0.5 }),
        },
        variantStyles.container,
        !disabled && variant !== 'ghost' && shadows.sm,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.8}
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
    </TouchableOpacity>
  );
};