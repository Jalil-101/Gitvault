// components/FilterTabs.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ModernColors } from '@/constants/Colors';
import { IssueFilter } from '@/types/issue';

interface FilterTabsProps {
  activeFilter: IssueFilter;
  onFilterChange: (filter: IssueFilter) => void;
  issueCounts: Record<IssueFilter, number>;
  theme?: 'light' | 'dark';
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  activeFilter,
  onFilterChange,
  issueCounts,
  theme = 'dark'
}) => {
  const colors = ModernColors[theme];

  const filters: { key: IssueFilter; label: string; icon: string }[] = [
    { key: 'all', label: 'All', icon: '📋' },
    { key: 'open', label: 'Open', icon: '🟢' },
    { key: 'closed', label: 'Closed', icon: '🔴' },
    { key: 'assigned', label: 'Assigned', icon: '👤' },
    { key: 'created', label: 'Created', icon: '✏️' },
  ];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="mb-4"
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      <View className="flex-row">
        {filters.map((filter, index) => {
          const isActive = activeFilter === filter.key;
          
          return (
            <TouchableOpacity
              key={filter.key}
              onPress={() => onFilterChange(filter.key)}
              className="mr-3 px-4 py-2 rounded-full flex-row items-center"
              style={{
                backgroundColor: isActive 
                  ? colors.interactive.primary 
                  : colors.surface.tertiary,
                borderWidth: 1,
                borderColor: isActive 
                  ? colors.interactive.primary 
                  : colors.border.secondary,
              }}
            >
              <Text style={{ fontSize: 14, marginRight: 6 }}>
                {filter.icon}
              </Text>
              <Text
                style={{
                  color: isActive 
                    ? colors.text.inverse 
                    : colors.text.secondary,
                  fontSize: 14,
                  fontWeight: '600',
                  marginRight: 4
                }}
              >
                {filter.label}
              </Text>
              <View
                className="px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: isActive 
                    ? 'rgba(255,255,255,0.2)' 
                    : colors.border.primary,
                }}
              >
                <Text
                  style={{
                    color: isActive 
                      ? colors.text.inverse 
                      : colors.text.tertiary,
                    fontSize: 12,
                    fontWeight: '600'
                  }}
                >
                  {issueCounts[filter.key]}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default FilterTabs;