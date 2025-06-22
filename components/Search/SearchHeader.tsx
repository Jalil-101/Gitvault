// components/search/SearchHeader.tsx
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ArrowLeft, Filter } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { ThemedText } from "@/components/ThemedText";

interface SearchHeaderProps {
  onBack: () => void;
  onFilter: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  onBack,
  onFilter,
}) => {
  const { colors, isDarkTheme } = useModernTheme();

  return (
    <View
      className={`flex-row items-center justify-between px-4 py-3 ${
        isDarkTheme ? "bg-modern-dark-bg-primary" : "bg-modern-light-bg-primary"
      }`}
    >
      <TouchableOpacity
        onPress={onBack}
        className={`w-10 h-10 rounded-xl ${
          isDarkTheme
            ? "bg-modern-dark-surface-secondary"
            : "bg-modern-light-surface-secondary"
        } items-center justify-center`}
      >
        <ArrowLeft size={20} color={colors.text.primary} />
      </TouchableOpacity>

      <ThemedText
        className={`text-lg font-semibold ${
          isDarkTheme
            ? "text-modern-dark-text-primary"
            : "text-modern-light-text-primary"
        }`}
      >
        Search
      </ThemedText>

      <TouchableOpacity
        onPress={onFilter}
        className={`w-10 h-10 rounded-xl ${
          isDarkTheme
            ? "bg-modern-dark-surface-secondary"
            : "bg-modern-light-surface-secondary"
        } items-center justify-center`}
      >
        <Filter size={20} color={colors.text.primary} />
      </TouchableOpacity>
    </View>
  );
};
