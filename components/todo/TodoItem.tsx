// components/TodoItem.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { Todo } from "@/types/todo";
import { Ionicons } from "@expo/vector-icons";
import { isBefore } from "date-fns";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TodoItemProps {
  item: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, onToggle, onDelete }) => {
  const { colors } = useModernTheme();

  const getPriorityColor = (priority: Todo["priority"]) => {
    switch (priority) {
      case "high":
        return colors.status.error.main;
      case "medium":
        return colors.status.warning.main;
      case "low":
        return colors.status.success.main;
      default:
        return colors.border.secondary;
    }
  };

  const getDeadlineStatus = () => {
    if (!item.deadline) return null;

    const now = new Date();
    const deadline = new Date(item.deadline);

    if (item.completed) {
      return { status: "completed", color: colors.status.success.main };
    }

    if (isBefore(deadline, now)) {
      return { status: "overdue", color: colors.status.error.main };
    }

    const daysUntilDeadline = Math.ceil(
      (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilDeadline <= 1) {
      return { status: "urgent", color: colors.status.error.main };
    } else if (daysUntilDeadline <= 3) {
      return { status: "soon", color: colors.status.warning.main };
    } else {
      return { status: "upcoming", color: colors.status.success.main };
    }
  };

  const formatDeadline = (date: Date) => {
    const now = new Date();
    const deadline = new Date(date);
    const daysUntilDeadline = Math.ceil(
      (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilDeadline === 0) {
      return "Due today";
    } else if (daysUntilDeadline === 1) {
      return "Due tomorrow";
    } else if (daysUntilDeadline < 0) {
      return `${Math.abs(daysUntilDeadline)} days overdue`;
    } else {
      return `Due in ${daysUntilDeadline} days`;
    }
  };

  const deadlineStatus = getDeadlineStatus();

  const checkboxStyle = {
    ...styles.checkbox,
    borderColor: item.completed
      ? colors.interactive.primary
      : colors.border.secondary,
    backgroundColor: item.completed
      ? colors.interactive.primary
      : "transparent",
  };

  return (
    <View
      style={[
        styles.todoContainer,
        {
          backgroundColor: colors.surface.primary,
          borderColor: colors.border.primary,
        },
      ]}
    >
      <View style={styles.todoContent}>
        <TouchableOpacity
          style={styles.todoMainContent}
          onPress={() => onToggle(item.id)}
        >
          <View style={styles.todoRow}>
            <View style={checkboxStyle}>
              {item.completed && (
                <Text
                  style={[styles.checkmark, { color: colors.text.inverse }]}
                >
                  ✓
                </Text>
              )}
            </View>
            <View style={styles.todoTextContainer}>
              <Text
                style={[
                  styles.todoTitle,
                  {
                    color: item.completed
                      ? colors.text.tertiary
                      : colors.text.primary,
                    textDecorationLine: item.completed
                      ? "line-through"
                      : "none",
                  },
                ]}
              >
                {item.title}
              </Text>
              {item.description && (
                <Text
                  style={[
                    styles.todoDescription,
                    { color: colors.text.secondary },
                  ]}
                >
                  {item.description}
                </Text>
              )}

              {/* Deadline Information */}
              {item.deadline && (
                <View style={styles.deadlineContainer}>
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color={deadlineStatus?.color || colors.text.tertiary}
                    style={{ marginRight: 4 }}
                  />
                  <Text
                    style={[
                      styles.deadlineText,
                      { color: deadlineStatus?.color || colors.text.tertiary },
                    ]}
                  >
                    {formatDeadline(item.deadline)}
                  </Text>
                  {item.notificationIds && item.notificationIds.length > 0 && (
                    <Ionicons
                      name="notifications-outline"
                      size={14}
                      color={colors.accents.blue.main}
                      style={{ marginLeft: 8 }}
                    />
                  )}
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.todoActions}>
          <View
            style={[
              styles.priorityIndicator,
              { backgroundColor: getPriorityColor(item.priority) },
            ]}
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(item.id)}
          >
            <Ionicons
              name="trash-outline"
              size={18}
              color={colors.status.error.main}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  todoContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  todoMainContent: {
    flex: 1,
  },
  todoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkmark: {
    fontSize: 14,
    fontWeight: "bold",
  },
  todoTextContainer: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  todoDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  deadlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  deadlineText: {
    fontSize: 12,
    fontWeight: "500",
  },
  todoActions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    padding: 4,
  },
});

export default TodoItem;
