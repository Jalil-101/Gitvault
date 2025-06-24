import { useModernTheme } from "@/context/ThemeContext";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type StatusColorKey = "success" | "warning" | "error" | "info";
interface ActivityItemProps {
  title: string;
  subtitle: string;
  time: string;
  colorKey: StatusColorKey;
  isLast?: boolean;
  onPress?: () => void;
  avatar?: string;
  user?: string;
}

export default function ActivityItem({
  title,
  subtitle,
  time,
  colorKey,
  isLast = false,
  onPress,
  avatar,
  user,
}: ActivityItemProps) {
  const { colors } = useModernTheme();
  const statusColor = colors.status[colorKey].main;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="flex-row items-center p-4 mb-1 rounded-2xl"
      style={{
        backgroundColor: colors.surface.glass,
      }}
    >
      {/* Avatar */}
      <View className="relative mr-3">
        {avatar ? (
          <Image
            source={{ uri: avatar }}
            className="w-10 h-10 rounded-full"
            style={{
              borderWidth: 1,
              borderColor: colors.border.secondary,
            }}
          />
        ) : (
          <View className="w-10 h-10 rounded-full items-center justify-center bg-gray-300" />
        )}

        {/* Activity indicator */}
        <View
          className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2"
          style={{
            backgroundColor: statusColor,
            borderColor: colors.background.primary,
          }}
        />
      </View>

      {/* Content */}
      <View className="flex-1">
        <Text
          className="text-sm mb-1"
          style={{ color: colors.text.primary }}
          numberOfLines={1}
        >
          {user && (
            <Text
              className="font-bold"
              style={{ color: colors.interactive.primary }}
            >
              {user}{" "}
            </Text>
          )}
          {title}
        </Text>
        <Text
          className="text-xs mb-0.5"
          style={{ color: colors.text.tertiary }}
          numberOfLines={1}
        >
          {subtitle}
        </Text>
        <Text className="text-xs" style={{ color: colors.text.quaternary }}>
          {time} ago
        </Text>
      </View>
    </TouchableOpacity>
  );
}
