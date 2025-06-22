// Main SearchScreen component (refactored)
import React, { useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { SearchHeader } from '@/components/search/SearchHeader';
import { SearchInput } from '@/components/search/SearchInput';
import { SearchFilters } from '@/components/search/SearchFilters';
import SearchContent from '@/components/search/SearchContent';
import SearchResultsSection from '@/components/search/SearchResultsSection';

import { useModernTheme } from '@/context/ThemeContext';
import { useSearchState } from '@/hooks/useSearchState';
import { useSearchActions } from '@/hooks/useSearchActions';
import { useSearchFiltering } from '@/hooks/useSearchFiltering';
import { useSearchDisplayState } from '@/hooks/useSearchDisplayState';
import { SearchSuggestion } from '@/components/search/SearchSuggestions';

export default function SearchScreen() {
  const router = useRouter();
  const { isDarkTheme } = useModernTheme();

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
      showNoResults: boolean; // Ensure this is strictly boolean
      showResults: boolean;
      showRecentSearches: boolean;
      showSuggestions: boolean;
  };

  // Navigation handlers
  const handleBack = () => router.back();
  const handleFilter = () => console.log('Open filter modal');

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
    <SafeAreaView
      className={`flex-1 ${isDarkTheme ? 'bg-modern-dark-bg-primary' : 'bg-modern-light-bg-primary'}`}
    >
      <StatusBar style={isDarkTheme ? "light" : "dark"} />
      
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
        <View className="flex-1">
          <SearchContent
            isLoading={isLoading}
            searchQuery={searchQuery}
            filteredResults={filteredResults}
            recentSearches={recentSearches}
            showStates={showStates}
            onRecentSearchPress={handleRecentSearchPress}
            onSuggestionPress={handleSuggestionPress as (suggestion: SearchSuggestion) => void}
            onResultPress={handleResultPress}
            onRemoveRecentSearch={handleRemoveRecentSearch}
            onClearAllRecentSearches={handleClearAllRecentSearches}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}