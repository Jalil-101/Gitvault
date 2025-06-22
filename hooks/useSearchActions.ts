// hooks/useSearchActions.ts
import { useCallback } from "react";
import {
  SearchResult,
  RecentSearch,
  FilterOption,
  SearchSuggestion,
} from "../types/search";
import { MOCK_SEARCH_RESULTS } from "../constants/search";

interface UseSearchActionsProps {
  setIsLoading: (loading: boolean) => void;
  setSearchResults: (results: SearchResult[]) => void;
  setRecentSearches: React.Dispatch<React.SetStateAction<RecentSearch[]>>;
  setFilters: React.Dispatch<React.SetStateAction<FilterOption[]>>;
  setSearchQuery: (query: string) => void;
}

export const useSearchActions = ({
  setIsLoading,
  setSearchResults,
  setRecentSearches,
  setFilters,
  setSearchQuery,
}: UseSearchActionsProps) => {
  const performSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);

      // Add to recent searches
      const newSearch: RecentSearch = {
        id: Date.now().toString(),
        query: query.trim(),
        timestamp: new Date(),
      };

      setRecentSearches((prev) => [
        newSearch,
        ...prev.filter((s) => s.query !== query.trim()).slice(0, 9),
      ]);

      // Simulate API call
      setTimeout(() => {
        const filteredResults = MOCK_SEARCH_RESULTS.filter(
          (result) =>
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.description?.toLowerCase().includes(query.toLowerCase()) ||
            result.subtitle?.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
        setIsLoading(false);
      }, 800);
    },
    [setIsLoading, setSearchResults, setRecentSearches]
  );

  const handleFilterPress = useCallback(
    (filterId: string) => {
      setFilters((prev) =>
        prev.map((filter) => ({
          ...filter,
          active:
            filter.id === filterId
              ? !filter.active
              : filterId === "all"
              ? false
              : filter.active,
        }))
      );
    },
    [setFilters]
  );

  const handleRecentSearchPress = useCallback(
    (query: string) => {
      setSearchQuery(query);
      performSearch(query);
    },
    [setSearchQuery, performSearch]
  );

  const handleSuggestionPress = useCallback(
    (suggestion: SearchSuggestion) => {
      setSearchQuery(suggestion.text);
      performSearch(suggestion.text);
    },
    [setSearchQuery, performSearch]
  );

  const handleResultPress = useCallback((item: SearchResult) => {
    console.log("Navigate to:", item.title);
    // TODO: Implement navigation logic
  }, []);

  const handleRemoveRecentSearch = useCallback(
    (id: string) => {
      setRecentSearches((prev) => prev.filter((search) => search.id !== id));
    },
    [setRecentSearches]
  );

  const handleClearAllRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, [setRecentSearches]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
  }, [setSearchQuery, setSearchResults]);

  return {
    performSearch,
    handleFilterPress,
    handleRecentSearchPress,
    handleSuggestionPress,
    handleResultPress,
    handleRemoveRecentSearch,
    handleClearAllRecentSearches,
    handleClearSearch,
  };
};
