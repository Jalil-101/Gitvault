// components/search/EmptySearchState.tsx
import React from "react";
import { View } from "react-native";
import { Search } from "lucide-react-native";
import { useModernThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";

interface EmptySearchStateProps {
  query?: string;
}

export const EmptySearchState: React.FC<EmptySearchStateProps> = ({
  query,
}) => {
  const { colors } = useModernThemeColor();

  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-20 h-20 rounded-full bg-modern-dark-surface-secondary items-center justify-center mb-6">
        <Search size={32} color={colors.text.tertiary} />
      </View>

      <ThemedText className="text-modern-dark-text-primary text-xl font-semibold text-center mb-2">
        {query ? "No results found" : "Start searching"}
      </ThemedText>

      <ThemedText className="text-modern-dark-text-tertiary text-center leading-6">
        {query
          ? `We couldn't find anything matching "${query}". Try adjusting your search or filters.`
          : "Search for repositories, users, topics, and more across GitHub."}
      </ThemedText>
    </View>
  );
};
