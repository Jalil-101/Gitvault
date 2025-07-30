// store/todoStore.ts
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { Todo } from "../types/todo";
import {
  cancelNotification,
  requestNotificationPermissions,
  scheduleTodoNotification,
} from "../utils/appnotifications";
import { useNotificationStore } from "./notificationStore";

interface TodoStore {
  todos: Todo[];
  isLoading: boolean;
  addTodo: (
    todo: Omit<Todo, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  loadTodos: () => Promise<void>;
  saveTodos: () => Promise<void>;
  clearTodos: () => Promise<void>;
  refreshTodos: () => Promise<void>;
  scheduleDeadlineNotifications: (todo: Todo) => Promise<void>;
  cancelTodoNotifications: (todo: Todo) => Promise<void>;
  checkAndScheduleNotifications: () => Promise<void>;
}

const STORAGE_KEY = "todos";

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  isLoading: false,

  addTodo: async (todoData) => {
    console.log("📝 Adding new todo:", todoData);

    const newTodo: Todo = {
      ...todoData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      notificationIds: [],
    };

    console.log("✅ Created todo object:", newTodo);

    set((state) => {
      const newState = {
        todos: [...state.todos, newTodo],
      };
      console.log("📊 Updated todos state:", newState.todos.length, "todos");
      return newState;
    });

    // Schedule notifications if deadline is set
    if (newTodo.deadline && !newTodo.completed) {
      try {
        await get().scheduleDeadlineNotifications(newTodo);
      } catch (error) {
        console.log("Could not schedule notifications for new todo");
      }
    }

    await get().saveTodos();
    console.log("💾 Todo saved to storage");
  },

