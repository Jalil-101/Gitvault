// store/todoStore.ts
import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";
import { Todo } from "../types/todo";

interface TodoStore {
  todos: Todo[];
  isLoading: boolean;
  addTodo: (todo: Omit<Todo, "id" | "createdAt">) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  loadTodos: () => Promise<void>;
  saveTodos: () => Promise<void>;
  scheduleNotification: (todo: Todo) => Promise<void>;
  cancelNotification: (notificationId: string) => Promise<void>;
}

const STORAGE_KEY = "todos";

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  isLoading: false,

  addTodo: async (todoData) => {
    const newTodo: Todo = {
      ...todoData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    set((state) => ({
      todos: [...state.todos, newTodo],
    }));

    // Schedule notification if due date is set
    if (newTodo.dueDate) {
      await get().scheduleNotification(newTodo);
    }

    await get().saveTodos();
  },

  updateTodo: async (id, updates) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      ),
    }));

    // Handle notification updates
    const updatedTodo = get().todos.find((t) => t.id === id);
    if (updatedTodo) {
      if (updatedTodo.notificationId) {
        await get().cancelNotification(updatedTodo.notificationId);
      }
      if (updates.dueDate && !updatedTodo.completed) {
        await get().scheduleNotification(updatedTodo);
      }
    }

    await get().saveTodos();
  },

  deleteTodo: async (id) => {
    const todo = get().todos.find((t) => t.id === id);
    if (todo?.notificationId) {
      await get().cancelNotification(todo.notificationId);
    }

    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));

    await get().saveTodos();
  },

  toggleTodo: async (id) => {
    const todo = get().todos.find((t) => t.id === id);
    if (todo) {
      await get().updateTodo(id, { completed: !todo.completed });
    }
  },

  loadTodos: async () => {
    set({ isLoading: true });
    try {
      const storedTodos = await SecureStore.getItemAsync(STORAGE_KEY);
      if (storedTodos) {
        const parsedTodos = JSON.parse(storedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
        }));
        set({ todos: parsedTodos });
      }
    } catch (error) {
      console.error("Error loading todos:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  saveTodos: async () => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(get().todos));
    } catch (error) {
      console.error("Error saving todos:", error);
    }
  },

  scheduleNotification: async (todo) => {
    if (!todo.dueDate) return;

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Todo Reminder",
        body: `Don't forget: ${todo.title}`,
        data: { todoId: todo.id },
      },
      trigger: { date: todo.dueDate },
    });

    await get().updateTodo(todo.id, { notificationId });
  },

  cancelNotification: async (notificationId) => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  },
}));
