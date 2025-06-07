// components/SearchBar.tsx
import React from "react";
import { View, TextInput, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

interface SearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
  onClear: () => void;
  onToggleFilters: () => void;
  showFilters: boolean;
  animationValue: Animated.Value;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onClear,
  onToggleFilters,
  showFilters,
  animationValue,
}) => {
  const { colors, isDarkTheme } = useTheme();

  return (
    <Animated.View
      style={{
        transform: [
          {
            scaleX: animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.98],
            }),
          },
        ],
      }}
      className="mx-4 mb-4"
    >
      <View className="flex-row items-center bg-github-light-canvas-default dark:bg-github-dark-canvas-overlay rounded-xl border border-github-light-border-default dark:border-github-dark-border-default">
        <View className="flex-1 flex-row items-center">
          <Ionicons
            name="search"
            size={20}
            color={colors.fg.muted}
            style={{ marginLeft: 16 }}
          />
          <TextInput
            value={searchQuery}
            onChangeText={onSearchQueryChange}
            placeholder="Search GitHub"
            placeholderTextColor={colors.fg.muted}
            className="flex-1 px-3 py-4 text-github-light-fg-default dark:text-github-dark-fg-default text-base"
            onSubmitEditing={onSearch}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={onClear}
            className="px-3"
            activeOpacity={0.7}
          >
            <Ionicons name="close-circle" size={20} color={colors.fg.muted} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={onToggleFilters}
          className="px-4"
          activeOpacity={0.7}
        >
          <Ionicons
            name="options"
            size={20}
            color={showFilters ? colors.accent.fg : colors.fg.muted}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
