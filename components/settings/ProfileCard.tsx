// components/settings/ProfileCard.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProfileCardProps {
  name: string;
  username: string;
  avatar: string;
  isOnline?: boolean;
  showArrow?: boolean;
  onPress?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  username,
  avatar,
  isOnline = false,
  showArrow = true,
  onPress,
}) => {
  const { colors, shadows } = useModernTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="mx-4 mb-6 p-4 rounded-2xl flex-row items-center"
      style={{
        backgroundColor: colors.surface.secondary,
        ...shadows.sm,
      }}
    >
      <View className="relative">
        <Image source={{ uri: avatar }} className="w-16 h-16 rounded-full" />
        {isOnline && (
          <View
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2"
            style={{
              backgroundColor: colors.status.success.main,
              borderColor: colors.surface.secondary,
            }}
          />
        )}
      </View>

      <View className="flex-1 ml-4">
        <Text
          className="text-lg font-semibold"
          style={{ color: colors.text.primary }}
        >
          {name}
        </Text>
        <Text className="text-sm" style={{ color: colors.text.secondary }}>
          {username}
        </Text>
      </View>

      {showArrow && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.text.tertiary}
        />
      )}
    </TouchableOpacity>
  );
};
