import { View } from "react-native";
import React from "react";
import TodoList from "@/components/todo/TodoList";
import { SafeAreaView } from "react-native-safe-area-context";

const Todo = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <TodoList />
      </View>
    </SafeAreaView>
  );
};

export default Todo;
