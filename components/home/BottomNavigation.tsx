import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Home, Bell, CheckCircle, User } from "lucide-react-native";

const navItems = [
  {
    id: "home",
    icon: Home,
    label: "Home",
    active: true,
  },
  {
    id: "notifications",
    icon: Bell,
    label: "Notifications",
    active: false,
  },
  {
    id: "activity",
    icon: CheckCircle,
    label: "Activity",
    active: false,
  },
  {
    id: "profile",
    icon: User,
    label: "Profile",
    active: false,
  },
];

export default function BottomNavigation() {
  return (
    <View className="absolute bottom-0 left-0 right-0">
      <LinearGradient
        colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
        className="flex-row items-center justify-around mx-5 mb-8 rounded-2xl"
        style={{
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.1)",
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            },
            android: {
              elevation: 8,
            },
          }),
        }}
      >
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="items-center py-2 px-3"
            activeOpacity={0.7}
          >
            <item.icon
              size={22}
              color={item.active ? "#6366F1" : "rgba(255,255,255,0.6)"}
            />
            <Text
              className="text-xs mt-1 font-medium"
              style={{
                color: item.active ? "#6366F1" : "rgba(255,255,255,0.6)",
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </LinearGradient>
    </View>
  );
}
