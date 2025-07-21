// components/SearchContent.tsx
import { EmptySearchState } from "@/components/Search/EmptySearchState";
import { RecentSearches } from "@/components/Search/RecentSearches";
import { SearchSuggestion, SearchSuggestions } from "@/components/Search/SearchSuggestions";
import { ThemedText } from "@/components/ThemedText";
import { SEARCH_SUGGESTIONS } from "@/constants/search";
import { useModernTheme } from "@/context/ThemeContext";
import { RecentSearch, SearchResult } from "@/types/search";
import React from "react";
import { ScrollView, View } from "react-native";
import SearchResultsSection from "./SearchResultsSection";

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
