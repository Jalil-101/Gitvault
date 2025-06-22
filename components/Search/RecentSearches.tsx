// components/search/RecentSearches.tsx
import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Clock, X } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { ThemedText } from "@/components/ThemedText";

export interface RecentSearch {
  id: string;
  query: string;
  timestamp: Date;
}

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSearchPress: (query: string) => void;
  onRemoveSearch: (id: string) => void;
  onClearAll: () => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  searches,
  onSearchPress,
  onRemoveSearch,
  onClearAll,
}) => {
  const { colors, isDarkTheme } = useModernTheme() as unknown as { colors: { primary: string; text: { tertiary: string }; /* other properties */ }; isDarkTheme: boolean; };

  if (searches.length === 0) return null;

  return (
    <View className="mx-4 mb-6">
      <View
        className={`${
          isDarkTheme
            ? "bg-modern-dark-surface-secondary"
            : "bg-modern-light-surface-secondary"
        } rounded-2xl p-4`}
      >
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Clock
              size={20}
              color={isDarkTheme ? colors.primary : colors.primary}
            />
            <ThemedText
              className={`${
                isDarkTheme
                  ? "text-modern-dark-text-primary"
                  : "text-modern-light-text-primary"
              } font-semibold text-base ml-2`}
            >
              Recent Searches
            </ThemedText>
          </View>
          <TouchableOpacity onPress={onClearAll}>
            <ThemedText
              className={`${
                isDarkTheme
                  ? "text-modern-dark-interactive-primary"
                  : "text-modern-light-interactive-primary"
              } text-sm`}
            >
              Clear all
            </ThemedText>
          </TouchableOpacity>
        </View>

        {searches.map((search) => (
          <TouchableOpacity
            key={search.id}
            onPress={() => onSearchPress(search.query)}
            className={`flex-row items-center justify-between py-3 ${
              isDarkTheme
                ? "border-modern-dark-border-primary"
                : "border-modern-light-border-primary"
            } border-b last:border-b-0`}
          >
            <View className="flex-row items-center flex-1">
              <View
                className={`w-8 h-8 rounded-lg ${
                  isDarkTheme
                    ? "bg-modern-dark-interactive-primary/20"
                    : "bg-modern-light-interactive-primary/20"
                } items-center justify-center mr-3`}
              >
                <Clock size={16} color={colors.primary} />
              </View>
              <ThemedText
                className={`${
                  isDarkTheme
                    ? "text-modern-dark-text-secondary"
                    : "text-modern-light-text-secondary"
                } flex-1`}
              >
                {search.query}
              </ThemedText>
            </View>
            <TouchableOpacity
              onPress={() => onRemoveSearch(search.id)}
              className="w-6 h-6 items-center justify-center"
            >
              <X size={16} color={colors.text.tertiary} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
