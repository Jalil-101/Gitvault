// components/EmptyState.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { ModernColors } from '@/constants/Colors';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: string;
  theme?: 'light' | 'dark';
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  theme = 'dark'
}) => {
  const colors = ModernColors[theme];

  return (
    <View className="flex-1 items-center justify-center px-8">
      <Text style={{ fontSize: 48, marginBottom: 16 }}>
        {icon}
      </Text>
      <Text
        style={{
          color: colors.text.primary,
          fontSize: 18,
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: 8
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: colors.text.tertiary,
          fontSize: 14,
          textAlign: 'center',
          lineHeight: 20
        }}
      >
        {description}
      </Text>
    </View>
  );
};

export default EmptyState;