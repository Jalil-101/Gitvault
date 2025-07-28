import TodoList from "@/components/todo/TodoList";
import { useModernTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Todo = () => {
  const { colors, isDarkTheme, gradients } = useModernTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
      <LinearGradient colors={gradients.background} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <TodoList />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default Todo;
