// hooks/useSearchActions.ts
import { useCallback } from "react";
import { searchService } from "../services/searchService";
import {
  FilterOption,
  RecentSearch,
  SearchResult,
  SearchSuggestion,
} from "../types/search";

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

      try {
        // Get active filters
        const activeFilters = ["all"]; // Default to all for now

        // Perform search using the new service
        const results = await searchService.performSearch(
          query.trim(),
          activeFilters
        );
        setSearchResults(results);
      } catch (error) {
        // Silently handle 403 errors (user not authenticated) - this is expected
        if (error instanceof Error && error.message.includes("403")) {
          // User is not authenticated, which is normal for search
          setSearchResults([]);
          return;
        }
        // Only log other errors that might be actual issues
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
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

    // Handle navigation based on result type
    if (item.type === "repository") {
      // Navigate to repository detail
      // You can implement navigation logic here
      console.log("Navigate to repository:", item.title);
    } else if (item.type === "user") {
      // Navigate to user profile
      console.log("Navigate to user:", item.title);
    } else if (item.type === "topic") {
      // Navigate to topic search
      console.log("Navigate to topic:", item.text);
    }
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
