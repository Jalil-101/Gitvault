// components/search/EmptySearchState.tsx
import { ThemedText } from "@/components/ThemedText";
import { useModernTheme } from "@/context/ThemeContext";
import { Search } from "lucide-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

interface EmptySearchStateProps {
  query?: string;
}

export const EmptySearchState: React.FC<EmptySearchStateProps> = ({
  query,
}) => {
  const { colors, shadows } = useModernTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 32,
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.surface.secondary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24,
      ...shadows.md,
    },
    title: {
      fontSize: 20,
      fontWeight: "600",
      color: colors.text.primary,
      textAlign: "center",
      marginBottom: 8,
    },
    description: {
      fontSize: 16,
      color: colors.text.tertiary,
      textAlign: "center",
      lineHeight: 24,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Search size={32} color={colors.text.tertiary} />
      </View>

      <ThemedText style={styles.title}>
        {query
          ? "No results found for your search"
          : "Search for repositories, users, topics, and more."}
      </ThemedText>

      <ThemedText style={styles.description}>
        {query
          ? `We couldn't find anything matching "${query}". Try adjusting your search or filters.`
          : "Search for repositories, users, topics, and more."}
      </ThemedText>
    </View>
  );
};
