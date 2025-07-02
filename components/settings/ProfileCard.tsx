// components/settings/ProfileCard.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useModernThemeColor } from "../../hooks/useThemeColor";

interface ProfileCardProps {
  name: string;
  username: string;
  avatar: string;
  isOnline?: boolean;
  onPress?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  username,
  avatar,
  isOnline = false,
  onPress,
}) => {
  const { surface, text, status } = useModernThemeColor();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="mx-4 mb-6 p-4 rounded-2xl flex-row items-center"
      style={{ backgroundColor: surface.secondary }}
    >
      <View className="relative">
        <Image source={{ uri: avatar }} className="w-16 h-16 rounded-full" />
        {isOnline && (
          <View
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2"
            style={{
              backgroundColor: status.success.main,
              borderColor: surface.secondary,
            }}
          />
        )}
      </View>

      <View className="flex-1 ml-4">
        <Text
          className="text-lg font-semibold"
          style={{ color: text.primary }}
        >
          {name}
        </Text>
        <Text className="text-sm" style={{ color: text.tertiary }}>
          {username}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={text.quaternary}
      />
    </TouchableOpacity>
  );
};