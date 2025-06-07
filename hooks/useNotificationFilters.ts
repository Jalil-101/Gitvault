import { useState, useEffect, useMemo } from "react";
import type { Notification, FilterType } from "@/types/notifications";

export const useNotificationFilters = (notifications: Notification[]) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredNotifications = useMemo(() => {
    switch (activeFilter) {
      case "unread":
        return notifications.filter((n) => n.unread);
      case "participating":
        return notifications.filter((n) =>
          ["mention", "assign", "review_requested", "team_mention"].includes(
            n.reason
          )
        );
      default:
        return notifications;
    }
  }, [notifications, activeFilter]);

  const filterCounts = useMemo(
    () => ({
      all: notifications.length,
      unread: notifications.filter((n) => n.unread).length,
      participating: notifications.filter((n) =>
        ["mention", "assign", "review_requested", "team_mention"].includes(
          n.reason
        )
      ).length,
    }),
    [notifications]
  );

  return {
    activeFilter,
    setActiveFilter,
    filteredNotifications,
    filterCounts,
  };
};
