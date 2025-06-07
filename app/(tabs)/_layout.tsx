import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useTheme } from "@/context/ThemeContext";


export default function TabLayout() {
  const { isDarkTheme, colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
       

        // Active tab tint color - Uses GitHub's accent blue
        tabBarActiveTintColor: colors.accentBlue, // GitHub's primary blue

        // Inactive tab tint color - Uses muted foreground color
        tabBarInactiveTintColor: isDarkTheme
          ? colors.textSecondary // Dark theme: muted text
          : colors.textSecondary, // Light theme: muted text

        // Tab bar background color - Uses canvas default (card color)
        tabBarStyle: {
          backgroundColor: isDarkTheme
            ? colors.card // Dark theme: canvas overlay
            : colors.card, // Light theme: canvas default (white)
          borderTopColor: isDarkTheme
            ? colors.border.default // Dark theme: border default
            : colors.border.default, // Light theme: border default
          // borderTopWidth: 0.5, // Subtle top border like GitHub
          height: Platform.OS === "ios" ? 60 : 65, // Platform specific heights
          paddingBottom: Platform.OS === "ios" ? 20 : 8, // Safe area padding
          paddingTop: 4,
          ...Platform.select({
            ios: {
              // Use a semi-transparent background on iOS for blur effect
              position: "absolute",
              backgroundColor: isDarkTheme
                ? "rgba(22, 27, 34, 0.95)" // Semi-transparent dark
                : "rgba(255, 255, 255, 0.95)", // Semi-transparent light
            },
            default: {},
          }),
        },

        // Tab label styling
        tabBarLabelStyle: {
          fontSize: 10, // Small font size like GitHub Mobile
          fontWeight: "500", // Medium weight
          marginTop: 2, // Small gap between icon and label
        },

        // Hide header for all tabs (each screen handles its own header)
        headerShown: false,

        // Use haptic feedback button component
        tabBarButton: HapticTab,

        // Use custom tab bar background component
        tabBarBackground: TabBarBackground,
      }}
    >
      {/* ====================================================================================== */}
      {/* HOME TAB - Main feed/dashboard */}
      {/* ====================================================================================== */}
      <Tabs.Screen
        name="index" // or "home" depending on your file structure
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"} // Filled when active, outline when inactive
              size={size || 24}
              color={color}
            />
          ),
          // Optional: Add badge for unread items
          // tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
        }}
      />

      {/* ====================================================================================== */}
      {/* NOTIFICATIONS TAB - Activity feed */}
      {/* ====================================================================================== */}
      <Tabs.Screen
        name="NotificationsScreen"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              size={size || 24}
              color={color}
            />
          ),
          // Optional: Add notification badge
          // tabBarBadge: notificationCount > 0 ? notificationCount : undefined,
        }}
      />

      {/* ====================================================================================== */}
      {/* EXPLORE TAB - Discover content */}
      {/* ====================================================================================== */}
      <Tabs.Screen
        name="ExploreScreen"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"} // GitHub uses compass icon for explore
              size={size || 24}
              color={color}
            />
          ),
        }}
      />

      {/* ====================================================================================== */}
      {/* PROFILE TAB - User profile and settings */}
      {/* ====================================================================================== */}
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size || 24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
