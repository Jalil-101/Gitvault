// components/home/PullRequestCard.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { PullRequest } from "@/types";
import { formatTimeAgo } from "@/utils/helpers";

interface PullRequestCardProps {
  pullRequest: PullRequest;
}

export const PullRequestCard: React.FC<PullRequestCardProps> = ({
  pullRequest,
}) => {
  const { colors } = useTheme();
  const isOpen = pullRequest.state === "open";
  const isMerged = pullRequest.state === "merged";

  const getStatusColor = () => {
    if (isMerged) return { bg: colors.accent.subtle, fg: colors.accent.fg };
    if (isOpen) return { bg: colors.success.subtle, fg: colors.success.fg };
    return { bg: colors.danger.subtle, fg: colors.danger.fg };
  };

  const getStatusIcon = () => {
    if (isMerged) return "git-merge";
    if (isOpen) return "git-pull-request";
    return "git-pull-request";
  };

  const statusColor = getStatusColor();

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
          style={{ backgroundColor: statusColor.bg }}
        >
          <Ionicons
            name={getStatusIcon() as any}
            size={14}
            color={statusColor.fg}
          />
        </View>

        <View className="flex-1">
          <Text
            className="text-base font-semibold mb-1"
            style={{ color: colors.fg.default }}
            numberOfLines={2}
          >
            {pullRequest.title}
          </Text>

          <Text className="text-sm mb-2" style={{ color: colors.fg.muted }}>
            #{pullRequest.number} • {pullRequest.repository.full_name}
          </Text>

          {pullRequest.body && (
            <Text
              className="text-sm mb-3 leading-5"
              style={{ color: colors.fg.muted }}
              numberOfLines={2}
            >
              {pullRequest.body}
            </Text>
          )}

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Image
                source={{ uri: pullRequest.user.avatar_url }}
                className="w-5 h-5 rounded-full mr-2"
              />
              <Text className="text-xs" style={{ color: colors.fg.muted }}>
                {pullRequest.user.login} •{" "}
                {formatTimeAgo(pullRequest.updated_at)}
              </Text>
            </View>

            <View
              className="px-2 py-1 rounded-full"
              style={{ backgroundColor: statusColor.bg }}
            >
              <Text
                className="text-xs font-medium capitalize"
                style={{ color: statusColor.fg }}
              >
                {pullRequest.state}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
