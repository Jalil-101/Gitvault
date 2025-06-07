// components/notifications/NotificationHeader.tsx
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export type FilterType = "all" | "unread" | "participating";

interface NotificationHeaderProps {
  isSelectionMode: boolean;
  onMarkSelectedAsRead: () => void;
  onCancelSelection: () => void;
  onMarkAllAsRead: () => void;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  filterCounts: {
    all: number;
    unread: number;
    participating: number;
  };
}

export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  isSelectionMode,
  onMarkSelectedAsRead,
  onCancelSelection,
  onMarkAllAsRead,
  activeFilter,
  onFilterChange,
  filterCounts,
}) => {
  return (
    <View className="px-4 py-3 bg-github-light-canvas-default dark:bg-github-dark-canvas-overlay border-b border-github-light-border-default dark:border-github-dark-border-default">
      {/* Title and Actions Row */}
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-semibold text-github-light-fg-default dark:text-github-dark-fg-default pt-5">
          Notifications
        </Text>

        {/* Conditional action buttons based on selection mode */}
        {isSelectionMode ? (
          <View className="flex-row items-center space-x-3">
            <TouchableOpacity
              onPress={onMarkSelectedAsRead}
              className="px-3 py-1 bg-github-light-accent-subtle dark:bg-github-dark-accent-subtle rounded-md"
            >
              <Text className="text-sm font-medium text-github-light-accent-fg dark:text-github-dark-accent-fg pt-5">
                Mark Read
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancelSelection}>
              <Text className="text-sm font-medium text-github-light-fg-muted dark:text-github-dark-fg-muted">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={onMarkAllAsRead}>
            <Text className="text-sm font-medium text-github-light-accent-fg dark:text-github-dark-accent-fg">
              Mark all read
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <View className="flex-row mt-3 space-x-1">
        {[
          { key: "all" as FilterType, label: "All", count: filterCounts.all },
          {
            key: "unread" as FilterType,
            label: "Unread",
            count: filterCounts.unread,
          },
          {
            key: "participating" as FilterType,
            label: "Participating",
            count: filterCounts.participating,
          },
        ].map((filter) => (
          <TouchableOpacity
            key={filter.key}
            onPress={() => onFilterChange(filter.key)}
            className={`px-3 py-2 rounded-md  ${
              activeFilter === filter.key
                ? "bg-github-light-accent-emphasis dark:bg-github-dark-accent-emphasis"
                : "bg-github-light-canvas-inset dark:bg-github-dark-canvas-inset"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                activeFilter === filter.key
                  ? "text-github-light-fg-onEmphasis dark:text-github-dark-fg-onEmphasis"
                  : "text-github-light-fg-muted dark:text-github-dark-fg-muted"
              }`}
            >
              {filter.label} {filter.count > 0 && `(${filter.count})`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default NotificationHeader;
