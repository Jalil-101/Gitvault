// components/explore/ExploreHeader.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { Search, Bell, Menu } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useModernTheme } from "@/context/ThemeContext";

interface ExploreHeaderProps {
  onSearch?: (query: string) => void;
  onNotificationPress?: () => void;
  onMenuPress?: () => void;
}

export const ExploreHeader: React.FC<ExploreHeaderProps> = ({
  onSearch,
  onNotificationPress,
  onMenuPress,
}) => {
  const { colors, isDarkTheme, shadows } = useModernTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  // Enhanced status bar height calculation
  const getStatusBarPadding = () => {
    if (Platform.OS === "ios") {
      return 44; // Standard iOS status bar + safe area
    } else {
      return (StatusBar.currentHeight || 24) + 8; // Android status bar + extra padding
    }
  };

  return (
    <View
      className="px-5 py-4"
      style={{
        backgroundColor: colors.background.primary,
        paddingTop: getStatusBarPadding(),
      }}
    >
      {/* Header Row */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity
          onPress={onMenuPress}
          className="p-3 rounded-2xl"
          style={{
            backgroundColor: colors.surface.secondary,
            borderWidth: 1,
            borderColor: `${colors.accents.blue.main}20`,
            ...shadows.sm,
          }}
        >
          <LinearGradient
            colors={[colors.accents.blue.main, colors.accents.blue.light]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="absolute inset-0 rounded-2xl opacity-10"
          />
          <Menu size={20} color={colors.accents.blue.main} />
        </TouchableOpacity>

        <Text
          className="text-xl font-semibold leading-6"
          style={{ color: colors.text.primary }}
        >
          Explore
        </Text>

        <TouchableOpacity
          onPress={onNotificationPress}
          className="p-3 rounded-2xl relative"
          style={{
            backgroundColor: colors.surface.secondary,
            borderWidth: 1,
            borderColor: `${colors.accents.purple.main}20`,
            ...shadows.sm,
          }}
        >
          <LinearGradient
            colors={[colors.accents.purple.main, colors.accents.purple.light]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="absolute inset-0 rounded-2xl opacity-10"
          />
          <Bell size={20} color={colors.accents.purple.main} />
          {/* Enhanced Notification Badge */}
          <View
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full items-center justify-center"
            style={{
              backgroundColor: colors.status.error.main,
              ...shadows.sm,
            }}
          >
            <View
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colors.surface.primary }}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Enhanced Search Bar */}
      <View
        className="flex-row items-center px-5 py-4 rounded-2xl"
        style={{
          backgroundColor: colors.surface.secondary,
          borderColor: `${colors.accents.blue.main}15`,
          borderWidth: 2,
          ...shadows.md,
        }}
      >
        <View
          className="w-8 h-8 rounded-xl items-center justify-center mr-4"
          style={{ backgroundColor: `${colors.accents.blue.main}15` }}
        >
          <Search size={18} color={colors.accents.blue.main} />
        </View>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search repositories, users, topics..."
          placeholderTextColor={colors.text.quaternary}
          className="flex-1 text-base font-medium"
          style={{ color: colors.text.primary }}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={handleSearch}
            className="w-8 h-8 rounded-xl items-center justify-center ml-2"
            style={{ backgroundColor: colors.accents.blue.main }}
          >
            <LinearGradient
              colors={[colors.accents.blue.main, colors.accents.blue.light]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="absolute inset-0 rounded-xl"
            />
            <Search size={16} color={colors.surface.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
