// components/search/SearchFilters.tsx
import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { ThemedText } from "@/components/ThemedText";

interface FilterOption {
  id: string;
  label: string;
  active: boolean;
}

interface SearchFiltersProps {
  filters: FilterOption[];
  onFilterPress: (filterId: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFilterPress,
}) => {
  const { colors, isDarkTheme } = useModernTheme();

  return (
    <View className="mb-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        className="flex-row"
      >
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={filter.id}
            onPress={() => onFilterPress(filter.id)}
            className={`px-4 py-2 rounded-full mr-3 ${
              filter.active
                ? isDarkTheme
                  ? "bg-modern-dark-interactive-primary"
                  : "bg-modern-light-interactive-primary"
                : isDarkTheme
                ? "bg-modern-dark-surface-secondary"
                : "bg-modern-light-surface-secondary"
            }`}
          >
            <ThemedText
              className={`text-sm font-medium ${
                filter.active
                  ? isDarkTheme
                    ? "text-modern-dark-text-inverse"
                    : "text-modern-light-text-inverse"
                  : isDarkTheme
                  ? "text-modern-dark-text-secondary"
                  : "text-modern-light-text-secondary"
              }`}
            >
              {filter.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
