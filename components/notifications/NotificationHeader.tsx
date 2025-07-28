import { useModernTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
      style={[
        styles.container,
        {
          paddingTop: insets.top + 16,
        },
      ]}
    >
      <View>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          Notifications
        </Text>
        {unreadCount > 0 && (
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </Text>
        )}
      </View>

      <View style={styles.actions}>
        {unreadCount > 0 && (
          <TouchableOpacity
            onPress={onMarkAllAsRead}
            style={[
              styles.markAllButton,
              { backgroundColor: colors.surface.secondary },
            ]}
          >
            <Text style={[styles.markAllText, { color: colors.text.primary }]}>
              Mark all read
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={onSettings} style={styles.settingsButton}>
          <Ionicons
            name="settings-outline"
            size={24}
            color={colors.text.secondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  markAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  markAllText: {
    fontSize: 14,
    fontWeight: "500",
  },
  settingsButton: {
    padding: 8,
  },
});
