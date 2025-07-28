// components/TodoStats.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { Todo } from "@/types/todo";
import React from "react";
import { Text, View } from "react-native";

interface TodoStatsProps {
  todos: Todo[];
}

const TodoStats: React.FC<TodoStatsProps> = ({ todos }) => {
  const { colors, shadows } = useModernTheme();

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const completionRate =
    totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const getPriorityCount = (priority: Todo["priority"]) => {
    return todos.filter((todo) => todo.priority === priority).length;
  };

  const highPriorityCount = getPriorityCount("high");
  const mediumPriorityCount = getPriorityCount("medium");
  const lowPriorityCount = getPriorityCount("low");

  return (
    <View
      style={{
        backgroundColor: colors.surface.primary,
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.border.primary,
        ...shadows.sm,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: colors.text.primary,
          marginBottom: 16,
        }}
      >
        Overview
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: colors.text.primary,
            }}
          >
            {totalTodos}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.text.secondary,
              textAlign: "center",
            }}
          >
            Total
          </Text>
        </View>

        <View style={{ alignItems: "center", flex: 1 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: colors.status.success.main,
            }}
          >
            {completedTodos}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.text.secondary,
              textAlign: "center",
            }}
          >
            Completed
          </Text>
        </View>

        <View style={{ alignItems: "center", flex: 1 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: colors.status.warning.main,
            }}
          >
            {pendingTodos}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.text.secondary,
              textAlign: "center",
            }}
          >
            Pending
          </Text>
        </View>

        <View style={{ alignItems: "center", flex: 1 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: colors.accents.blue.main,
            }}
          >
            {completionRate}%
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.text.secondary,
              textAlign: "center",
            }}
          >
            Done
          </Text>
        </View>
      </View>

      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: colors.border.tertiary,
          paddingTop: 16,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: colors.text.primary,
            marginBottom: 8,
          }}
        >
          Priority Breakdown
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ alignItems: "center", flex: 1 }}>
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: colors.status.error.main,
                marginBottom: 4,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: colors.text.secondary,
                textAlign: "center",
              }}
            >
              High ({highPriorityCount})
            </Text>
          </View>

          <View style={{ alignItems: "center", flex: 1 }}>
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: colors.status.warning.main,
                marginBottom: 4,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: colors.text.secondary,
                textAlign: "center",
              }}
            >
              Medium ({mediumPriorityCount})
            </Text>
          </View>

          <View style={{ alignItems: "center", flex: 1 }}>
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: colors.status.success.main,
                marginBottom: 4,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: colors.text.secondary,
                textAlign: "center",
              }}
            >
              Low ({lowPriorityCount})
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TodoStats;
