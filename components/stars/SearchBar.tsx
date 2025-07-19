// components/SearchBar.tsx
import React from "react";
import { View, TextInput } from "react-native";
import { Search } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  placeholder = "Search starred repositories...",
}) => {
  const { colors } = useModernTheme();

  return (
    <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.surface.tertiary,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderWidth: 1,
          borderColor: colors.border.secondary,
        }}
      >
        <Search size={16} color={colors.text.tertiary} />
        <TextInput
          style={{
            flex: 1,
            color: colors.text.primary,
            fontSize: 16,
            marginLeft: 8,
          }}
          placeholder={placeholder}
          placeholderTextColor={colors.text.tertiary}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>
    </View>
  );
};
