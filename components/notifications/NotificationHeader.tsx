import { useModernTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// components/notifications/NotificationHeader.tsx
interface NotificationHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
  onSettings: () => void;
}

export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  unreadCount,
  onMarkAllAsRead,
  onSettings,
}) => {
  const { colors, isDarkTheme } = useModernTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row items-center justify-between px-4 py-4"
      style={{
        paddingTop: insets.top + 16, // Add safe area top + extra spacing
      }}
    >
      <View>
        <Text
          className={`text-2xl font-bold ${
            isDarkTheme
              ? "text-modern-dark-text-primary"
              : "text-modern-light-text-primary"
          }`}
        >
          Notifications
        </Text>
        {unreadCount > 0 && (
          <Text
            className={`text-sm ${
              isDarkTheme
                ? "text-modern-dark-text-secondary"
                : "text-modern-light-text-secondary"
            }`}
          >
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </Text>
        )}
      </View>

      <View className="flex-row items-center">
        {unreadCount > 0 && (
          <TouchableOpacity
            onPress={onMarkAllAsRead}
            className={`px-3 py-2 rounded-lg mr-3 ${
              isDarkTheme
                ? "bg-modern-dark-surface-secondary"
                : "bg-modern-light-surface-secondary"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                isDarkTheme
                  ? "text-modern-dark-text-primary"
                  : "text-modern-light-text-primary"
              }`}
            >
              Mark all read
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={onSettings} className="p-2">
          <Ionicons
            name="settings-outline"
            size={24}
            color={isDarkTheme ? colors.text.secondary : colors.text.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
