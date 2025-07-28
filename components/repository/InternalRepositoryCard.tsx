// components/repository/InternalRepositoryCard.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { Repository } from "@/types/repo/repository";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatDate } from "../../utils/formatters";

interface InternalRepositoryCardProps {
  repository: Repository;
  onPress?: () => void;
  onOptionsPress?: () => void;
}

export const InternalRepositoryCard: React.FC<InternalRepositoryCardProps> = ({
  repository,
  onPress,
  onOptionsPress,
}) => {
  const router = useRouter();
  const { colors, shadows } = useModernTheme();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Default navigation
      router.push(`/repository/${repository.id}`);
    }
  };

  const cardStyles = StyleSheet.create({
    card: {
      backgroundColor: colors.surface.primary,
      padding: 16,
      marginHorizontal: 16,
      marginVertical: 4,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border.primary,
      ...shadows.sm,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    repoName: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.status.info.main,
      flex: 1,
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: repository.isPrivate
        ? colors.status.warning.light
        : colors.status.success.light,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: "600",
      color: repository.isPrivate
        ? colors.status.warning.main
        : colors.status.success.main,
    },
    description: {
      color: colors.text.secondary,
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 12,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    ownerInfo: {
      flexDirection: "row",
      alignItems: "center",
    },
    ownerText: {
      fontSize: 12,
      color: colors.text.tertiary,
    },
    updatedText: {
      fontSize: 12,
      color: colors.text.tertiary,
    },
  });

  return (
    <TouchableOpacity style={cardStyles.card} onPress={handlePress}>
      <View style={cardStyles.header}>
        <Text style={cardStyles.repoName} numberOfLines={1}>
          {repository.name}
        </Text>
        <View style={cardStyles.badge}>
          <Text style={cardStyles.badgeText}>
            {repository.isPrivate ? "Private" : "Public"}
          </Text>
        </View>
      </View>

      {repository.description && (
        <Text style={cardStyles.description} numberOfLines={2}>
          {repository.description}
        </Text>
      )}

      <View style={cardStyles.footer}>
        <View style={cardStyles.ownerInfo}>
          <Text style={cardStyles.ownerText}>
            {repository.owner
              ? `${repository.owner.firstName} ${repository.owner.lastName}`
              : "Unknown Owner"}
          </Text>
          {(repository as any).language && (
            <Text style={[cardStyles.ownerText, { marginLeft: 8 }]}>
              • {(repository as any).language}
            </Text>
          )}
        </View>
        <View style={{ alignItems: "flex-end" }}>
          {(repository as any).starCount > 0 && (
            <Text style={[cardStyles.ownerText, { marginBottom: 2 }]}>
              ⭐ {(repository as any).starCount}
            </Text>
          )}
          <Text style={cardStyles.updatedText}>
            Updated {formatDate(repository.updatedAt || "")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
