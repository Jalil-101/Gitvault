// components/todo/NotificationTestButton.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { pushNotificationService } from "@/services/PushNotificationService";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const NotificationTestButton: React.FC = () => {
  const { colors, shadows } = useModernTheme();
  const [isLoading, setIsLoading] = useState(false);

  const testImmediateNotification = async () => {
    setIsLoading(true);
    try {
      await pushNotificationService.presentNotification(
        "Test Todo Notification",
        "This is a test notification for todo deadlines",
        { type: "test", todoId: "test-123" }
      );
      Alert.alert("Success", "Test notification sent!");
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
      futureDate.setSeconds(futureDate.getSeconds() + 10); // 10 seconds from now

      await pushNotificationService.scheduleTodoDeadlineNotification(
        "test-todo-123",
        "Test Todo Task",
        futureDate,
        "reminder"
      );
      Alert.alert(
        "Success",
        "Test scheduled notification set for 10 seconds from now!"
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

      await pushNotificationService.scheduleTodoDeadlineNotification(
        "test-deadline-123",
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
          {isLoading ? "Scheduling..." : "Test Scheduled Reminder (10s)"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: colors.interactive.primary,
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
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
          {isLoading ? "Scheduling..." : "Test Deadline Notification (1m)"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationTestButton;
