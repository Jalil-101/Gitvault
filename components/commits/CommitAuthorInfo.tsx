// components/commits/CommitAuthorInfo.tsx
import React from "react";
import { View, Text } from "react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { CommitAuthorInfoProps } from "@/types/commits";

export const CommitAuthorInfo: React.FC<CommitAuthorInfoProps> = ({
  avatar,
  author,
  date,
}) => {
  const { colors } = useModernTheme();

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
    >
      <Text style={{ fontSize: 20, marginRight: 8 }}>{avatar}</Text>
      <Text style={{ color: colors.text.tertiary, fontSize: 14 }}>
        {author}
      </Text>
      <View
        style={{
          width: 4,
          height: 4,
          backgroundColor: colors.text.muted,
          borderRadius: 2,
          marginHorizontal: 8,
        }}
      />
      <Text style={{ color: colors.text.tertiary, fontSize: 14 }}>{date}</Text>
    </View>
  );
};
