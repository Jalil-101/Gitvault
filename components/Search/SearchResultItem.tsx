// components/search/SearchResultItem.tsx
import { ThemedText } from "@/components/ThemedText";
import { useModernTheme } from "@/context/ThemeContext";
import { GitFork, Globe, Lock, Star } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export interface SearchResult {
  id: string;
  type: "repository" | "user" | "topic";
  title: string;
  subtitle?: string;
  description?: string;
  language?: string;
  stars?: number;
  forks?: number;
  avatar?: string;
  verified?: boolean;
  isPrivate?: boolean;
  ownerId?: string;
}

interface SearchResultItemProps {
  item: SearchResult;
  onPress: (item: SearchResult) => void;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  item,
  onPress,
}) => {
  const { colors, shadows } = useModernTheme();

  const getLanguageColor = (language: string) => {
    const languageColors: Record<string, string> = {
      JavaScript: "#F7DF1E",
      TypeScript: "#3178C6",
      Python: "#3776AB",
      Java: "#ED8B00",
      React: "#61DAFB",
      Vue: "#4FC08D",
      Angular: "#DD0031",
    };
    return languageColors[language] || colors.text.tertiary;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.surface.secondary,
      marginHorizontal: 20,
      marginBottom: 16,
      padding: 18,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border.secondary,
      ...shadows.sm,
    },
    header: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    titleContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text.primary,
      marginRight: 8,
    },
    privacyIcon: {
      marginLeft: 4,
    },
    verifiedBadge: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.interactive.primary,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 8,
    },
    verifiedText: {
      color: colors.text.inverse,
      fontSize: 10,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 14,
      color: colors.text.tertiary,
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: colors.text.secondary,
      lineHeight: 20,
      marginBottom: 12,
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    stats: {
      flexDirection: "row",
      alignItems: "center",
    },
    stat: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 16,
    },
    statText: {
      fontSize: 12,
      color: colors.text.tertiary,
      marginLeft: 4,
    },
    languageContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    languageDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 6,
    },
    languageText: {
      fontSize: 12,
      color: colors.text.tertiary,
    },
  });

  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.title} numberOfLines={1}>
            {item.title}
          </ThemedText>

          {/* Privacy indicator */}
          {item.isPrivate !== undefined && (
            <View style={styles.privacyIcon}>
              {item.isPrivate ? (
                <Lock size={14} color={colors.status.error.main} />
              ) : (
                <Globe size={14} color={colors.status.success.main} />
              )}
            </View>
          )}

          {item.verified && (
            <View style={styles.verifiedBadge}>
              <ThemedText style={styles.verifiedText}>✓</ThemedText>
            </View>
          )}
        </View>
      </View>

      {item.subtitle && (
        <ThemedText style={styles.subtitle} numberOfLines={1}>
          {item.subtitle}
        </ThemedText>
      )}

      {item.description && (
        <ThemedText style={styles.description} numberOfLines={2}>
          {item.description}
        </ThemedText>
      )}

      <View style={styles.footer}>
        <View style={styles.stats}>
          {item.stars !== undefined && (
            <View style={styles.stat}>
              <Star size={14} color={colors.text.tertiary} />
              <ThemedText style={styles.statText}>
                {formatNumber(item.stars)}
              </ThemedText>
            </View>
          )}

          {item.forks !== undefined && (
            <View style={styles.stat}>
              <GitFork size={14} color={colors.text.tertiary} />
              <ThemedText style={styles.statText}>
                {formatNumber(item.forks)}
              </ThemedText>
            </View>
          )}
        </View>

        {item.language && (
          <View style={styles.languageContainer}>
            <View
              style={[
                styles.languageDot,
                { backgroundColor: getLanguageColor(item.language) },
              ]}
            />
            <ThemedText style={styles.languageText}>{item.language}</ThemedText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
