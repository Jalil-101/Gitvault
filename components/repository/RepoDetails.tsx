// components/RepoDetails.tsx
import React from "react";
import { View, Text } from "react-native";
import { Repository } from "@/types/repo";
import { useModernTheme } from "@/context/ThemeContext";
import { useThemeClasses } from "@/hooks/useThemeColor";

interface RepoDetailsProps {
  repository: Repository;
}

export const RepoDetails: React.FC<RepoDetailsProps> = ({ repository }) => {
  const { colors } = useModernTheme();
  const themeClasses = useThemeClasses();

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
        className={`${themeClasses.text.primary} text-lg font-semibold mb-4`}
      >
        Details
      </Text>

      <View
        className={`rounded-xl p-4 ${themeClasses.surface.elevated}`}
        style={{ shadowColor: colors.shadow.md, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 }}
      >
        {details.map((detail, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center py-2"
          >
            <Text className={`${themeClasses.text.tertiary} text-sm`}>
              {detail.label}
            </Text>
            <Text
              className={`${themeClasses.text.primary} text-sm font-medium`}
            >
              {detail.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
