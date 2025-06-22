import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Bell } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";

export default function DashboardHeader() {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const { colors, glass, shadows } = useModernTheme();

  useEffect(() => {
    // Pulse animation for notifications
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  return (
    <View className="px-5 py-4">
      <LinearGradient
        colors={[colors.surface.glass, colors.surface.secondary]}
        className="p-4 rounded-2xl"
        style={{
          borderWidth: 1,
          borderColor: colors.border.glass,
          ...Platform.select({
            ios: shadows.md,
            android: { elevation: 8 },
          }),
        }}
      >
        <View className="flex-row items-center justify-between">
          {/* Profile Section */}
          <View className="flex-row items-center">
            <View className="relative mr-3">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
                }}
                className="w-11 h-11 rounded-full"
                style={{
                  borderWidth: 2,
                  borderColor: colors.border.glass,
                }}
              />
              {/* Online indicator */}
              <View
                className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2"
                style={{
                  backgroundColor: colors.status.success.main,
                  borderColor: colors.background.primary,
                }}
              />
            </View>
            <View>
              <Text
                className="text-base mb-0.5"
                style={{ color: colors.text.tertiary }}
              >
                Good evening
              </Text>
              <Text
                className="text-lg font-bold"
                style={{ color: colors.text.primary }}
              >
                @developer
              </Text>
            </View>
          </View>

          {/* Notification Bell */}
          <TouchableOpacity className="p-2 relative" activeOpacity={0.7}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Bell size={24} color={colors.text.primary} />
              {/* Notification badge */}
              <View
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.status.error.main }}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}
