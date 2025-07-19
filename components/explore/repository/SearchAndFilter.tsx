// components/SearchAndFilter.tsx
import { ListingConfig } from "@/types/repository";
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView,
} from "react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { useThemeClasses } from "@/hooks/useThemeColor";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  onSort: (sort: SortOptions) => void;
  config: ListingConfig;
}

interface FilterOptions {
  language: string;
  minStars: number;
  hasTopics: boolean;
}

interface SortOptions {
  field: "stars" | "forks" | "updated" | "name";
  order: "asc" | "desc";
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
  onFilter,
  onSort,
  config,
}) => {
  const { colors, isDarkTheme } = useModernTheme();
  const themeClasses = useThemeClasses();

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    language: "",
    minStars: 0,
    hasTopics: false,
  });
  const [sortBy, setSortBy] = useState<SortOptions>({
    field: "stars",
    order: "desc",
  });

  const languages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "Go",
    "Rust",
    "Swift",
  ];
  const sortOptions = [
    { field: "stars", label: "Stars" },
    { field: "forks", label: "Forks" },
    { field: "updated", label: "Updated" },
    { field: "name", label: "Name" },
  ];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    onSearch(text);
  };

  const applyFilters = () => {
    onFilter(filters);
    onSort(sortBy);
    setShowFilters(false);
  };

  return (
    <View className="px-4 mb-4">
      {/* Search Bar */}
      <View className="flex-row items-center mb-3">
        <View
          className="flex-1 rounded-lg px-4 py-3 mr-3"
          style={{ backgroundColor: colors.surface.secondary }}
        >
          <TextInput
            placeholder="Search repositories..."
            placeholderTextColor={colors.text.tertiary}
            value={searchQuery}
            onChangeText={handleSearch}
            className="text-base"
            style={{ color: colors.text.primary }}
          />
        </View>
        <TouchableOpacity
          onPress={() => setShowFilters(true)}
          className="p-3 rounded-lg"
          style={{ backgroundColor: colors.interactive.primary }}
        >
          <Text
            className="text-sm font-medium"
            style={{ color: colors.text.inverse }}
          >
            Filter
          </Text>
        </TouchableOpacity>
      </View>

      {/* Active Filters Display */}
      {(filters.language || filters.minStars > 0 || filters.hasTopics) && (
        <View className="flex-row flex-wrap mb-2">
          {filters.language && (
            <View
              className="px-2 py-1 rounded-md mr-2 mb-1"
              style={{ backgroundColor: colors.surface.tertiary }}
            >
              <Text className="text-xs" style={{ color: colors.text.primary }}>
                {filters.language}
              </Text>
            </View>
          )}
          {filters.minStars > 0 && (
            <View
              className="px-2 py-1 rounded-md mr-2 mb-1"
              style={{ backgroundColor: colors.surface.tertiary }}
            >
              <Text className="text-xs" style={{ color: colors.text.primary }}>
                ⭐ {filters.minStars}+
              </Text>
            </View>
          )}
          {filters.hasTopics && (
            <View
              className="px-2 py-1 rounded-md mr-2 mb-1"
              style={{ backgroundColor: colors.surface.tertiary }}
            >
              <Text className="text-xs" style={{ color: colors.text.primary }}>
                Has Topics
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowFilters(false)}
      >
        <View
          className="flex-1"
          style={{ backgroundColor: colors.background.primary }}
        >
          <View
            className="p-4 border-b"
            style={{ borderColor: colors.border.primary }}
          >
            <View className="flex-row justify-between items-center">
              <Text
                className="text-lg font-semibold"
                style={{ color: colors.text.primary }}
              >
                Filter & Sort
              </Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Text
                  className="text-base"
                  style={{ color: colors.text.tertiary }}
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView className="flex-1 p-4">
            {/* Language Filter */}
            <View className="mb-6">
              <Text
                className="text-base font-medium mb-3"
                style={{ color: colors.text.primary }}
              >
                Language
              </Text>
              <View className="flex-row flex-wrap">
                <TouchableOpacity
                  onPress={() => setFilters({ ...filters, language: "" })}
                  className="px-3 py-2 rounded-lg mr-2 mb-2"
                  style={{
                    backgroundColor:
                      filters.language === ""
                        ? colors.interactive.primary
                        : colors.surface.secondary,
                  }}
                >
                  <Text
                    className="text-sm"
                    style={{
                      color:
                        filters.language === ""
                          ? colors.text.inverse
                          : colors.text.primary,
                    }}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                {languages.map((lang) => (
                  <TouchableOpacity
                    key={lang}
                    onPress={() => setFilters({ ...filters, language: lang })}
                    className="px-3 py-2 rounded-lg mr-2 mb-2"
                    style={{
                      backgroundColor:
                        filters.language === lang
                          ? colors.interactive.primary
                          : colors.surface.secondary,
                    }}
                  >
                    <Text
                      className="text-sm"
                      style={{
                        color:
                          filters.language === lang
                            ? colors.text.inverse
                            : colors.text.primary,
                      }}
                    >
                      {lang}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Stars Filter */}
            <View className="mb-6">
              <Text
                className="text-base font-medium mb-3"
                style={{ color: colors.text.primary }}
              >
                Minimum Stars
              </Text>
              <View className="flex-row flex-wrap">
                {[0, 10, 100, 1000, 10000].map((stars) => (
                  <TouchableOpacity
                    key={stars}
                    onPress={() => setFilters({ ...filters, minStars: stars })}
                    className="px-3 py-2 rounded-lg mr-2 mb-2"
                    style={{
                      backgroundColor:
                        filters.minStars === stars
                          ? colors.interactive.primary
                          : colors.surface.secondary,
                    }}
                  >
                    <Text
                      className="text-sm"
                      style={{
                        color:
                          filters.minStars === stars
                            ? colors.text.inverse
                            : colors.text.primary,
                      }}
                    >
                      {stars === 0 ? "Any" : `${stars}+`}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Sort Options */}
            <View className="mb-6">
              <Text
                className="text-base font-medium mb-3"
                style={{ color: colors.text.primary }}
              >
                Sort By
              </Text>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.field}
                  onPress={() =>
                    setSortBy({ ...sortBy, field: option.field as any })
                  }
                  className="p-3 rounded-lg mb-2"
                  style={{
                    backgroundColor:
                      sortBy.field === option.field
                        ? colors.interactive.primary
                        : colors.surface.secondary,
                  }}
                >
                  <Text
                    className="text-sm"
                    style={{
                      color:
                        sortBy.field === option.field
                          ? colors.text.inverse
                          : colors.text.primary,
                    }}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Sort Order */}
            <View className="mb-6">
              <Text
                className="text-base font-medium mb-3"
                style={{ color: colors.text.primary }}
              >
                Order
              </Text>
              <View className="flex-row">
                <TouchableOpacity
                  onPress={() => setSortBy({ ...sortBy, order: "desc" })}
                  className="flex-1 p-3 rounded-lg mr-2"
                  style={{
                    backgroundColor:
                      sortBy.order === "desc"
                        ? colors.interactive.primary
                        : colors.surface.secondary,
                  }}
                >
                  <Text
                    className="text-sm text-center"
                    style={{
                      color:
                        sortBy.order === "desc"
                          ? colors.text.inverse
                          : colors.text.primary,
                    }}
                  >
                    Descending
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSortBy({ ...sortBy, order: "asc" })}
                  className="flex-1 p-3 rounded-lg"
                  style={{
                    backgroundColor:
                      sortBy.order === "asc"
                        ? colors.interactive.primary
                        : colors.surface.secondary,
                  }}
                >
                  <Text
                    className="text-sm text-center"
                    style={{
                      color:
                        sortBy.order === "asc"
                          ? colors.text.inverse
                          : colors.text.primary,
                    }}
                  >
                    Ascending
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Has Topics Toggle */}
            <TouchableOpacity
              onPress={() =>
                setFilters({ ...filters, hasTopics: !filters.hasTopics })
              }
              className="flex-row items-center justify-between p-3 rounded-lg mb-6"
              style={{ backgroundColor: colors.surface.secondary }}
            >
              <Text className="text-sm" style={{ color: colors.text.primary }}>
                Has Topics
              </Text>
              <View
                className="w-12 h-6 rounded-full"
                style={{
                  backgroundColor: filters.hasTopics
                    ? colors.interactive.primary
                    : colors.surface.tertiary,
                }}
              >
                <View
                  className={`w-5 h-5 rounded-full bg-white mt-0.5 ${
                    filters.hasTopics ? "ml-6" : "ml-0.5"
                  }`}
                  style={{ backgroundColor: colors.text.inverse }}
                />
              </View>
            </TouchableOpacity>
          </ScrollView>

          <View
            className="p-4 border-t"
            style={{ borderColor: colors.border.primary }}
          >
            <TouchableOpacity
              onPress={applyFilters}
              className="p-4 rounded-lg"
              style={{ backgroundColor: colors.interactive.primary }}
            >
              <Text
                className="text-center font-medium"
                style={{ color: colors.text.inverse }}
              >
                Apply Filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
