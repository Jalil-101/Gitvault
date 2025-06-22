// components/SearchResultsSection.tsx
import React from "react";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { SearchResultItem } from "@/components/search/SearchResultItem";
import { useModernTheme } from "@/context/ThemeContext";
import { SearchResult } from "@/types/search";

interface SearchResultsSectionProps {
  filteredResults: SearchResult[];
  onResultPress: (item: SearchResult) => void;
}

const SearchResultsSection: React.FC<SearchResultsSectionProps> = ({
  filteredResults,
  onResultPress,
}) => {
  const { isDarkTheme } = useModernTheme();

  return (
    <View className="pb-6">
      <View className="flex-row items-center justify-between mx-4 mb-4">
        <ThemedText
          className={`${
            isDarkTheme
              ? "text-modern-dark-text-primary"
              : "text-modern-light-text-primary"
          } font-semibold text-lg`}
        >
          Results
        </ThemedText>
        <ThemedText
          className={`${
            isDarkTheme
              ? "text-modern-dark-text-tertiary"
              : "text-modern-light-text-tertiary"
          } text-sm`}
        >
          {filteredResults.length}{" "}
          {filteredResults.length === 1 ? "result" : "results"}
        </ThemedText>
      </View>

      {filteredResults.map((item) => (
        <SearchResultItem key={item.id} item={item} onPress={onResultPress} />
      ))}
    </View>
  );
};

export default SearchResultsSection;
