// components/PrioritySelector.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Todo } from "@/types/todo";
import { useModernThemeColor } from "@/hooks/useThemeColor";

interface PrioritySelectorProps {
  selectedPriority: Todo["priority"];
  onPriorityChange: (priority: Todo["priority"]) => void;
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  selectedPriority,
  onPriorityChange,
}) => {
  const { colors } = useModernThemeColor();

  const getPriorityButtonStyle = (
    priority: Todo["priority"],
    isSelected: boolean
  ) => {
    const baseStyle = {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      marginRight: 8,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    };

    if (isSelected) {
      switch (priority) {
        case "high":
          return {
            ...baseStyle,
            backgroundColor: colors.status.error.main,
          };
        case "medium":
          return {
            ...baseStyle,
            backgroundColor: colors.status.warning.main,
          };
        case "low":
          return {
            ...baseStyle,
            backgroundColor: colors.status.success.main,
          };
        default:
          return {
            ...baseStyle,
            backgroundColor: colors.interactive.secondary,
          };
      }
    } else {
      return {
        ...baseStyle,
        backgroundColor: colors.interactive.secondary,
      };
    }
  };

  const getPriorityButtonTextColor = (
    priority: Todo["priority"],
    isSelected: boolean
  ) => {
    if (isSelected) {
      return colors.text.inverse;
    } else {
      return colors.text.secondary;
    }
  };

  return (
    <View>
      <Text style={[styles.priorityLabel, { color: colors.text.primary }]}>
        Priority
      </Text>
      <View style={styles.priorityContainer}>
        {(["low", "medium", "high"] as const).map((priority) => (
          <TouchableOpacity
            key={priority}
            style={getPriorityButtonStyle(
              priority,
              selectedPriority === priority
            )}
            onPress={() => onPriorityChange(priority)}
          >
            <Text
              style={[
                styles.priorityButtonText,
                {
                  color: getPriorityButtonTextColor(
                    priority,
                    selectedPriority === priority
                  ),
                },
              ]}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  priorityLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  priorityContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  priorityButtonText: {
    textAlign: "center",
    fontWeight: "600",
  },
});

export default PrioritySelector;
