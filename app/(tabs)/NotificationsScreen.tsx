import React from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "@/context/ThemeContext";

import { useNotifications } from "@/hooks/useNotifications";
import { useNotificationFilters } from "@/hooks/useNotificationFilters";
import { useNotificationSelection } from "@/hooks/useNotificationSelection";

import { NotificationHeader } from "@/components/notifications/NotificationHeader";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import { NotificationEmptyState } from "@/components/notifications/NotificationEmptyState";
import { NotificationLoadingState } from "@/components/notifications/NotificationLoadingState";

const NotificationsScreen: React.FC = () => {
  const { colors } = useTheme();

  // Custom hooks handle all the logic
  const {
    notifications,
    loading,
    refreshing,
    loadNotifications,
    onRefresh,
    markAsRead,
  } = useNotifications();

  const { activeFilter, setActiveFilter, filteredNotifications, filterCounts } =
    useNotificationFilters(notifications);

  const {
    selectedNotifications,
    isSelectionMode,
    toggleSelection,
    enterSelectionMode,
    exitSelectionMode,
  } = useNotificationSelection();

  // Much cleaner component with focused responsibilities
  // Event handlers would be simple function calls to hooks

// //  useFocusEffect(
// //    React.useCallback(() => {
// //      let isActive = true;

// //      const fetchData = async () => {
// //        if (isActive) {
// //          await loadNotifications();
// //        }
// //      };

// //      fetchData();

// //      return () => {
// //        isActive = false;
// //      };
// //    }, [loadNotifications])
// //  );

//   if (loading) {
//     return <NotificationLoadingState />;
//   }

  return (
    <SafeAreaView className="flex-1 bg-github-light-canvas-subtle dark:bg-github-dark-canvas-default">
      <NotificationHeader
        isSelectionMode={isSelectionMode}
        onMarkSelectedAsRead={() => {
          markAsRead(Array.from(selectedNotifications));
          exitSelectionMode();
        }}
        onCancelSelection={exitSelectionMode}
        onMarkAllAsRead={() =>
          markAsRead(filteredNotifications.map((n) => n.id))
        }
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        filterCounts={filterCounts}
      />

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accentBlue}
            colors={[colors.accentBlue]}
          />
        }
      >
        {filteredNotifications.length === 0 ? (
          <NotificationEmptyState activeFilter={activeFilter} />
        ) : (
          <View className="py-2">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                isSelected={selectedNotifications.has(notification.id)}
                isSelectionMode={isSelectionMode}
                onPress={() => {
                  if (isSelectionMode) {
                    toggleSelection(notification.id);
                  } else {
                    if (notification.unread) {
                      markAsRead([notification.id]);
                    }
                    // Navigate to notification
                  }
                }}
                onLongPress={() => enterSelectionMode(notification.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
