// components/explore/RecentSearches.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Clock, X, Search } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useModernTheme } from "@/context/ThemeContext";

interface RecentSearchesProps {
  onSearch?: (query: string) => void;
  onClearSearch?: (query: string) => void;
}

const recentSearches = [
  "react native",
  "typescript tutorial",
  "nextjs deployment",
  "tailwind components",
];

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  onSearch,
  onClearSearch,
}) => {
  const { colors, shadows } = useModernTheme();

  if (recentSearches.length === 0) {
    return null;
  }

  return (
    <View className="mb-4">
      {/* Section Header */}
      <View
        className="flex-row items-center p-5 rounded-2xl mb-4"
        style={{
          backgroundColor: colors.surface.secondary,
          borderWidth: 1,
          borderColor: `${colors.accents.orange.main}20`,
          ...shadows.sm,
        }}
      >
        <LinearGradient
          colors={[
            `${colors.accents.orange.main}05`,
            `${colors.accents.orange.light}05`,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute inset-0 rounded-2xl"
        />

        <View
          className="w-12 h-12 rounded-2xl items-center justify-center mr-4"
          style={{
            backgroundColor: colors.surface.primary,
            borderWidth: 2,
            borderColor: `${colors.accents.orange.main}20`,
          }}
        >
          <View
            className="w-8 h-8 rounded-xl items-center justify-center"
            style={{ backgroundColor: `${colors.accents.orange.main}15` }}
          >
            <Clock size={18} color={colors.accents.orange.main} />
          </View>
        </View>
        <View className="flex-1">
          <Text
            className="text-lg font-semibold leading-6"
            style={{ color: colors.text.primary }}
          >
            Recent Searches
          </Text>
          <Text
            className="text-sm font-medium mt-0.5"
            style={{ color: colors.text.secondary }}
          >
            Your search history
          </Text>
        </View>
      </View>

      {/* Search Items */}
      <View className="space-y-3 px-5">
        {recentSearches.map((search, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSearch?.(search)}
            className="flex-row items-center justify-between rounded-2xl"
            style={{
              backgroundColor: colors.surface.primary,
              borderColor: `${colors.accents.blue.main}15`,
              borderWidth: 2,
              ...shadows.sm,
            }}
          >
            <LinearGradient
              colors={[
                `${colors.accents.blue.main}03`,
                `${colors.accents.blue.light}03`,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="absolute inset-0 rounded-2xl"
            />

            <View className="flex-row items-center flex-1 p-4">
              <View
                className="w-10 h-10 rounded-xl items-center justify-center mr-4"
                style={{
                  backgroundColor: colors.surface.secondary,
                  borderWidth: 1,
                  borderColor: `${colors.accents.blue.main}20`,
                }}
              >
                <Search size={16} color={colors.accents.blue.main} />
              </View>

              <Text
                className="text-sm font-medium flex-1"
                style={{ color: colors.text.primary }}
              >
                {search}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => onClearSearch?.(search)}
              className="p-4"
            >
              <View
                className="w-8 h-8 rounded-xl items-center justify-center"
                style={{
                  backgroundColor: colors.surface.secondary,
                  borderWidth: 1,
                  borderColor: `${colors.text.quaternary}20`,
                }}
              >
                <X size={14} color={colors.text.quaternary} />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
