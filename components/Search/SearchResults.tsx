// components/SearchResults.tsx
import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { Repository, User, SearchFilters } from "@/types/search";
import { RepositoryCard } from "./RepositoryCard";
import { UserCard } from "./UserCard";

interface SearchResultsProps {
  results: Repository[] | User[];
  filters: SearchFilters;
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  onRetry: () => void;
  onRepositoryPress?: (repository: Repository) => void;
  onUserPress?: (user: User) => void;
  animationValue: Animated.Value;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  filters,
  isLoading,
  error,
  hasSearched,
  onRetry,
  onRepositoryPress,
  onUserPress,
  animationValue,
}) => {
  const { colors } = useTheme();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.accent.fg} />
        <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted mt-2">
          Searching...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center px-4">
        <Ionicons name="alert-circle" size={48} color={colors.danger.fg} />
        <Text className="text-github-light-fg-default dark:text-github-dark-fg-default text-lg font-semibold mt-2">
          Something went wrong
        </Text>
        <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-center mt-1">
          {error}
        </Text>
        <TouchableOpacity
          onPress={onRetry}
          className="bg-github-light-accent-fg dark:bg-github-dark-accent-fg px-6 py-3 rounded-lg mt-4"
          activeOpacity={0.7}
        >
          <Text className="text-white font-medium">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (results.length === 0 && hasSearched) {
    return (
      <View className="flex-1 justify-center items-center px-4">
        <Ionicons name="search" size={48} color={colors.fg.muted} />
        <Text className="text-github-light-fg-default dark:text-github-dark-fg-default text-lg font-semibold mt-2">
          No results found
        </Text>
        <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted text-center mt-1">
          Try adjusting your search terms or filters
        </Text>
      </View>
    );
  }

  return (
    <Animated.View
      style={{
        opacity: animationValue,
        transform: [
          {
            translateY: animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          },
        ],
      }}
      className="mx-4"
    >
      <Text className="text-github-light-fg-default dark:text-github-dark-fg-default font-semibold text-lg mb-3">
        Search Results ({results.length})
      </Text>

      {results.map((result) => {
        if (filters.type === "repositories") {
          const repo = result as Repository;
          return (
            <RepositoryCard
              key={repo.id}
              repository={repo}
              onPress={onRepositoryPress}
              showOwner
            />
          );
        } else {
          const user = result as User;
          return <UserCard key={user.id} user={user} onPress={onUserPress} />;
        }
      })}
    </Animated.View>
  );
};
