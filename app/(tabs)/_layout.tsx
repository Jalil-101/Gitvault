// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Home,
  Search,
  Code,
  User,
  Activity,
  GitBranch,
  Star,
  Bell,
  BellIcon,
} from "lucide-react-native";

import { useModernTheme } from "@/context/ThemeContext";
import { ModernColors } from "@/constants/Colors";

type IconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const TabIcon = ({
  Icon,
  focused,
  color,
  size,
}: {
  Icon: React.ComponentType<any>;
  focused: boolean;
  color: string;
  size: number;
}) => {
  const { theme, colors } = useModernTheme();

  return (
    <View
      className={`
        items-center justify-center w-8 h-8 rounded-2xl relative mb-0.5
        ${
          focused
            ? theme === "dark"
              ? "bg-indigo-500/15 border border-indigo-500/30"
              : "bg-blue-500/10 border border-blue-500/20"
            : ""
        }
      `}
    >
      <Icon size={size} color={color} strokeWidth={focused ? 2.5 : 2} />
      {focused && (
        <View
          className="absolute -bottom-2 w-1 h-1 rounded-sm"
          style={{
            backgroundColor:
              theme === "dark"
                ? colors.interactive.primary
                : colors.interactive.primary,
          }}
        />
      )}
    </View>
  );
};

export default function TabLayout() {
  const { theme, colors, glass, shadows } = useModernTheme();
  const insets = useSafeAreaInsets();

  const tabBarStyle = {
    paddingBottom: insets.bottom + 8,
    backgroundColor:
      theme === "dark" ? "rgba(18, 18, 26, 0.85)" : "rgba(255, 255, 255, 0.85)",
    borderTopColor: colors.border.glass,
    ...shadows.lg,
  };

  const getTabBarIcon = (iconName: string) => {
    const iconMap = {
      index: Home,
      explore: Search,
      repositories: Code,
      activity: Activity,
      profile: User,
    };

    return iconMap[iconName as keyof typeof iconMap] || Home;
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...tabBarStyle,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 8,
          borderTopWidth: 0.5,
          height: Platform.OS === "ios" ? 84 : 70,
          paddingTop: 8,
          paddingHorizontal: 8,
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={80}
              tint={theme === "dark" ? "dark" : "light"}
              className="absolute inset-0"
            />
          ) : (
            <View
              className={`absolute inset-0 ${
                theme === "dark" ? "bg-slate-900/95" : "bg-white/95"
              }`}
            />
          ),
        tabBarActiveTintColor:
          theme === "dark"
            ? colors.interactive.primary
            : colors.interactive.primary,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 4,
          fontFamily: Platform.OS === "ios" ? "SF Pro Text" : "Inter",
        },
        tabBarItemStyle: {
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon Icon={Home} focused={focused} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="NotificationsScreen"
        options={{
          title: "Notifications",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              Icon={BellIcon}
              focused={focused}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ExploreScreen"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              Icon={Search}
              focused={focused}
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon Icon={User} focused={focused} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
