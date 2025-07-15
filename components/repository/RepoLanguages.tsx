// components/RepoLanguages.tsx
import React from "react";
import { View, Text } from "react-native";
import { Repository } from "@/types/repo";
import { useModernTheme } from "@/context/ThemeContext";
import { useThemeClasses } from "@/hooks/useThemeColor";

interface RepoLanguagesProps {
  repository: Repository;
}

export const RepoLanguages: React.FC<RepoLanguagesProps> = ({ repository }) => {
  const { colors } = useModernTheme();
  const themeClasses = useThemeClasses();

  const getLanguageColor = (language: string): string => {
    const languageColors: Record<string, string> = {
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
    return languageColors[language] || colors.text.tertiary;
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
        className={`${themeClasses.text.primary} text-lg font-semibold mb-4`}
      >
        Languages
      </Text>

      <View
        className={`rounded-xl p-4 ${themeClasses.surface.elevated}`}
        style={{ shadowColor: 'rgba(0, 0, 0, 0.1)', shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 }}
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
              <Text className={`${themeClasses.text.primary} text-sm`}>
                {language}
              </Text>
            </View>
            <Text className={`${themeClasses.text.tertiary} text-sm`}>
              {((bytes / totalBytes) * 100).toFixed(1)}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
