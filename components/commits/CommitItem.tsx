// components/commits/CommitItem.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { CommitAuthorInfo } from "./CommitAuthorInfo";
import { CommitShaInfo } from "./CommitShaInfo";
import { CommitItemProps } from "@/types/commits";

export const CommitItem: React.FC<CommitItemProps> = ({ commit, onPress }) => {
  const { colors, shadows } = useModernTheme();

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: colors.surface.secondary,
          marginHorizontal: 16,
          marginBottom: 12,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.border.primary,
        },
        shadows.sm,
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text
            style={{
              color: colors.text.primary,
              fontWeight: "500",
              fontSize: 16,
              lineHeight: 20,
              marginBottom: 8,
            }}
          >
            {commit.message}
          </Text>

          <CommitAuthorInfo
            avatar={commit.avatar}
            author={commit.author}
            date={commit.date}
          />

          <CommitShaInfo
            sha={commit.sha}
            additions={commit.additions}
            deletions={commit.deletions}
          />
        </View>

        <ChevronRight size={16} color={colors.text.quaternary} />
      </View>
    </TouchableOpacity>
  );
};
