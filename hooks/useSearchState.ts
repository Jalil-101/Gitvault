// hooks/useSearchState.ts
import { useState } from "react";
import { SearchResult, RecentSearch, FilterOption } from "../types/search";
import { DEFAULT_FILTERS } from "../constants/search";

export const useSearchState = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [filters, setFilters] = useState<FilterOption[]>(DEFAULT_FILTERS);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([
    {
      id: "1",
      query: "react native",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "2",
      query: "typescript tutorial",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      id: "3",
      query: "nextjs deployment",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    {
      id: "4",
      query: "tailwind components",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    },
  ]);

  return {
    searchQuery,
    setSearchQuery,
    isLoading,
    setIsLoading,
    searchResults,
    setSearchResults,
    filters,
    setFilters,
    recentSearches,
    setRecentSearches,
  };
};
