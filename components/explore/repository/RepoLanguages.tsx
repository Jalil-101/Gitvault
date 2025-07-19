// components/RepoLanguages.tsx
import React from "react";
import { View, Text } from "react-native";
import { Repository, DetailConfig } from "@/types/repository";
import { useModernThemeColor } from "@/hooks/useThemeColor";

interface RepoLanguagesProps {
  repository: Repository;
  config: DetailConfig;
}

export const RepoLanguages: React.FC<RepoLanguagesProps> = ({
  repository,
  config,
}) => {
  const { colors } = useModernThemeColor();

  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      Python: "#3572A5",
      Java: "#b07219",
      "C++": "#f34b7d",
      Go: "#00ADD8",
      Rust: "#dea584",
      Swift: "#ffac45",
      Kotlin: "#A97BFF",
      PHP: "#4F5D95",
      HTML: "#e34c26",
      CSS: "#1572b6",
      Shell: "#89e051",
      Ruby: "#701516",
    };
    return colors[language] || "#8b949e";
  };

  const languages = repository.languages || { [repository.language]: 100 };
  const totalBytes = Object.values(languages).reduce(
    (sum, bytes) => sum + bytes,
    0
  );

  const languageEntries = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <View className="px-4 mb-6">
      <Text
        className="text-lg font-semibold mb-4"
        style={{ color: colors.text.primary }}
      >
        Languages
      </Text>

      <View
        className="rounded-xl p-4"
        style={{ backgroundColor: colors.surface.secondary }}
      >
        {/* Language Bar */}
        <View className="flex-row h-2 rounded-full overflow-hidden mb-4">
          {languageEntries.map(([language, bytes], index) => (
            <View
              key={index}
              style={{
                backgroundColor: getLanguageColor(language),
                width: `${(bytes / totalBytes) * 100}%`,
              }}
            />
          ))}
        </View>

        {/* Language List */}
        {languageEntries.map(([language, bytes], index) => (
          <View
            key={index}
            className="flex-row items-center justify-between mb-2"
          >
            <View className="flex-row items-center">
              <View
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: getLanguageColor(language) }}
              />
              <Text className="text-sm" style={{ color: colors.text.primary }}>
                {language}
              </Text>
            </View>
            <Text className="text-sm" style={{ color: colors.text.tertiary }}>
              {((bytes / totalBytes) * 100).toFixed(1)}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
