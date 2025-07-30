import { useModernTheme } from "@/context/ThemeContext";
import { useNotificationStore } from "@/store/notificationStore";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const NotificationTestButton: React.FC = () => {
  const { addLikeNotification, addCommentNotification } =
    useNotificationStore();
  const { colors, shadows } = useModernTheme();

  const testLikeNotification = () => {
    addLikeNotification(
      "123",
      "Test Post Title",
      "john.doe@example.com",
      "jane.smith@example.com"
    );
  };

  const testCommentNotification = () => {
    addCommentNotification(
      "123",
      "Test Post Title",
      "john.doe@example.com",
      "jane.smith@example.com"
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.accents.purple.main,
          ...shadows.md,
        },
      ]}
      onPress={testLikeNotification}
    >
      <Text style={[styles.buttonText, { color: colors.text.inverse }]}>
        Test Like Notification
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
