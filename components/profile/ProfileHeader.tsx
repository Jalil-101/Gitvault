// components/profile/ProfileHeader.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  Bell,
  Settings,
  Building,
  MapPin,
  Calendar,
} from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { UserProfile } from "@/types/profile";
import { Link, useRouter } from "expo-router";

interface ProfileHeaderProps extends UserProfile {
  onNotificationPress?: () => void;
  onSettingsPress?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userName,
  displayName,
  avatarUrl,
  bio,
  location,
  company,
  joinedDate,
  onNotificationPress,
  onSettingsPress,
}) => {
  const { colors } = useModernTheme();

  return (
    <View className="px-6 pt-4 pb-6">
      {/* Top Actions */}
      <View className="flex-row justify-end mb-4">
        <TouchableOpacity
          onPress={onNotificationPress}
          className="p-3 rounded-full mr-2"
          style={{ backgroundColor: colors.surface.secondary }}
        >
          <Link href="/screens/SearchScreen">
            <Bell size={20} color={colors.text.primary} />
          </Link>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSettingsPress}
          className="p-3 rounded-full"
          style={{ backgroundColor: colors.surface.secondary }}
        >
          <Link href="/screens/SettingsScreen">
            <Settings size={20} color={colors.text.primary} />
          </Link>
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View className="items-center mb-6">
        <View className="relative mb-4">
          <Image
            source={{ uri: avatarUrl }}
            className="w-24 h-24 rounded-full"
            style={{ backgroundColor: colors.surface.secondary }}
          />
          <View
            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full items-center justify-center border-2"
            style={{
              backgroundColor: colors.accents.green.main,
              borderColor: colors.background.primary,
            }}
          >
            <View className="w-3 h-3 rounded-full bg-white" />
          </View>
        </View>

        <Text
          className="text-2xl font-bold mb-1"
          style={{ color: colors.text.primary }}
        >
          {displayName}
        </Text>

        <Text
          className="text-base mb-4"
          style={{ color: colors.text.secondary }}
        >
          @{userName}
        </Text>

        {bio && (
          <Text
            className="text-center text-base leading-6 mb-4 px-4"
            style={{ color: colors.text.primary }}
          >
            {bio}
          </Text>
        )}

        {/* Meta Info */}
        <View className="flex-row items-center justify-center flex-wrap">
          {company && (
            <View className="flex-row items-center mr-4 mb-2">
              <Building size={16} color={colors.text.tertiary} />
              <Text
                className="text-sm ml-2"
                style={{ color: colors.text.secondary }}
              >
                {company}
              </Text>
            </View>
          )}

          {location && (
            <View className="flex-row items-center mr-4 mb-2">
              <MapPin size={16} color={colors.text.tertiary} />
              <Text
                className="text-sm ml-2"
                style={{ color: colors.text.secondary }}
              >
                {location}
              </Text>
            </View>
          )}

          {joinedDate && (
            <View className="flex-row items-center mb-2">
              <Calendar size={16} color={colors.text.tertiary} />
              <Text
                className="text-sm ml-2"
                style={{ color: colors.text.secondary }}
              >
                Joined {joinedDate}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
