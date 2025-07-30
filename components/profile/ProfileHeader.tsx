// components/profile/ProfileHeader.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { useAuthStore } from "@/store/authStore";
import { UserProfile } from "@/types/profile";
import { format } from "date-fns";
import { Bell, Calendar, Mail, Settings } from "lucide-react-native";
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
    if (authUser && authUser.accountCreatedAt) {
      try {
        const joinDate = new Date(authUser.accountCreatedAt);
        // Check if the date is valid
        if (isNaN(joinDate.getTime())) {
          console.log("⚠️ Invalid date format:", authUser.accountCreatedAt);
          return joinedDate || "January 2024";
        }

        // Log the detailed date for debugging
        const detailedDate = format(joinDate, "MMM dd, yyyy 'at' h:mm a");
        console.log("📅 Account creation date:", detailedDate);

        // Format as "Joined March 2024" or "Joined Mar 15, 2024" for more recent dates
        const now = new Date();
        const daysDiff = Math.floor(
          (now.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysDiff < 30) {
          // For recent accounts, show more detailed date
          return `Joined ${format(joinDate, "MMM dd, yyyy")}`;
        } else {
          // For older accounts, show month and year
          return `Joined ${format(joinDate, "MMMM yyyy")}`;
        }
      } catch (error) {
        console.log("⚠️ Error formatting date:", error);
        return joinedDate || "January 2024";
      }
    }
    return joinedDate || "January 2024"; // Fallback to prop or default
  };

  // Function to get user email
  const getUserEmail = () => {
    if (authUser && authUser.email) {
      return authUser.email;
    }
    return "user@example.com"; // Fallback
  };

  // Function to get detailed creation date (for debugging or additional info)
  const getDetailedCreationDate = () => {
    if (authUser && authUser.accountCreatedAt) {
      try {
        const joinDate = new Date(authUser.accountCreatedAt);
        if (!isNaN(joinDate.getTime())) {
          return format(joinDate, "MMM dd, yyyy 'at' h:mm a");
        }
      } catch (error) {
        console.log("⚠️ Error formatting detailed date:", error);
      }
    }
    return null;
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
          <Bell size={24} color={colors.text.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSettingsPress}
          className="p-4 rounded-full"
          style={{ backgroundColor: colors.surface.secondary }}
        >
          <Settings size={24} color={colors.text.primary} />
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
            {getJoinDate()}
          </Text>
        </View>

        {/* Show user email */}
        <View className="flex-row items-center mb-4">
          <Mail size={16} color={colors.text.tertiary} />
          <Text
            className="text-sm ml-2"
            style={{ color: colors.text.tertiary }}
          >
            {getUserEmail()}
          </Text>
        </View>
      </View>
    </View>
  );
};
