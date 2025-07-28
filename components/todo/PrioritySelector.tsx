// components/PrioritySelector.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useModernTheme } from "@/context/ThemeContext";

interface PrioritySelectorProps {
  selectedPriority: "low" | "medium" | "high";
  onPriorityChange: (priority: "low" | "medium" | "high") => void;
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  selectedPriority,
  onPriorityChange,
}) => {
  const { colors, shadows } = useModernTheme();

  const priorities = [
    { key: "low", label: "Low", color: colors.status.success.main },
    { key: "medium", label: "Medium", color: colors.status.warning.main },
    { key: "high", label: "High", color: colors.status.error.main },
  ] as const;

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        marginBottom: 20,
      }}
    >
      {priorities.map((priority) => (
        <TouchableOpacity
          key={priority.key}
          style={{
            flex: 1,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 8,
            borderWidth: 2,
            borderColor:
              selectedPriority === priority.key
                ? priority.color
                : colors.border.secondary,
            backgroundColor:
              selectedPriority === priority.key
                ? priority.color + "20"
                : colors.surface.secondary,
            alignItems: "center",
            ...shadows.sm,
          }}
          onPress={() => onPriorityChange(priority.key)}
        >
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: priority.color,
              marginBottom: 4,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color:
                selectedPriority === priority.key
                  ? priority.color
                  : colors.text.secondary,
            }}
          >
            {priority.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PrioritySelector;
