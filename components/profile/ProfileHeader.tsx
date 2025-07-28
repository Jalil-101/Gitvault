// components/profile/ProfileHeader.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { useAuthStore } from "@/store/authStore";
import { UserProfile } from "@/types/profile";
import { Link } from "expo-router";
import { Bell, Calendar, Settings } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

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
  const authUser = useAuthStore((state) => state.user);

  // Use the same image as DashboardHeader
  const profileImageUrl =
    "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=";

  // Function to get actual join date
  const getJoinDate = () => {
    // Try to get from auth store first (if user has signup date)
    if (authUser) {
      // For now, we'll use a fallback since auth store doesn't store signup date
      // In a real app, you'd get this from the user's profile data
      return "January 2024"; // Placeholder - replace with actual logic
    }
    return joinedDate || "January 2024"; // Fallback to prop or default
  };

  return (
    <View className="px-6 pt-4 pb-6">
      {/* Top Actions - Slightly reduced size */}
      <View className="flex-row justify-end mb-6">
        <TouchableOpacity
          onPress={onNotificationPress}
          className="p-4 rounded-full mr-4"
          style={{ backgroundColor: colors.surface.secondary }}
        >
          <Link href="/screens/SearchScreen">
            <Bell size={24} color={colors.text.primary} />
          </Link>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSettingsPress}
          className="p-4 rounded-full"
          style={{ backgroundColor: colors.surface.secondary }}
        >
          <Link href="/screens/SettingsScreen">
            <Settings size={24} color={colors.text.primary} />
          </Link>
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View className="items-center mb-6">
        <View className="relative mb-4">
          <Image
            source={{ uri: profileImageUrl }}
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

        {/* Show actual join date */}
        <View className="flex-row items-center mb-4">
          <Calendar size={18} color={colors.text.tertiary} />
          <Text
            className="text-base ml-2"
            style={{ color: colors.text.secondary }}
          >
            Joined {getJoinDate()}
          </Text>
        </View>
      </View>
    </View>
  );
};
