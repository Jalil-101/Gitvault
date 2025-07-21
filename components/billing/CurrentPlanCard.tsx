// components/billing/CurrentPlanCard.tsx
import { useModernTheme } from '@/context/ThemeContext';
import { ArrowRight, CreditCard } from 'lucide-react-native';
import React from 'react';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

interface CurrentPlanCardProps {
  planName?: string;
  billingCycle?: 'monthly' | 'yearly';
  nextBilling?: string;
}

export const CurrentPlanCard: React.FC<CurrentPlanCardProps> = ({ 
  planName = 'Pro', 
  billingCycle = 'monthly', 
  nextBilling = 'Aug 25, 2025' 
}) => {
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

  const headerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  };

  const planTitleStyle: TextStyle = {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4
  };

  const billingInfoStyle: TextStyle = {
    color: colors.text.secondary,
    fontSize: 14
  };

  const statusBadgeStyle: ViewStyle = {
    backgroundColor: colors.status.success.light,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16
  };

  const statusTextStyle: TextStyle = {
    color: colors.status.success.text,
    fontWeight: '500',
    fontSize: 12
  };

  const cardStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.surface.secondary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.secondary
  };

  const cardTextStyle: TextStyle = {
    marginLeft: 12,
    color: colors.text.secondary,
    flex: 1,
    fontSize: 14
  };

  return (
    <View style={containerStyle}>
      <View style={headerStyle}>
        <View style={{ flex: 1 }}>
          <Text style={planTitleStyle}>
            Current Plan: {planName}
          </Text>
          <Text style={billingInfoStyle}>
            Billed {billingCycle} • Next billing: {nextBilling}
          </Text>
        </View>
        <View style={statusBadgeStyle}>
          <Text style={statusTextStyle}>
            Active
          </Text>
        </View>
      </View>
      
      <TouchableOpacity style={cardStyle}>
        <CreditCard size={20} color={colors.text.tertiary} />
        <Text style={cardTextStyle}>
          •••• •••• •••• 4242
        </Text>
        <ArrowRight size={16} color={colors.text.tertiary} />
      </TouchableOpacity>
    </View>
  );
};