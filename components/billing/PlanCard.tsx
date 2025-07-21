// components/billing/PlanCard.tsx
import { useModernTheme } from '@/context/ThemeContext';
import { Check } from 'lucide-react-native';
import React from 'react';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Plan } from '../../types/billing';

interface PlanCardProps {
  plan: Plan;
  isSelected: boolean;
  isYearly: boolean;
  onSelect: (planId: string) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, isSelected, isYearly, onSelect }) => {
  const { colors, getShadow } = useModernTheme();

  const price = isYearly ? plan.price.yearly : plan.price.monthly;
  const savings = plan.price.monthly * 12 - plan.price.yearly;

  const containerStyle: ViewStyle = {
    borderWidth: 2,
    borderColor: isSelected 
      ? colors.accents[plan.accentColor].main 
      : colors.border.primary,
    borderRadius: 12,
    padding: 16,
    backgroundColor: isSelected 
      ? colors.accents[plan.accentColor].light 
      : colors.surface.primary,
    position: 'relative',
    ...getShadow('sm')
  };

  const popularBadgeStyle: ViewStyle = {
    position: 'absolute',
    top: -8,
    left: 16,
    backgroundColor: colors.status.warning.main,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12
  };

  const popularTextStyle: TextStyle = {
    color: colors.text.inverse,
    fontWeight: '500',
    fontSize: 12
  };

  const headerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12
  };

  const planNameStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  };

  const nameTextStyle: TextStyle = {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary
  };

  const descriptionStyle: TextStyle = {
    color: colors.text.secondary,
    fontSize: 14,
    marginBottom: 12
  };

  const priceRowStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'baseline'
  };

  const priceStyle: TextStyle = {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary
  };

  const periodStyle: TextStyle = {
    color: colors.text.secondary,
    marginLeft: 4,
    fontSize: 14
  };

  const savingsStyle: TextStyle = {
    color: colors.status.success.main,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500'
  };

  const featuresContainerStyle: ViewStyle = {
    marginTop: 16,
    gap: 8
  };

  const featureStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center'
  };

  const featureTextStyle: TextStyle = {
    color: colors.text.secondary,
    fontSize: 14,
    marginLeft: 8
  };

  return (
    <TouchableOpacity style={containerStyle} onPress={() => onSelect(plan.id)}>
      {plan.popular && (
        <View style={popularBadgeStyle}>
          <Text style={popularTextStyle}>Popular</Text>
        </View>
      )}
      
      <View style={headerStyle}>
        <View style={{ flex: 1 }}>
          <View style={planNameStyle}>
            <Text style={nameTextStyle}>{plan.name}</Text>
            {isSelected && (
              <Check size={16} color={colors.accents[plan.accentColor].main} style={{ marginLeft: 8 }} />
            )}
          </View>
          <Text style={descriptionStyle}>{plan.description}</Text>
        </View>
      </View>

      <View style={priceRowStyle}>
        <Text style={priceStyle}>
          {price === 0 ? 'Free' : `$${price}`}
        </Text>
        <Text style={periodStyle}>
          {isYearly ? '/year' : '/month'}
        </Text>
      </View>

      {isYearly && savings > 0 && (
        <Text style={savingsStyle}>
          Save ${savings}/year
        </Text>
      )}

      <View style={featuresContainerStyle}>
        {plan.features.map((feature, index) => (
          <View key={index} style={featureStyle}>
            <Check size={14} color={colors.text.tertiary} />
            <Text style={featureTextStyle}>{feature}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};