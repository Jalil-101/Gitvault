// hooks/useSearchFiltering.ts
import { useMemo } from "react";
import { SearchResult, FilterOption } from "../types/search";

export const useSearchFiltering = (
  searchResults: SearchResult[],
  filters: FilterOption[]
) => {
  return useMemo(() => {
    const activeFilters = filters
      .filter((f) => f.active && f.id !== "all")
      .map((f) => f.id);

    if (
      activeFilters.length === 0 ||
      filters.find((f) => f.id === "all")?.active
    ) {
      return searchResults;
    }

    return searchResults.filter((result) => {
      if (
        activeFilters.includes("repositories") &&
        result.type === "repository"
      )
        return true;
      if (activeFilters.includes("users") && result.type === "user")
        return true;
      if (activeFilters.includes("topics") && result.type === "topic")
        return true;
      return false;
    });
  }, [searchResults, filters]);
};
