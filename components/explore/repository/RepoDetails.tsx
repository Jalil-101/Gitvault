// components/RepoDetails.tsx
import React from "react";
import { View, Text } from "react-native";
import { Repository, DetailConfig } from "@/types/repository";
import { useModernThemeColor } from "@/hooks/useThemeColor";

interface RepoDetailsProps {
  repository: Repository;
  config: DetailConfig;
}

export const RepoDetails: React.FC<RepoDetailsProps> = ({
  repository,
  config,
}) => {
  const { colors } = useModernThemeColor();

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatSize = (bytes: number): string => {
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${bytes} B`;
  };

  const details = [
    { label: "Default Branch", value: repository.defaultBranch || "main" },
    { label: "License", value: repository.license || "No license" },
    { label: "Repository Size", value: formatSize(repository.size || 0) },
    {
      label: "Created",
      value: formatDate(repository.createdAt || repository.updatedAt),
    },
    { label: "Last Updated", value: formatDate(repository.updatedAt) },
    {
      label: "Last Push",
      value: formatDate(repository.pushedAt || repository.updatedAt),
    },
  ];

  return (
    <View className="px-4 mb-6">
      <Text
        className="text-lg font-semibold mb-4"
        style={{ color: colors.text.primary }}
      >
        Details
      </Text>

      <View
        className="rounded-xl p-4"
        style={{ backgroundColor: colors.surface.secondary }}
      >
        {details.map((detail, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center py-2"
          >
            <Text className="text-sm" style={{ color: colors.text.tertiary }}>
              {detail.label}
            </Text>
            <Text
              className="text-sm font-medium"
              style={{ color: colors.text.primary }}
            >
              {detail.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
