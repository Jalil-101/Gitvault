// components/search/SearchSuggestions.tsx
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { TrendingUp, Hash, User, BookOpen } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { ThemedText } from "@/components/ThemedText";

export interface SearchSuggestion {
  id: string;
  type: "trending" | "topic" | "user" | "repository";
  text: string;
  subtitle?: string;
}

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  onSuggestionPress: (suggestion: SearchSuggestion) => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  onSuggestionPress,
}) => {
  const { colors, isDarkTheme } = useModernTheme();

  const getIcon = (type: SearchSuggestion["type"]) => {
    switch (type) {
      case "trending":
        return <TrendingUp size={16} color={colors.accents.green.main} />;
      case "topic":
        return <Hash size={16} color={colors.accents.blue.main} />;
      case "user":
        return <User size={16} color={colors.accents.purple.main} />;
      case "repository":
        return <BookOpen size={16} color={colors.accents.orange.main} />;
    }
  };

  return (
    <View className="mx-4 mb-6">
      <View
        style={{
          backgroundColor: colors.surface.secondary,
          borderRadius: 16,
          padding: 16,
        }}
      >
        <ThemedText
          style={{
            color: colors.text.primary,
            fontWeight: "600",
            fontSize: 16,
            marginBottom: 16,
          }}
        >
          Suggestions
        </ThemedText>

        {suggestions.map((suggestion, index) => (
          <TouchableOpacity
            key={suggestion.id}
            onPress={() => onSuggestionPress(suggestion)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 12,
              borderBottomWidth: index === suggestions.length - 1 ? 0 : 1,
              borderBottomColor: colors.border.primary,
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: colors.surface.primary,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              {getIcon(suggestion.type)}
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText
                style={{
                  color: colors.text.primary,
                  fontSize: 14,
                }}
              >
                {suggestion.text}
              </ThemedText>
              {suggestion.subtitle && (
                <ThemedText
                  style={{
                    color: colors.text.tertiary,
                    fontSize: 12,
                    marginTop: 2,
                  }}
                >
                  {suggestion.subtitle}
                </ThemedText>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Alternative version with enhanced styling and glass effect
export const EnhancedSearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  onSuggestionPress,
}) => {
  const { colors, isDarkTheme, glass, shadows } = useModernTheme();

  const getIconConfig = (type: SearchSuggestion["type"]) => {
    switch (type) {
      case "trending":
        return {
          icon: TrendingUp,
          color: colors.accents.green.main,
          backgroundColor: colors.accents.green.light,
        };
      case "topic":
        return {
          icon: Hash,
          color: colors.accents.blue.main,
          backgroundColor: colors.accents.blue.light,
        };
      case "user":
        return {
          icon: User,
          color: colors.accents.purple.main,
          backgroundColor: colors.accents.purple.light,
        };
      case "repository":
        return {
          icon: BookOpen,
          color: colors.accents.orange.main,
          backgroundColor: colors.accents.orange.light,
        };
    }
  };

  return (
    <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
      <View
        style={{
          ...glass.medium,
          borderRadius: 16,
          padding: 16,
          ...shadows.sm,
        }}
      >
        <ThemedText
          style={{
            color: colors.text.primary,
            fontWeight: "600",
            fontSize: 16,
            marginBottom: 16,
          }}
        >
          Suggestions
        </ThemedText>

        {suggestions.map((suggestion, index) => {
          const iconConfig = getIconConfig(suggestion.type);
          const IconComponent = iconConfig.icon;

          return (
            <TouchableOpacity
              key={suggestion.id}
              onPress={() => onSuggestionPress(suggestion)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                borderBottomWidth: index === suggestions.length - 1 ? 0 : 0.5,
                borderBottomColor: colors.border.secondary,
                opacity: 1,
              }}
              activeOpacity={0.7}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: iconConfig.backgroundColor,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <IconComponent size={18} color={iconConfig.color} />
              </View>
              <View style={{ flex: 1 }}>
                <ThemedText
                  style={{
                    color: colors.text.primary,
                    fontSize: 15,
                    fontWeight: "500",
                  }}
                >
                  {suggestion.text}
                </ThemedText>
                {suggestion.subtitle && (
                  <ThemedText
                    style={{
                      color: colors.text.tertiary,
                      fontSize: 13,
                      marginTop: 2,
                    }}
                  >
                    {suggestion.subtitle}
                  </ThemedText>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
