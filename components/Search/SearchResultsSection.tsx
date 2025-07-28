// components/SearchResultsSection.tsx
import { ThemedText } from "@/components/ThemedText";
import { SearchResultItem } from "@/components/search/SearchResultItem";
import { useModernTheme } from "@/context/ThemeContext";
import { SearchResult } from "@/types/search";
import React from "react";
import { StyleSheet, View } from "react-native";

interface SearchResultsSectionProps {
  filteredResults: SearchResult[];
  onResultPress: (item: SearchResult) => void;
}

const SearchResultsSection: React.FC<SearchResultsSectionProps> = ({
  filteredResults,
  onResultPress,
}) => {
  const { colors } = useModernTheme();

  const styles = StyleSheet.create({
    container: {
      paddingBottom: 24,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: 20,
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text.primary,
    },
    resultCount: {
      fontSize: 14,
      color: colors.text.tertiary,
      fontWeight: "500",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Results</ThemedText>
        <ThemedText style={styles.resultCount}>
          {filteredResults.length}{" "}
          {filteredResults.length === 1 ? "result" : "results"}
        </ThemedText>
      </View>

      {filteredResults.map((item) => (
        <SearchResultItem key={item.id} item={item} onPress={onResultPress} />
      ))}
    </View>
  );
};

export default SearchResultsSection;
