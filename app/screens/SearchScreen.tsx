import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, StatusBar, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";
import { SearchBar } from "@/components/Search/SearchBar";
import { SearchFilters } from "@/components/Search/SearchFilters";
import { RecentSearches } from "@/components/Search/RecentSearches";
import { TrendingRepositories } from "@/components/Search/TrendingRepositories";
import { SearchResults } from "@/components/Search/SearchResults";
import { useSearchAnimations } from "@/hooks/useSearchAnimations";
import { GitHubService } from "@/services/searchservices";
import {
  Repository,
  User,
  SearchFilters as SearchFiltersType,
} from "@/types/search";

const SearchScreen: React.FC = () => {
  const { colors, isDarkTheme } = useTheme();
  const {
    searchBarAnim,
    filterAnim,
    resultsAnim,
    animateSearchBar,
    resetSearchBar,
    animateFilters,
    animateResults,
  } = useSearchAnimations();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Repository[] | User[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "react-native",
    "expo",
    "typescript",
    "tailwindcss",
  ]);
  const [trendingRepos, setTrendingRepos] = useState<Repository[]>([]);
  const [filters, setFilters] = useState<SearchFiltersType>({
    type: "repositories",
    sort: "best-match",
    order: "desc",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Effects
  useEffect(() => {
    loadTrendingRepos();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      animateSearchBar();
    } else {
      resetSearchBar();
    }
  }, [searchQuery]);

  useEffect(() => {
    animateFilters(showFilters);
  }, [showFilters]);

  // Handlers
  const loadTrendingRepos = async () => {
    try {
      const trending = await GitHubService.getTrendingRepositories();
      setTrendingRepos(trending);
    } catch (err) {
      console.error("Failed to load trending repositories:", err);
    }
  };

  const performSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setError(null);
    setHasSearched(true);

    try {
      // Add to recent searches
      setRecentSearches((prev) => [
        query,
        ...prev.filter((item) => item !== query).slice(0, 9),
      ]);

      let results: Repository[] | User[];
      if (filters.type === "repositories") {
        results = await GitHubService.searchRepositories(query, filters);
      } else {
        results = await GitHubService.searchUsers(query, filters);
      }

      setSearchResults(results);
      animateResults();
    } catch (err) {
      setError("Failed to search. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = useCallback(() => {
    performSearch(searchQuery);
  }, [searchQuery, filters]);

  const handleRecentSearch = (query: string) => {
    setSearchQuery(query);
    performSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
    setError(null);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (hasSearched) {
      await performSearch(searchQuery);
    } else {
      await loadTrendingRepos();
    }
    setRefreshing(false);
  };

  const handleRepositoryPress = (repository: Repository) => {
    // Navigate to repository details
    console.log("Repository pressed:", repository.full_name);
  };

  const handleUserPress = (user: User) => {
    // Navigate to user profile
    console.log("User pressed:", user.login);
  };

  return (
    <SafeAreaView className="flex-1 bg-github-light-canvas-subtle dark:bg-github-dark-canvas-default pt-8">
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor={colors.canvas.default}
      />

      <SearchBar
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearch={handleSearch}
        onClear={clearSearch}
        onToggleFilters={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
        animationValue={searchBarAnim}
      />

      <SearchFilters
        filters={filters}
        onFiltersChange={setFilters}
        animationValue={filterAnim}
      />

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent.fg}
            colors={[colors.accent.fg]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {hasSearched ? (
          <SearchResults
            results={searchResults}
            filters={filters}
            isLoading={isSearching}
            error={error}
            hasSearched={hasSearched}
            onRetry={handleSearch}
            onRepositoryPress={handleRepositoryPress}
            onUserPress={handleUserPress}
            animationValue={resultsAnim}
          />
        ) : (
          <>
            <RecentSearches
              searches={recentSearches}
              onSearchSelect={handleRecentSearch}
            />
            <TrendingRepositories
              repositories={trendingRepos}
              onRepositoryPress={handleRepositoryPress}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
