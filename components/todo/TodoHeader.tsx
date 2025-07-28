// components/TodoHeader.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TodoHeaderProps {
  onAddPress: () => void;
}

const TodoHeader: React.FC<TodoHeaderProps> = ({ onAddPress }) => {
  const { colors, shadows } = useModernTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        paddingVertical: 8,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: colors.text.primary,
            marginBottom: 4,
          }}
        >
          My Todos
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: colors.text.secondary,
          }}
        >
          Stay organized and productive
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: colors.interactive.primary,
          width: 48,
          height: 48,
          borderRadius: 24,
          justifyContent: "center",
          alignItems: "center",
          ...shadows.md,
        }}
        onPress={onAddPress}
      >
        <Ionicons name="add" size={24} color={colors.text.inverse} />
      </TouchableOpacity>
    </View>
  );
};

export default TodoHeader;
