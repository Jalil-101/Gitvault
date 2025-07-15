// components/AddTodoModal.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { Todo } from "@/types/todo";
import { useModernThemeColor } from "@/hooks/useThemeColor";
import PrioritySelector from "./PrioritySelector";

interface AddTodoModalProps {
  visible: boolean;
  onClose: () => void;
  onAddTodo: (todo: Omit<Todo, "id" | "createdAt" | "updatedAt">) => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  visible,
  onClose,
  onAddTodo,
}) => {
  const { colors } = useModernThemeColor();

  const [newTodo, setNewTodo] = useState<{
    title: string;
    description: string;
    priority: "medium" | "low" | "high";
    dueDate: Date | undefined;
    completed: boolean;
  }>({
    title: "",
    description: "",
    priority: "medium",
    dueDate: undefined,
    completed: false,
  });

  const handleAddTodo = () => {
    if (!newTodo.title.trim()) return;

    onAddTodo(newTodo);
    setNewTodo({
      title: "",
      description: "",
      priority: "medium",
      dueDate: undefined,
      completed: false,
    });
    onClose();
  };

  const handleClose = () => {
    setNewTodo({
      title: "",
      description: "",
      priority: "medium",
      dueDate: undefined,
      completed: false,
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background.primary,
          padding: 24,
        }}
      >
        {/* Modal Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: colors.text.primary,
            }}
          >
            Add Todo
          </Text>
          <TouchableOpacity onPress={handleClose}>
            <Text
              style={{
                color: colors.interactive.primary,
                fontSize: 18,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>

        {/* Title Input */}
        <TextInput
          style={{
            borderColor: colors.border.primary,
            backgroundColor: colors.surface.secondary,
            color: colors.text.primary,
            borderWidth: 1,
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            fontSize: 18,
          }}
          placeholder="Todo title..."
          placeholderTextColor={colors.text.tertiary}
          value={newTodo.title}
          onChangeText={(text) => setNewTodo({ ...newTodo, title: text })}
        />

        {/* Description Input */}
        <TextInput
          style={{
            borderColor: colors.border.primary,
            backgroundColor: colors.surface.secondary,
            color: colors.text.primary,
            borderWidth: 1,
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            height: 96,
          }}
          placeholder="Description (optional)..."
          placeholderTextColor={colors.text.tertiary}
          value={newTodo.description}
          onChangeText={(text) => setNewTodo({ ...newTodo, description: text })}
          multiline
          textAlignVertical="top"
        />

        {/* Priority Selection */}
        <PrioritySelector
          selectedPriority={newTodo.priority}
          onPriorityChange={(priority) => setNewTodo({ ...newTodo, priority })}
        />

        {/* Add Button */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.interactive.primary,
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            shadowColor: colors.shadow.sm,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 1,
            shadowRadius: 2,
            elevation: 1,
          }}
          onPress={handleAddTodo}
        >
          <Text
            style={{
              color: colors.text.inverse,
              textAlign: "center",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Add Todo
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddTodoModal;
