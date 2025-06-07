// components/notifications/NotificationEmptyState.tsx
import React from "react";
import { View, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

interface NotificationEmptyStateProps {
  activeFilter: string;
}

export const NotificationEmptyState: React.FC<NotificationEmptyStateProps> = ({
  activeFilter,
}) => {
  const { colors } = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getEmptyStateContent = () => {
    switch (activeFilter) {
      case "unread":
        return {
          icon: "checkmark-circle",
          title: "All caught up!",
          subtitle: "You have no unread notifications",
          iconColor: colors.success.fg,
          iconBg: colors.success.subtle,
        };
      case "participating":
        return {
          icon: "people",
          title: "No participating notifications",
          subtitle: "You haven't participated in any discussions recently",
          iconColor: colors.accent.fg,
          iconBg: colors.accent.subtle,
        };
      case "mentions":
        return {
          icon: "at",
          title: "No mentions",
          subtitle: "Nobody has mentioned you recently",
          iconColor: colors.attention.fg,
          iconBg: colors.attention.subtle,
        };
      default:
        return {
          icon: "notifications-off",
          title: "No notifications",
          subtitle: "You're all set! New notifications will appear here",
          iconColor: colors.fg.muted,
          iconBg: colors.canvas.inset,
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <Animated.View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 32,
        paddingVertical: 80,
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}
    >
      {/* Animated Background Circle */}
      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: content.iconBg,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          borderWidth: 1,
          borderColor: colors.border.subtle,
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.canvas.default,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: colors.fg.default,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Ionicons
            name={content.icon as any}
            size={36}
            color={content.iconColor}
          />
        </View>
      </View>

      {/* Title */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          color: colors.fg.default,
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        {content.title}
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          fontSize: 16,
          color: colors.fg.muted,
          textAlign: "center",
          lineHeight: 22,
          maxWidth: 280,
        }}
      >
        {content.subtitle}
      </Text>

      {/* Decorative Elements */}
      <View
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: colors.accent.subtle,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 60,
          left: 50,
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: colors.success.subtle,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 10,
          right: 60,
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: colors.attention.subtle,
        }}
      />
    </Animated.View>
  );
};
