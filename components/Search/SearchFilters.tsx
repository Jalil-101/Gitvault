// components/search/SearchFilters.tsx
import { ThemedText } from "@/components/ThemedText";
import { useModernTheme } from "@/context/ThemeContext";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

interface FilterOption {
  id: string;
  label: string;
  active: boolean;
}

interface SearchFiltersProps {
  filters: FilterOption[];
  onFilterPress: (filterId: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFilterPress,
}) => {
  const { colors, shadows } = useModernTheme();

  const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    scrollView: {
      flexDirection: "row",
    },
    filterButton: {
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 22,
      marginRight: 14,
      ...shadows.sm,
    },
    filterButtonActive: {
      backgroundColor: colors.interactive.primary,
      borderWidth: 1.5,
      borderColor: colors.interactive.primary,
    },
    filterButtonInactive: {
      backgroundColor: colors.surface.secondary,
      borderWidth: 1.5,
      borderColor: colors.border.secondary,
    },
    filterText: {
      fontSize: 15,
      fontWeight: "600",
    },
    filterTextActive: {
      color: colors.text.inverse,
    },
    filterTextInactive: {
      color: colors.text.secondary,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        style={styles.scrollView}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            onPress={() => onFilterPress(filter.id)}
            style={[
              styles.filterButton,
              filter.active
                ? styles.filterButtonActive
                : styles.filterButtonInactive,
            ]}
          >
            <ThemedText
              style={[
                styles.filterText,
                filter.active
                  ? styles.filterTextActive
                  : styles.filterTextInactive,
              ]}
            >
              {filter.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
