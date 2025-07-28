// components/search/SearchInput.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { Search, X } from "lucide-react-native";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = "Search repositories, users, topics...",
}) => {
  const { colors, shadows } = useModernTheme();

  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginBottom: 20,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface.secondary,
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderWidth: 1.5,
      borderColor: colors.border.secondary,
      ...shadows.md,
    },
    searchIcon: {
      marginRight: 12,
    },
    input: {
      flex: 1,
      fontSize: 17,
      color: colors.text.primary,
      fontWeight: "500",
    },
    clearButton: {
      marginLeft: 12,
      padding: 6,
      borderRadius: 12,
      backgroundColor: colors.surface.tertiary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Search
          size={22}
          color={colors.text.tertiary}
          style={styles.searchIcon}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.quaternary}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <X size={18} color={colors.text.tertiary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
