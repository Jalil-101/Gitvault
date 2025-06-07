// components/home/IssueCard.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { Issue } from "@/types";
import { formatTimeAgo } from "@/utils/helpers";

interface IssueCardProps {
  issue: Issue;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const { colors } = useTheme();
  const isOpen = issue.state === "open";

  return (
    <TouchableOpacity
      className="mx-4 mb-4 p-4 rounded-lg border"
      style={{
        backgroundColor: colors.canvas.default,
        borderColor: colors.border.default,
      }}
      activeOpacity={0.8}
    >
      <View className="flex-row items-start mb-3">
        <View
          className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5"
          style={{
            backgroundColor: isOpen
              ? colors.success.subtle
              : colors.danger.subtle,
          }}
        >
          <Ionicons
            name={isOpen ? "alert-circle" : "checkmark-circle"}
            size={14}
            color={isOpen ? colors.success.fg : colors.danger.fg}
          />
        </View>

        <View className="flex-1">
          <Text
            className="text-base font-semibold mb-1"
            style={{ color: colors.fg.default }}
            numberOfLines={2}
          >
            {issue.title}
          </Text>

          <Text className="text-sm mb-2" style={{ color: colors.fg.muted }}>
            #{issue.number} • {issue.repository.full_name}
          </Text>

          {issue.body && (
            <Text
              className="text-sm mb-3 leading-5"
              style={{ color: colors.fg.muted }}
              numberOfLines={2}
            >
              {issue.body}
            </Text>
          )}

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Image
                source={{ uri: issue.user.avatar_url }}
                className="w-5 h-5 rounded-full mr-2"
              />
              <Text className="text-xs" style={{ color: colors.fg.muted }}>
                {issue.user.login} • {formatTimeAgo(issue.updated_at)}
              </Text>
            </View>

            <View
              className="px-2 py-1 rounded-full"
              style={{
                backgroundColor: isOpen
                  ? colors.success.subtle
                  : colors.danger.subtle,
              }}
            >
              <Text
                className="text-xs font-medium capitalize"
                style={{
                  color: isOpen ? colors.success.fg : colors.danger.fg,
                }}
              >
                {issue.state}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
