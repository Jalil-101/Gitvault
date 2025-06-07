// components/profile/ProfileBio.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { UserProfile } from "@/types/profile";

interface BioItemProps {
  icon: string;
  text: string;
  color: string;
  onPress?: () => void;
  isLink?: boolean;
}

const BioItem: React.FC<BioItemProps> = ({
  icon,
  text,
  color,
  onPress,
  isLink = false,
}) => {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component className="flex-row items-center" onPress={onPress}>
      <View
        className="w-8 h-8 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: color + "20" }}
      >
        <Ionicons name={icon as any} size={16} color={color} />
      </View>
      <Text
        className={`${
          isLink
            ? "text-github-light-accent-emphasis dark:text-github-dark-accent-emphasis"
            : "text-github-light-fg-muted dark:text-github-dark-fg-muted"
        }`}
      >
        {text}
      </Text>
    </Component>
  );
};

interface ProfileBioProps {
  profile: UserProfile;
}

export const ProfileBio: React.FC<ProfileBioProps> = ({ profile }) => {
  const { theme, colors } = useTheme();

  return (
    <View className="px-6 pb-6">
      <Text className="text-github-light-fg-default dark:text-github-dark-fg-default text-base mb-4 leading-6">
        {profile.bio}
      </Text>

      <View className="space-y-3">
        {profile.company && (
          <BioItem
            icon="business-outline"
            text={profile.company}
            color={colors.accent.emphasis}
          />
        )}

        {profile.location && (
          <BioItem
            icon="location-outline"
            text={profile.location}
            color={colors.success.emphasis}
          />
        )}

        {profile.website && (
          <BioItem
            icon="link-outline"
            text={profile.website}
            color={colors.attention.emphasis}
            onPress={() => console.log("Open website")}
            isLink
          />
        )}

        <BioItem
          icon="calendar-outline"
          text={profile.joinedDate}
          color={colors.fg.muted}
        />
      </View>
    </View>
  );
};
