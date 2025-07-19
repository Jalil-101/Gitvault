// components/RepositoryList.tsx
import React from "react";
import { ScrollView, View, Text, RefreshControl } from "react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { Repository } from "@/types/starRepository";
import { RepositoryItem } from "./RepositoryItem";

interface RepositoryListProps {
  repositories: Repository[];
  refreshing: boolean;
  onRefresh: () => void;
  onRepositoryPress?: (repository: Repository) => void;
  onStarToggle?: (repository: Repository) => void;
  emptyMessage?: string;
}

export const RepositoryList: React.FC<RepositoryListProps> = ({
  repositories,
  refreshing,
  onRefresh,
  onRepositoryPress,
  onStarToggle,
  emptyMessage = "No repositories found",
}) => {
  const { colors } = useModernTheme();

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.text.primary}
          colors={[colors.accents.blue.main]}
          progressBackgroundColor={colors.surface.secondary}
        />
      }
    >
      <View style={{ paddingVertical: 16 }}>
        {repositories.length > 0 ? (
          repositories.map((repository) => (
            <RepositoryItem
              key={repository.id}
              repository={repository}
              onPress={onRepositoryPress}
              onStarToggle={onStarToggle}
            />
          ))
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 80,
            }}
          >
            <Text style={{ color: colors.text.tertiary, fontSize: 16 }}>
              {emptyMessage}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
