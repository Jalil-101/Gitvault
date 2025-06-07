// components/SearchFilters.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { SearchFilters as SearchFiltersType } from "@/types/search";

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  animationValue: Animated.Value;
}

const FILTER_TYPES: SearchFiltersType["type"][] = [
  "repositories",
  "users",
  "code",
  "issues",
];

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  animationValue,
}) => {
  const handleTypeChange = (type: SearchFiltersType["type"]) => {
    onFiltersChange({ ...filters, type });
  };

  return (
    <Animated.View
      style={{
        height: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 120],
        }),
        opacity: animationValue,
      }}
      className="mx-4 mb-4 overflow-hidden"
    >
      <View className="bg-github-light-canvas-default dark:bg-github-dark-canvas-overlay rounded-xl border border-github-light-border-default dark:border-github-dark-border-default p-4">
        <Text className="text-github-light-fg-default dark:text-github-dark-fg-default font-semibold mb-3">
          Search Filters
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-2">
            {FILTER_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => handleTypeChange(type)}
                className={`px-3 py-2 rounded-lg ${
                  filters.type === type
                    ? "bg-github-light-accent-subtle dark:bg-github-dark-accent-subtle"
                    : "bg-github-light-canvas-inset dark:bg-github-dark-canvas-inset"
                }`}
                activeOpacity={0.7}
              >
                <Text
                  className={`text-sm capitalize ${
                    filters.type === type
                      ? "text-github-light-accent-fg dark:text-github-dark-accent-fg font-medium"
                      : "text-github-light-fg-muted dark:text-github-dark-fg-muted"
                  }`}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </Animated.View>
  );
};
