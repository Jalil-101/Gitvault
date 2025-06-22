// components/SearchContent.tsx
import React from "react";
import { View, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { RecentSearches } from "@/components/search/RecentSearches";
import { SearchSuggestions } from "@/components/search/SearchSuggestions";
import { EmptySearchState } from "@/components/search/EmptySearchState";
import SearchResultsSection from "./SearchResultsSection";
import { useModernTheme } from "@/context/ThemeContext";
import { SearchResult, RecentSearch } from "@/types/search";
import { SearchSuggestion } from "@/components/search/SearchSuggestions"; // Ensure this matches the type used in SearchSuggestions
import { SEARCH_SUGGESTIONS } from "@/constants/search";

interface SearchContentProps {
  isLoading: boolean;
  searchQuery: string;
  filteredResults: SearchResult[];
  recentSearches: RecentSearch[];
  showStates: {
    showEmptyState: boolean;
    showNoResults: boolean;
    showResults: boolean;
    showRecentSearches: boolean;
    showSuggestions: boolean;
  };
  onRecentSearchPress: (query: string) => void;
  onSuggestionPress: (suggestion: SearchSuggestion) => void;
  onResultPress: (item: SearchResult) => void;
  onRemoveRecentSearch: (id: string) => void;
  onClearAllRecentSearches: () => void;
}

const SearchContent: React.FC<SearchContentProps> = ({
  isLoading,
  searchQuery,
  filteredResults,
  recentSearches,
  showStates,
  onRecentSearchPress,
  onSuggestionPress,
  onResultPress,
  onRemoveRecentSearch,
  onClearAllRecentSearches,
}) => {
  const { isDarkTheme } = useModernTheme();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ThemedText
          className={`${
            isDarkTheme
              ? "text-modern-dark-text-tertiary"
              : "text-modern-light-text-tertiary"
          }`}
        >
          Searching...
        </ThemedText>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Recent Searches */}
      {showStates.showRecentSearches && (
        <RecentSearches
          searches={recentSearches}
          onSearchPress={onRecentSearchPress}
          onRemoveSearch={onRemoveRecentSearch}
          onClearAll={onClearAllRecentSearches}
        />
      )}

      {/* Search Suggestions */}
      {showStates.showSuggestions && (
        <SearchSuggestions
          suggestions={SEARCH_SUGGESTIONS}
          onSuggestionPress={onSuggestionPress}
        />
      )}

      {/* Search Results */}
      {showStates.showResults && (
        <SearchResultsSection
          filteredResults={filteredResults}
          onResultPress={onResultPress}
        />
      )}

      {/* Empty States */}
      {(showStates.showEmptyState || showStates.showNoResults) && (
        <EmptySearchState
          query={showStates.showNoResults ? searchQuery : undefined}
        />
      )}
    </ScrollView>
  );
};

export default SearchContent;
