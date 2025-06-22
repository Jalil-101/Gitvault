// hooks/useSearchDisplayState.ts
export const useSearchDisplayState = (
  searchQuery: string,
  searchResults: any[],
  filteredResults: any[],
  isLoading: boolean,
  recentSearches: any[]
) => {
  const showEmptyState = !searchQuery && searchResults.length === 0;
  const showNoResults =
    searchQuery && filteredResults.length === 0 && !isLoading;
  const showResults = filteredResults.length > 0;
  const showRecentSearches = !searchQuery && recentSearches.length > 0;
  const showSuggestions = !searchQuery;

  return {
    showEmptyState,
    showNoResults,
    showResults,
    showRecentSearches,
    showSuggestions,
  };
};
