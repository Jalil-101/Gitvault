// components/billing/UsageProgressBar.tsx
import { useModernTheme } from '@/context/ThemeContext';
import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

interface UsageProgressBarProps {
  label: string;
  used: number;
  limit: number | 'Unlimited';
  unit?: string;
  showUnlimited?: boolean;
}

export const UsageProgressBar: React.FC<UsageProgressBarProps> = ({ 
  label, 
  used, 
  limit, 
  unit = '', 
  showUnlimited = false 
}) => {
  const { colors } = useModernTheme();

  const getProgressWidth = (): string => {
    if (showUnlimited || limit === 'Unlimited') return '25%';
    const percentage = Math.min((used / (limit as number)) * 100, 100);
    return `${percentage}%`;
  };

  const getProgressColor = (): string => {
    if (showUnlimited || limit === 'Unlimited') return colors.accents.blue.main;
    const percentage = (used / (limit as number)) * 100;
    if (percentage >= 80) return colors.status.error.main;
    if (percentage >= 60) return colors.status.warning.main;
    return colors.status.success.main;
  };

  const formatValue = (value: number): string => {
    if (value >= 1000) {
      return value.toLocaleString();
    }
    return value.toString();
  };

  const headerStyle: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  };

  const labelStyle: TextStyle = {
    color: colors.text.secondary,
    fontSize: 14
  };

  const valueStyle: TextStyle = {
    color: colors.text.primary,
    fontWeight: '500',
    fontSize: 14
  };

  const progressContainerStyle: ViewStyle = {
    height: 8,
    backgroundColor: colors.surface.secondary,
    borderRadius: 4,
    overflow: 'hidden'
  };

  const progressBarStyle: ViewStyle = {
    height: 8,
    backgroundColor: getProgressColor(),
    borderRadius: 4,
    width: getProgressWidth()
  };

  const getDisplayValue = (): string => {
    if (showUnlimited || limit === 'Unlimited') {
      return formatValue(used);
    }
    return `${formatValue(used)} / ${formatValue(limit as number)} ${unit}`.trim();
  };

  return (
    <View>
      <View style={headerStyle}>
        <Text style={labelStyle}>
          {label}
        </Text>
        <Text style={valueStyle}>
          {getDisplayValue()}
        </Text>
      </View>
      <View style={progressContainerStyle}>
        <View style={progressBarStyle} />
      </View>
    </View>
  );
};
