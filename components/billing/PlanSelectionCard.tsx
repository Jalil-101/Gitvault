// components/billing/PlanSelectionCard.tsx
import { useModernTheme } from '@/context/ThemeContext';
import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { Plan } from '../../types/billing';
import { BillingToggle } from './BillingToggle';
import { PlanCard } from './PlanCard';

interface PlanSelectionCardProps {
  plans: Plan[];
  selectedPlan: string;
  onPlanSelect: (planId: string) => void;
  isYearly: boolean;
  onBillingToggle: (isYearly: boolean) => void;
}

export const PlanSelectionCard: React.FC<PlanSelectionCardProps> = ({ 
  plans, 
  selectedPlan, 
  onPlanSelect, 
  isYearly, 
  onBillingToggle 
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
    marginBottom: 16
  };

  const titleStyle: TextStyle = {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary
  };

  const savingsBannerStyle: ViewStyle = {
    backgroundColor: colors.status.success.light,
    borderWidth: 1,
    borderColor: colors.status.success.main + '40',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
  };

  const savingsTextStyle: TextStyle = {
    color: colors.status.success.text,
    fontWeight: '500',
    fontSize: 14
  };

  const plansContainerStyle: ViewStyle = {
    gap: 12
  };

  return (
    <View style={containerStyle}>
      <View style={headerStyle}>
        <Text style={titleStyle}>
          Choose Your Plan
        </Text>
        <BillingToggle isYearly={isYearly} onToggle={onBillingToggle} />
      </View>

      {isYearly && (
        <View style={savingsBannerStyle}>
          <Text style={savingsTextStyle}>
            💰 Save up to 17% with yearly billing
          </Text>
        </View>
      )}

      <View style={plansContainerStyle}>
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan === plan.id}
            isYearly={isYearly}
            onSelect={onPlanSelect}
          />
        ))}
      </View>
    </View>
  );
};
