// Main SearchScreen component (refactored)
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { KeyboardAvoidingView, Platform, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchContent from "@/components/search/SearchContent";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchHeader } from "@/components/search/SearchHeader";
import { SearchInput } from "@/components/search/SearchInput";

import { SearchSuggestion } from "@/components/search/SearchSuggestions";
import { useModernTheme } from "@/context/ThemeContext";
import { useSearchActions } from "@/hooks/useSearchActions";
import { useSearchDisplayState } from "@/hooks/useSearchDisplayState";
import { useSearchFiltering } from "@/hooks/useSearchFiltering";
import { useSearchState } from "@/hooks/useSearchState";

export default function SearchScreen() {
  const router = useRouter();
  const { colors, isDarkTheme, gradients } = useModernTheme();

  // State management
  const {
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
  } = useSearchState();

  // Actions
  const {
    performSearch,
    handleFilterPress,
    handleRecentSearchPress,
    handleSuggestionPress,
    handleResultPress,
    handleRemoveRecentSearch,
    handleClearAllRecentSearches,
    handleClearSearch,
  } = useSearchActions({
    setIsLoading,
    setSearchResults,
    setRecentSearches,
    setFilters,
    setSearchQuery,
  });

  // Computed values
  const filteredResults = useSearchFiltering(searchResults, filters);
  const showStates = useSearchDisplayState(
    searchQuery,
    searchResults,
    filteredResults,
    isLoading,
    recentSearches
  ) as {
    showEmptyState: boolean;
    showNoResults: boolean;
    showResults: boolean;
    showRecentSearches: boolean;
    showSuggestions: boolean;
  };

  // Navigation handlers
  const handleBack = () => router.back();
  const handleFilter = () => console.log("Open filter modal");

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        performSearch(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />

      <LinearGradient colors={gradients.background} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            {/* Header */}
            <SearchHeader onBack={handleBack} onFilter={handleFilter} />

            {/* Search Input */}
            <SearchInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={handleClearSearch}
              placeholder="Search repositories, users, topics..."
            />

            {/* Filters */}
            {(searchQuery || showStates.showResults) && (
              <SearchFilters
                filters={filters}
                onFilterPress={handleFilterPress}
              />
            )}

            {/* Content */}
            <View style={{ flex: 1 }}>
              <SearchContent
                isLoading={isLoading}
                searchQuery={searchQuery}
                filteredResults={filteredResults}
                recentSearches={recentSearches}
                showStates={showStates}
                onRecentSearchPress={handleRecentSearchPress}
                onSuggestionPress={
                  handleSuggestionPress as (
                    suggestion: SearchSuggestion
                  ) => void
                }
                onResultPress={handleResultPress}
                onRemoveRecentSearch={handleRemoveRecentSearch}
                onClearAllRecentSearches={handleClearAllRecentSearches}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
