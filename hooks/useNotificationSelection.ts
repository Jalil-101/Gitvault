import { useState, useCallback } from "react";

export const useNotificationSelection = () => {
  const [selectedNotifications, setSelectedNotifications] = useState<
    Set<string>
  >(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const toggleSelection = useCallback(
    (id: string) => {
      const newSelection = new Set(selectedNotifications);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      setSelectedNotifications(newSelection);

      if (newSelection.size === 0) {
        setIsSelectionMode(false);
      }
    },
    [selectedNotifications]
  );

  const enterSelectionMode = useCallback((id: string) => {
    setIsSelectionMode(true);
    setSelectedNotifications(new Set([id]));
  }, []);

  const exitSelectionMode = useCallback(() => {
    setIsSelectionMode(false);
    setSelectedNotifications(new Set());
  }, []);

  return {
    selectedNotifications,
    isSelectionMode,
    toggleSelection,
    enterSelectionMode,
    exitSelectionMode,
  };
};
