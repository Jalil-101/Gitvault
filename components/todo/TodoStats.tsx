// components/TodoStats.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Todo } from "@/types/todo";
import { useModernThemeColor } from "@/hooks/useThemeColor";

interface TodoStatsProps {
  todos: Todo[];
}

const TodoStats: React.FC<TodoStatsProps> = ({ todos }) => {
  const { colors } = useModernThemeColor();
  const shadows = {
    sm: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
  }; // Define a default shadows object if it is not returned from the hook

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.filter((t) => !t.completed).length;

  const cardStyle = {
    backgroundColor: colors.surface.primary,
    borderColor: colors.border.primary,
    ...shadows.sm,
  };

  return (
    <View style={styles.statsContainer}>
      <View style={[styles.statCard, cardStyle]}>
        <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
          Total
        </Text>
        <Text style={[styles.statValue, { color: colors.text.primary }]}>
          {todos.length}
        </Text>
      </View>

      <View style={[styles.statCard, cardStyle]}>
        <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
          Completed
        </Text>
        <Text style={[styles.statValue, { color: colors.status.success.main }]}>
          {completedCount}
        </Text>
      </View>

      <View style={[styles.statCard, cardStyle]}>
        <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
          Pending
        </Text>
        <Text style={[styles.statValue, { color: colors.status.warning.main }]}>
          {pendingCount}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    borderWidth: 1,
  },
  statLabel: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TodoStats;
