// components/search/SearchInput.tsx
import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Search, X } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";

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
  const { colors, isDarkTheme } = useModernTheme();

  return (
    <View className="mx-4 mb-4">
      <View
        className={`flex-row items-center ${
          isDarkTheme
            ? "bg-modern-dark-surface-secondary"
            : "bg-modern-light-surface-secondary"
        } rounded-2xl px-4 py-3`}
      >
        <Search size={20} color={colors.text.tertiary} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.tertiary}
          className={`flex-1 ml-3 ${
            isDarkTheme
              ? "text-modern-dark-text-primary"
              : "text-modern-light-text-primary"
          } text-base`}
          style={{ color: colors.text.primary }}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={onClear} className="ml-2">
            <X size={20} color={colors.text.tertiary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
