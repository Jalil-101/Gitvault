// components/billing/UsageOverviewCard.tsx
import { useModernTheme } from '@/context/ThemeContext';
import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { Usage } from './Types';
import { UsageProgressBar } from './UsageProgressBar';

interface UsageOverviewCardProps {
  usage: Usage;
}

export const UsageOverviewCard: React.FC<UsageOverviewCardProps> = ({ usage }) => {
  const { colors, getShadow } = useModernTheme();

  const containerStyle: ViewStyle = {
    backgroundColor: colors.surface.primary,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border.primary,
    ...getShadow('sm')
  };

  const titleStyle: TextStyle = {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16
  };

  const progressContainerStyle: ViewStyle = {
    gap: 16
  };

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>
        Usage Overview
      </Text>
      
      <View style={progressContainerStyle}>
        <UsageProgressBar
          label="Private repositories"
          used={usage.repositories.used}
          limit={usage.repositories.limit}
          showUnlimited={usage.repositories.limit === 'Unlimited'}
        />
        
        <UsageProgressBar
          label="Storage"
          used={usage.storage.used}
          limit={usage.storage.limit}
          unit={usage.storage.unit}
        />
        
        <UsageProgressBar
          label="CI/CD minutes"
          used={usage.minutes.used}
          limit={usage.minutes.limit}
          unit={usage.minutes.unit}
        />
      </View>
    </View>
  );
};