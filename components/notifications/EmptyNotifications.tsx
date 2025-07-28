import { useModernTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// components/notifications/EmptyNotifications.tsx
interface EmptyNotificationsProps {
  message?: string;
  onRefresh?: () => void;
}

export const EmptyNotifications: React.FC<EmptyNotificationsProps> = ({
  message = "No notifications yet",
  onRefresh,
}) => {
  const { colors, isDarkTheme } = useModernTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: colors.surface.secondary },
        ]}
      >
        <Ionicons
          name="notifications-outline"
          size={40}
          color={colors.text.tertiary}
        />
      </View>

      <Text style={[styles.title, { color: colors.text.primary }]}>
        All caught up!
      </Text>

      <Text style={[styles.message, { color: colors.text.secondary }]}>
        {message}
      </Text>

      {onRefresh && (
        <TouchableOpacity
          onPress={onRefresh}
          style={[
            styles.refreshButton,
            { backgroundColor: colors.interactive.primary },
          ]}
        >
          <Text style={[styles.refreshText, { color: colors.text.inverse }]}>
            Check for updates
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  refreshButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  refreshText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
