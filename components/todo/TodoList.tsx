import { useModernTheme } from "@/context/ThemeContext";
import { useTodoStore } from "@/store/todoStore";
import { Todo } from "@/types/todo";
import { requestNotificationPermissions } from "@/utils/appnotifications";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import AddTodoModal from "./AddTodoModal";
import TodoHeader from "./TodoHeader";
import TodoItem from "./TodoItem";
import TodoStats from "./TodoStats";

const TodoList: React.FC = () => {
  const { todos, isLoading, addTodo, deleteTodo, toggleTodo, loadTodos } =
    useTodoStore();

  const { colors } = useModernTheme();
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadTodos();
    requestNotificationPermissions();
  }, []);

  const handleAddTodo = async (
    todoData: Omit<Todo, "id" | "createdAt" | "updatedAt">
  ) => {
    await addTodo(todoData);
    setShowAddModal(false);
  };

  const handleDeleteTodo = (id: string) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteTodo(id) },
    ]);
  };

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <TodoItem item={item} onToggle={toggleTodo} onDelete={handleDeleteTodo} />
  );

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: colors.text.secondary,
          }}
        >
          Loading todos...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <TodoHeader onAddPress={() => setShowAddModal(true)} />
      <TodoStats todos={todos} />

      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        style={{
          flex: 1,
          marginTop: 16,
        }}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 80,
            }}
          >
            <Text
              style={{
                color: colors.text.tertiary,
                fontSize: 18,
              }}
            >
              No todos yet
            </Text>
            <Text
              style={{
                color: colors.text.quaternary,
                marginTop: 8,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              Create your first todo to get started
            </Text>
          </View>
        }
      />

      <AddTodoModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddTodo={handleAddTodo}
      />
    </View>
  );
};

export default TodoList;
