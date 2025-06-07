// components/RecentSearches.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface RecentSearchesProps {
  searches: string[];
  onSearchSelect: (search: string) => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  searches,
  onSearchSelect,
}) => {
  if (searches.length === 0) return null;

  return (
    <View className="mx-4 mb-6">
      <Text className="text-github-light-fg-default dark:text-github-dark-fg-default font-semibold text-lg mb-3">
        Recent Searches
      </Text>
      <View className="flex-row flex-wrap">
        {searches.map((search, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSearchSelect(search)}
            className="bg-github-light-canvas-default dark:bg-github-dark-canvas-overlay border border-github-light-border-default dark:border-github-dark-border-default rounded-lg px-3 py-2 mr-2 mb-2"
            activeOpacity={0.7}
          >
            <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-sm">
              {search}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
