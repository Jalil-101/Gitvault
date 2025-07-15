import { View, Text } from 'react-native'
import React from 'react'
import TodoList from '@/components/todo/TodoList'
import { SafeAreaView } from "react-native-safe-area-context";

const Todo = () => {
    return (
      <SafeAreaView className="flex-1 ">
    <View>
    <TodoList />
            </View>
        </SafeAreaView>
  )
}

export default Todo