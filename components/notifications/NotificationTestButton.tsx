import { useModernTheme } from "@/context/ThemeContext";
import { pushNotificationService } from "@/services/PushNotificationService";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

interface NotificationTestButtonProps {
  style?: any;
  textStyle?: any;
}

const NotificationTestButton: React.FC<NotificationTestButtonProps> = ({
  style,
  textStyle,
}) => {
  const { colors, shadows, isDarkTheme } = useModernTheme();

  const runNotificationTests = async () => {
    try {
      // Test 1: Immediate local notification
      await pushNotificationService.presentNotification(
        "Test Notification",
        "This is a test notification",
        { type: "test" }
      );

      // Show success message
      Alert.alert(
        "Testing Notifications",
        "Local notification sent immediately!\n\nScheduled notification will appear in 5 seconds...",
        [{ text: "OK" }]
      );

      // Test 2: Scheduled notification after 5 seconds
      setTimeout(async () => {
        try {
          await pushNotificationService.scheduleLocalNotification(
            "Scheduled Test",
            "This notification was scheduled 5 seconds ago",
            { type: "scheduled" },
            0 // Send immediately since we're already waiting 5 seconds
          );
        } catch (error) {
          console.error("Scheduled notification error:", error);
        }
      }, 5000);
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to test notifications. Check console for details."
      );
      console.error("Notification test error:", error);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.interactive.primary,
          ...shadows.md,
        },
        style,
      ]}
      onPress={runNotificationTests}
      activeOpacity={0.7}
    >
      <Ionicons
        name="notifications-outline"
        size={20}
        color={colors.text.inverse}
        style={styles.icon}
      />
      <Text
        style={[styles.buttonText, { color: colors.text.inverse }, textStyle]}
      >
        Test Notifications
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  icon: {
    marginRight: 4,
  },
});

export default NotificationTestButton;
