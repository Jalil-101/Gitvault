// components/commits/CommitShaInfo.tsx
import React from "react";
import { View, Text } from "react-native";
import { GitCommit } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { CommitStats } from "./CommitStats";
import { CommitShaInfoProps } from "@/types/commits";

export const CommitShaInfo: React.FC<CommitShaInfoProps> = ({
  sha,
  additions,
  deletions,
}) => {
  const { colors } = useModernTheme();

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <GitCommit size={14} color={colors.text.quaternary} />
      <Text
        style={{
          color: colors.text.tertiary,
          fontSize: 14,
          marginLeft: 4,
          fontFamily: "monospace",
        }}
      >
        {sha}
      </Text>
      <CommitStats additions={additions} deletions={deletions} />
    </View>
  );
};
