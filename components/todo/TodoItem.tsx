// components/TodoItem.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Todo } from "@/types/todo";
import { format } from "date-fns";
import { useModernThemeColor } from "@/hooks/useThemeColor";

interface TodoItemProps {
  item: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, onToggle, onDelete }) => {
  const { colors } = useModernThemeColor();

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
          // Removed shadows since it does not exist in the theme
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
            style={[
              styles.deleteButton,
              { backgroundColor: colors.status.error.main },
            ]}
            onPress={() => onDelete(item.id)}
          >
            <Text
              style={[styles.deleteButtonText, { color: colors.text.inverse }]}
            >
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {item.dueDate && (
        <Text style={[styles.dueDate, { color: colors.text.tertiary }]}>
          Due: {format(item.dueDate, "MMM dd, yyyy HH:mm")}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  todoContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  todoMainContent: {
    flex: 1,
    marginRight: 12,
  },
  todoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    fontSize: 12,
    textAlign: "center",
  },
  todoTextContainer: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  todoDescription: {
    marginTop: 4,
  },
  todoActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteButton: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  deleteButtonText: {
    fontSize: 14,
  },
  dueDate: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default TodoItem;