  updateTodo: async (id, updates) => {
    const currentTodo = get().todos.find((t) => t.id === id);
    if (!currentTodo) return;

    // Cancel existing notifications if deadline is being updated or todo is completed
    if (
      (updates.deadline || updates.completed) &&
      currentTodo.notificationIds
    ) {
      try {
        await get().cancelTodoNotifications(currentTodo);
      } catch (error) {
        console.log("Could not cancel notifications for todo update");
      }
    }

    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              ...updates,
              updatedAt: new Date(),
              notificationIds: updates.deadline ? [] : todo.notificationIds,
            }
          : todo
      ),
    }));

    // Schedule new notifications if deadline is set and todo is not completed
    const updatedTodo = get().todos.find((t) => t.id === id);
    if (updatedTodo?.deadline && !updatedTodo.completed && updates.deadline) {
      try {
        await get().scheduleDeadlineNotifications(updatedTodo);
      } catch (error) {
        console.log("Could not schedule notifications for todo update");
      }
    }

    await get().saveTodos();
  },

  deleteTodo: async (id) => {
    const todo = get().todos.find((t) => t.id === id);
    if (todo?.notificationIds) {
      try {
        await get().cancelTodoNotifications(todo);
      } catch (error) {
        console.log("Could not cancel notifications for todo deletion");
      }
    }

    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));

    await get().saveTodos();
  },

  toggleTodo: async (id) => {
    const todo = get().todos.find((t) => t.id === id);
    if (todo) {
      // Cancel notifications if todo is completed
      if (!todo.completed && todo.notificationIds) {
        try {
          await get().cancelTodoNotifications(todo);
        } catch (error) {
          console.log("Could not cancel notifications for todo toggle");
        }
      }

      await get().updateTodo(id, { completed: !todo.completed });
    }
  },

  loadTodos: async () => {
    set({ isLoading: true });
    try {
      // Request notification permissions first
      await requestNotificationPermissions();

      const storedTodos = await SecureStore.getItemAsync(STORAGE_KEY);
      console.log(
        "📂 Loading todos from storage:",
        storedTodos ? "found" : "not found"
      );

      if (storedTodos) {
        const parsedTodos = JSON.parse(storedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: todo.updatedAt ? new Date(todo.updatedAt) : undefined,
          deadline: todo.deadline ? new Date(todo.deadline) : undefined,
        }));
        console.log("📋 Parsed todos:", parsedTodos.length, "todos");
        set({ todos: parsedTodos });

        // Check and schedule notifications for todos with deadlines
        await get().checkAndScheduleNotifications();
      } else {
        console.log("📋 No stored todos found, starting with empty list");
        set({ todos: [] });
      }
    } catch (error) {
      console.error("❌ Error loading todos:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  saveTodos: async () => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(get().todos));
    } catch (error) {
      console.error("❌ Error saving todos:", error);
    }
  },

  clearTodos: async () => {
    set({ todos: [] });
    await SecureStore.deleteItemAsync(STORAGE_KEY);
    console.log("✅ Cleared all todos from storage.");
  },

  refreshTodos: async () => {
    await get().loadTodos();
  },

  scheduleDeadlineNotifications: async (todo) => {
    if (!todo.deadline || todo.completed) return;

    const now = new Date();
    const deadline = new Date(todo.deadline);
    const timeUntilDeadline = deadline.getTime() - now.getTime();

    // Don't schedule if deadline has passed
    if (timeUntilDeadline <= 0) {
      console.log(
        `⏰ Skipping notification for todo "${todo.title}" - deadline has passed`
      );
      return;
    }

    try {
      const notificationIds: string[] = [];

      // Schedule reminder notification 24 hours before deadline
      const reminderDate = new Date(deadline.getTime() - 24 * 60 * 60 * 1000);
      if (reminderDate.getTime() > now.getTime()) {
        const reminderId = await scheduleTodoNotification(
          todo.id,
          todo.title,
          reminderDate,
          "reminder"
        );
        notificationIds.push(reminderId);
        console.log(
          `📅 Scheduled reminder for todo "${
            todo.title
          }" at ${reminderDate.toISOString()}`
        );
      }

      // Schedule final notification on deadline
      const finalId = await scheduleTodoNotification(
        todo.id,
        todo.title,
        deadline,
        "final"
      );
      notificationIds.push(finalId);
      console.log(
        `📅 Scheduled final notification for todo "${
          todo.title
        }" at ${deadline.toISOString()}`
      );

      // Add notifications to the notification store for the notification tab
      const { addTodoNotification } = useNotificationStore.getState();

      // Add reminder notification to notification store
      if (reminderDate.getTime() > now.getTime()) {
        addTodoNotification(todo.id, todo.title, reminderDate);
      }

      // Add final notification to notification store
      addTodoNotification(todo.id, todo.title, deadline);

      // Update todo with notification IDs
      set((state) => ({
        todos: state.todos.map((t) =>
          t.id === todo.id
            ? {
                ...t,
                notificationIds,
              }
            : t
        ),
      }));

      console.log(
        `✅ Successfully scheduled ${notificationIds.length} notifications for todo: ${todo.title}`
      );
    } catch (error) {
      console.error(
        `❌ Error scheduling deadline notifications for todo "${todo.title}":`,
        error
      );
      throw error;
    }
  },

  cancelTodoNotifications: async (todo) => {
    if (!todo.notificationIds || todo.notificationIds.length === 0) return;

    try {
      for (const notificationId of todo.notificationIds) {
        await cancelNotification(notificationId);
      }

      // Clear notification IDs from todo
      set((state) => ({
        todos: state.todos.map((t) =>
          t.id === todo.id
            ? {
                ...t,
                notificationIds: [],
              }
            : t
        ),
      }));

      console.log(
        `❌ Cancelled ${todo.notificationIds.length} notifications for todo: ${todo.title}`
      );
    } catch (error) {
      console.error(
        `❌ Error cancelling notifications for todo "${todo.title}":`,
        error
      );
      throw error;
    }
  },

  checkAndScheduleNotifications: async () => {
    const todos = get().todos;
    const now = new Date();
    let scheduledCount = 0;

    for (const todo of todos) {
      if (todo.deadline && !todo.completed) {
        const deadline = new Date(todo.deadline);
        const timeUntilDeadline = deadline.getTime() - now.getTime();

        // Only schedule if deadline hasn't passed and no notifications are currently scheduled
        if (
          timeUntilDeadline > 0 &&
          (!todo.notificationIds || todo.notificationIds.length === 0)
        ) {
          try {
            console.log(
              `📅 Rescheduling notifications for todo: ${todo.title}`
            );
            await get().scheduleDeadlineNotifications(todo);
            scheduledCount++;
          } catch (error) {
            console.error(
              `❌ Error rescheduling notifications for todo "${todo.title}":`,
              error
            );
          }
        }
      }
    }

    if (scheduledCount > 0) {
      console.log(`✅ Rescheduled notifications for ${scheduledCount} todos`);
    }
  },
}));
