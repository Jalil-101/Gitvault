// components/commits/CommitStats.tsx
import React from "react";
import { View, Text } from "react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { CommitStatsProps } from "@/types/commits";

export const CommitStats: React.FC<CommitStatsProps> = ({
  additions,
  deletions,
}) => {
  const { colors } = useModernTheme();

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginLeft: 16 }}
    >
      <Text style={{ color: colors.status.success.main, fontSize: 12 }}>
        +{additions}
      </Text>
      <Text
        style={{ color: colors.status.error.main, fontSize: 12, marginLeft: 4 }}
      >
        -{deletions}
      </Text>
    </View>
  );
};

// =============================================================================

