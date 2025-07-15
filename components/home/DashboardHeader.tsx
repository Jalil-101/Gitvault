import React from "react";
import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import { Bell } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";

export default function DashboardHeader() {
  const { colors, shadows } = useModernTheme();

  return (
    <View className="px-5 py-4">
      <View
        className="p-4 rounded-2xl flex-row items-center justify-between"
        style={{
          backgroundColor: colors.surface.secondary,
          borderWidth: 1,
          borderColor: colors.border.glass,
          ...Platform.select({
            ios: shadows.sm,
            android: { elevation: 4 },
          }),
        }}
      >
        {/* Profile Section */}
        <View className="flex-row items-center">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
            }}
            className="w-10 h-10 rounded-full mr-3"
          />
          <View>
            <Text className="text-sm" style={{ color: colors.text.tertiary }}>
              Good evening
            </Text>
            <Text
              className="text-base font-semibold"
              style={{ color: colors.text.primary }}
            >
              @developer
            </Text>
          </View>
        </View>

        {/* Notification Bell */}
        <TouchableOpacity className="p-2" activeOpacity={0.7}>
          <Bell size={22} color={colors.text.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
