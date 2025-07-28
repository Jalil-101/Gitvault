// components/search/SearchHeader.tsx
import { ThemedText } from "@/components/ThemedText";
import { useModernTheme } from "@/context/ThemeContext";
import { ArrowLeft, Filter } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface SearchHeaderProps {
  onBack: () => void;
  onFilter: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  onBack,
  onFilter,
}) => {
  const { colors, shadows } = useModernTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.surface.primary,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primary,
      ...shadows.md,
    },
    button: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: colors.surface.secondary,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border.secondary,
      ...shadows.sm,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text.primary,
      letterSpacing: -0.5,
    },
    titleContainer: {
      flex: 1,
      alignItems: "center",
      marginHorizontal: 16,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.button}>
        <ArrowLeft size={22} color={colors.text.primary} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <ThemedText style={styles.title}>Search</ThemedText>
      </View>

      <TouchableOpacity onPress={onFilter} style={styles.button}>
        <Filter size={22} color={colors.text.primary} />
      </TouchableOpacity>
    </View>
  );
};
