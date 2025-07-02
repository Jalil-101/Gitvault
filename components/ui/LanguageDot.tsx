// components/ui/LanguageDot.tsx
import React from 'react';
import { View } from 'react-native';
import { useModernTheme } from '@/context/ThemeContext';
import { getLanguageColor } from '../../utils/languageColors';

interface LanguageDotProps {
  language: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LanguageDot: React.FC<LanguageDotProps> = ({ 
  language, 
  size = 'md' 
}) => {
  const { colors, shadows } = useModernTheme();

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          width: 8,
          height: 8,
          marginRight: 4,
        };
      case 'lg':
        return {
          width: 16,
          height: 16,
          marginRight: 8,
        };
      default:
        return {
          width: 12,
          height: 12,
          marginRight: 6,
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const languageColor = getLanguageColor(language);

  return (
    <View
      style={[
        {
          borderRadius: sizeStyles.width / 2, // Make it circular
          backgroundColor: languageColor,
          borderWidth: 1,
          borderColor: colors.border.primary,
          ...sizeStyles,
        },
        shadows.sm,
      ]}
    />
  );
};