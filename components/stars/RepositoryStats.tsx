// components/RepositoryStats.tsx
import React from "react";
import { View, Text } from "react-native";
import { Star, GitFork, Circle } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { formatNumber } from "@/utils/formatNumber";

interface RepositoryStatsProps {
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
}

export const RepositoryStats: React.FC<RepositoryStatsProps> = ({
  language,
  languageColor,
  stars,
  forks,
}) => {
  const { colors } = useModernTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Circle size={12} color={languageColor} fill={languageColor} />
        <Text
          style={{ color: colors.text.tertiary, fontSize: 12, marginLeft: 4 }}
        >
          {language}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Star
            size={14}
            color={colors.accents.orange.main}
            fill={colors.accents.orange.main}
          />
          <Text
            style={{ color: colors.text.tertiary, fontSize: 12, marginLeft: 4 }}
          >
            {formatNumber(stars)}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <GitFork size={14} color={colors.text.quaternary} />
          <Text
            style={{ color: colors.text.tertiary, fontSize: 12, marginLeft: 4 }}
          >
            {formatNumber(forks)}
          </Text>
        </View>
      </View>
    </View>
  );
};
