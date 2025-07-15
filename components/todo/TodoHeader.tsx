// components/TodoHeader.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useModernThemeColor } from "@/hooks/useThemeColor";

interface TodoHeaderProps {
  onAddPress: () => void;
}

const TodoHeader: React.FC<TodoHeaderProps> = ({ onAddPress }) => {
  const { colors } = useModernThemeColor();

  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
        My Todos
      </Text>
      <TouchableOpacity
        style={[
          styles.addButton,
          {
            backgroundColor: colors.interactive.primary,
            // Remove shadows if not defined
          },
        ]}
        onPress={onAddPress}
      >
        <Text style={[styles.addButtonText, { color: colors.text.inverse }]}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  addButton: {
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default TodoHeader;
