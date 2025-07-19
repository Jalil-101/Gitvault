// components/RepositoryItem.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Star } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { Repository } from "@/types/starRepository";
import { RepositoryStats } from "./RepositoryStats";

interface RepositoryItemProps {
  repository: Repository;
  onPress?: (repository: Repository) => void;
  onStarToggle?: (repository: Repository) => void;
}

export const RepositoryItem: React.FC<RepositoryItemProps> = ({
  repository,
  onPress,
  onStarToggle,
}) => {
  const { colors } = useModernTheme();

  const handlePress = () => {
    onPress?.(repository);
  };

  const handleStarToggle = () => {
    onStarToggle?.(repository);
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.surface.secondary,
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border.primary,
      }}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <Text
              style={{
                color: colors.accents.blue.main,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {repository.owner}/
            </Text>
            <Text
              style={{
                color: colors.accents.blue.main,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {repository.name}
            </Text>
          </View>

          <Text
            style={{
              color: colors.text.secondary,
              fontSize: 14,
              lineHeight: 20,
              marginBottom: 12,
            }}
          >
            {repository.description}
          </Text>

          <RepositoryStats
            language={repository.language}
            languageColor={repository.languageColor}
            stars={repository.stars}
            forks={repository.forks}
          />

          <Text
            style={{ color: colors.text.muted, fontSize: 12, marginTop: 8 }}
          >
            Updated {repository.updatedAt}
          </Text>
        </View>

        <TouchableOpacity style={{ marginLeft: 8 }} onPress={handleStarToggle}>
          <Star
            size={20}
            color={colors.accents.orange.main}
            fill={colors.accents.orange.main}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
