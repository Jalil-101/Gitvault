// components/RepositoryCard.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Repository } from "../types/repository";
import { useModernTheme } from "@/context/ThemeContext";

interface RepositoryCardProps {
  repository: Repository;
  onPress: () => void;
  onOptionsPress: () => void;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  repository,
  onPress,
  onOptionsPress,
}) => {
  const { colors, shadows } = useModernTheme();

  const dynamicStyles = StyleSheet.create({
    card: {
      backgroundColor: colors.surface.primary,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border.primary,
      ...shadows.sm,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    nameContainer: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text.primary,
      marginLeft: 8,
      flex: 1,
    },
    optionsButton: {
      padding: 4,
    },
    description: {
      fontSize: 14,
      color: colors.text.secondary,
      lineHeight: 20,
      marginBottom: 12,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    visibilityBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      backgroundColor: colors.surface.secondary,
    },
    visibilityText: {
      fontSize: 12,
      fontWeight: "500",
    },
    updatedText: {
      fontSize: 12,
      color: colors.text.quaternary,
    },
  });

  return (
    <TouchableOpacity style={dynamicStyles.card} onPress={onPress}>
      <View style={dynamicStyles.cardHeader}>
        <View style={dynamicStyles.nameContainer}>
          <Ionicons
            name={repository.isPrivate ? "lock-closed" : "folder-outline"}
            size={20}
            color={
              repository.isPrivate
                ? colors.status.warning.main
                : colors.accents.green.main
            }
          />
          <Text style={dynamicStyles.name} numberOfLines={1}>
            {repository.name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onOptionsPress}
          style={dynamicStyles.optionsButton}
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={20}
            color={colors.text.tertiary}
          />
        </TouchableOpacity>
      </View>

      <Text style={dynamicStyles.description} numberOfLines={2}>
        {repository.description}
      </Text>

      <View style={dynamicStyles.footer}>
        <View style={dynamicStyles.visibilityBadge}>
          <Text
            style={[
              dynamicStyles.visibilityText,
              {
                color: repository.isPrivate
                  ? colors.status.warning.main
                  : colors.accents.green.main,
              },
            ]}
          >
            {repository.isPrivate ? "Private" : "Public"}
          </Text>
        </View>
        {repository.updatedAt && (
          <Text style={dynamicStyles.updatedText}>
            Updated {new Date(repository.updatedAt).toLocaleDateString()}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
