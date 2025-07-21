// screens/BillingPlansScreen.tsx (Main Screen - Refactored with TypeScript)
import { ActionButtons } from '@/components/billing/ActionButtons';
import { BillingHeader } from '@/components/billing/BillingHeader';
import { CurrentPlanCard } from '@/components/billing/CurrentPlanCard';
import { PlanSelectionCard } from '@/components/billing/PlanSelectionCard';
import { UsageOverviewCard } from '@/components/billing/UsageOverviewCard';
import { useModernTheme } from '@/context/ThemeContext';
import { Plan, Usage } from '@/types/billing';
import React, { useState } from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';

export default function BillingPlansScreen(): React.JSX.Element {
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const { colors } = useModernTheme();

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for personal projects',
      features: [
        'Unlimited public repositories',
        '2,000 CI/CD minutes/month',
        '500MB of package storage',
        'Community support'
      ],
      popular: false,
      accentColor: 'blue'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: { monthly: 4, yearly: 48 },
      description: 'Advanced tools for developers',
      features: [
        'Everything in Free',
        'Unlimited private repositories',
        '3,000 CI/CD minutes/month',
        '2GB of package storage',
        'Email support'
      ],
      popular: true,
      accentColor: 'purple'
    },
    {
      id: 'team',
      name: 'Team',
      price: { monthly: 4, yearly: 48 },
      description: 'Collaboration for teams',
      features: [
        'Everything in Pro',
        'Team access controls',
        '10,000 CI/CD minutes/month',
        '50GB shared storage',
        'Priority support'
      ],
      popular: false,
      accentColor: 'green'
    }
  ];

  const currentUsage: Usage = {
    repositories: { used: 23, limit: 'Unlimited' },
    storage: { used: 1.2, limit: 2.0, unit: 'GB' },
    minutes: { used: 1450, limit: 3000, unit: 'minutes' }
  };

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: colors.background.primary
  };

  const scrollViewStyle: ViewStyle = {
    flex: 1
  };

  const handleUpgrade = (): void => {
    console.log(`Upgrading to ${selectedPlan}`);
  };

  const handleViewHistory = (): void => {
    console.log('Viewing billing history');
  };

  return (
    <View style={containerStyle}>
      <ScrollView style={scrollViewStyle}>
        <BillingHeader />
        <CurrentPlanCard />
        <UsageOverviewCard usage={currentUsage} />
        <PlanSelectionCard
          plans={plans}
          selectedPlan={selectedPlan}
          onPlanSelect={setSelectedPlan}
          isYearly={isYearly}
          onBillingToggle={setIsYearly}
        />
        <ActionButtons 
          selectedPlan={selectedPlan}
          onUpgrade={handleUpgrade}
          onViewHistory={handleViewHistory}
        />
      </ScrollView>
    </View>
  );
}