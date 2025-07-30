// components/todo/NotificationTestButton.tsx
import { useModernTheme } from "@/context/ThemeContext";
import {
  cancelAllNotifications,
  getPendingNotifications,
  requestNotificationPermissions,
  scheduleImmediateNotification,
  scheduleTodoNotification,
} from "@/utils/appnotifications";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const NotificationTestButton: React.FC = () => {
  const { colors, shadows } = useModernTheme();
  const [isLoading, setIsLoading] = useState(false);

  const testImmediateNotification = async () => {
    setIsLoading(true);
    try {
      // Request permissions first
      const hasPermission = await requestNotificationPermissions();
      if (!hasPermission) {
        Alert.alert(
          "Permission Denied",
          "Please enable notifications in settings"
        );
        return;
      }

      console.log("🔔 Testing immediate notification...");

      await scheduleImmediateNotification(
        "Test Todo Notification",
        "This is a test notification for todo deadlines",
        { type: "test", todoId: "test-123" }
      );

      Alert.alert(
        "Success",
        "Test notification sent! Check your notification panel."
      );
    } catch (error) {
      Alert.alert("Error", "Failed to send test notification");
      console.error("Test notification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const testScheduledNotification = async () => {
    setIsLoading(true);
    try {
      const futureDate = new Date();
      futureDate.setSeconds(futureDate.getSeconds() + 5); // 5 seconds from now

      console.log(
        "📅 Testing scheduled notification for 5 seconds from now..."
      );
      console.log(`⏰ Scheduled time: ${futureDate.toISOString()}`);

      await scheduleTodoNotification(
        "test-todo-456",
        "Test Scheduled Task",
        futureDate,
        "reminder"
      );

      Alert.alert(
        "Success",
        "Test scheduled notification set for 5 seconds from now! Check your notifications."
      );
    } catch (error) {
      Alert.alert("Error", "Failed to schedule test notification");
      console.error("Scheduled notification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const testDeadlineNotification = async () => {
    setIsLoading(true);
    try {
      const deadline = new Date();
      deadline.setMinutes(deadline.getMinutes() + 1); // 1 minute from now

      await scheduleTodoNotification(
        "test-deadline-789",
        "Test Deadline Task",
        deadline,
        "final"
      );

      Alert.alert(
        "Success",
        "Test deadline notification set for 1 minute from now!"
      );
    } catch (error) {
      Alert.alert("Error", "Failed to schedule deadline notification");
      console.error("Deadline notification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkPendingNotifications = async () => {
    setIsLoading(true);
    try {
      const notifications = await getPendingNotifications();
      Alert.alert(
        "Pending Notifications",
        `You have ${notifications.length} scheduled notifications`
      );
    } catch (error) {
      Alert.alert("Error", "Failed to get pending notifications");
      console.error("Pending notifications error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAllNotifications = async () => {
    setIsLoading(true);
    try {
      await cancelAllNotifications();
      Alert.alert("Success", "All scheduled notifications cleared!");
    } catch (error) {
      Alert.alert("Error", "Failed to clear notifications");
      console.error("Clear notifications error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkNotificationStatus = async () => {
    setIsLoading(true);
    try {
      console.log("🔍 Checking notification status...");

      // Check permissions
      const hasPermission = await requestNotificationPermissions();
      console.log("📱 Permission status:", hasPermission);

      // Get pending notifications
      const pendingNotifications = await getPendingNotifications();
      console.log(
        "📋 Pending notifications count:",
        pendingNotifications.length
      );

      // Show status
      Alert.alert(
        "Notification Status",
        `Permissions: ${hasPermission ? "Granted" : "Denied"}\nPending: ${
          pendingNotifications.length
        } notifications`
      );
    } catch (error) {
      Alert.alert("Error", "Failed to check notification status");
      console.error("Status check error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        backgroundColor: colors.surface.secondary,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.border.primary,
        ...shadows.sm,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <Ionicons
          name="notifications-outline"
          size={20}
          color={colors.accents.blue.main}
          style={{ marginRight: 8 }}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: colors.text.primary,
          }}
        >
          Notification Tests
        </Text>
      </View>

      <Text
        style={{
          fontSize: 14,
          color: colors.text.secondary,
          marginBottom: 16,
        }}
      >
        Use these buttons to test various notification types.
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: colors.interactive.primary,
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 10,
          ...shadows.sm,
        }}
        onPress={testImmediateNotification}
        disabled={isLoading}
      >
        <Text
          style={{
            color: colors.text.inverse,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {isLoading ? "Sending..." : "Test Immediate Notification"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: colors.interactive.primary,
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 10,
          ...shadows.sm,
        }}
        onPress={testScheduledNotification}
        disabled={isLoading}
      >
        <Text
          style={{
            color: colors.text.inverse,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {isLoading ? "Scheduling..." : "Test Scheduled (10s)"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: colors.interactive.primary,
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 10,
          ...shadows.sm,
        }}
        onPress={testDeadlineNotification}
        disabled={isLoading}
      >
        <Text
          style={{
            color: colors.text.inverse,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {isLoading ? "Scheduling..." : "Test Deadline (1m)"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: colors.accents.blue.main,
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 10,
          ...shadows.sm,
        }}
        onPress={checkPendingNotifications}
        disabled={isLoading}
      >
        <Text
          style={{
            color: colors.text.inverse,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {isLoading ? "Checking..." : "Check Pending"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: colors.status.error.main,
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          ...shadows.sm,
        }}
        onPress={clearAllNotifications}
        disabled={isLoading}
      >
        <Text
          style={{
            color: colors.text.inverse,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {isLoading ? "Clearing..." : "Clear All"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: colors.interactive.secondary,
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          marginTop: 10,
          ...shadows.sm,
        }}
        onPress={checkNotificationStatus}
        disabled={isLoading}
      >
        <Text
          style={{
            color: colors.text.primary,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {isLoading ? "Checking Status..." : "Check Notification Status"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationTestButton;
