// store/todoStore.ts
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { Todo } from "../types/todo";

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
  scheduleNotification: (todo: Todo) => Promise<void>;
  scheduleDeadlineNotifications: (todo: Todo) => Promise<void>;
  cancelNotification: (notificationId: string) => Promise<void>;
  cancelAllNotifications: (notificationIds: string[]) => Promise<void>;
  checkAndScheduleNotifications: () => Promise<void>;
  clearAllExistingNotifications: () => Promise<void>;
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
      updatedAt: new Date(),
      notificationIds: [],
    };

    set((state) => ({
      todos: [...state.todos, newTodo],
    }));

    // Schedule notifications if deadline is set
    if (newTodo.deadline) {
      await get().scheduleDeadlineNotifications(newTodo);
    }

    await get().saveTodos();
  },

  updateTodo: async (id, updates) => {
    const currentTodo = get().todos.find((t) => t.id === id);
    if (!currentTodo) return;

    // Cancel existing notifications if deadline is being updated
    if (updates.deadline && currentTodo.notificationIds) {
      await get().cancelAllNotifications(currentTodo.notificationIds);
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
    // Only if this is a new deadline or deadline was changed
    const updatedTodo = get().todos.find((t) => t.id === id);
    if (
      updatedTodo?.deadline &&
      !updatedTodo.completed &&
      updates.deadline // Only schedule if deadline was actually updated
    ) {
      await get().scheduleDeadlineNotifications(updatedTodo);
    }

    await get().saveTodos();
  },

  deleteTodo: async (id) => {
    const todo = get().todos.find((t) => t.id === id);
    if (todo?.notificationIds) {
      await get().cancelAllNotifications(todo.notificationIds);
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
        await get().cancelAllNotifications(todo.notificationIds);
      }

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
          updatedAt: todo.updatedAt ? new Date(todo.updatedAt) : undefined,
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
          deadline: todo.deadline ? new Date(todo.deadline) : undefined,
          lastNotificationDate: todo.lastNotificationDate
            ? new Date(todo.lastNotificationDate)
            : undefined,
        }));
        set({ todos: parsedTodos });

        // Check and schedule notifications for todos with deadlines
        await get().checkAndScheduleNotifications();
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

  scheduleDeadlineNotifications: async (todo) => {
    if (!todo.deadline || todo.completed) return;

    const now = new Date();
    const deadline = new Date(todo.deadline);
    const timeUntilDeadline = deadline.getTime() - now.getTime();

    // Don't schedule if deadline has passed
    if (timeUntilDeadline <= 0) return;

    // Cancel existing notifications first
    if (todo.notificationIds && todo.notificationIds.length > 0) {
      await get().cancelAllNotifications(todo.notificationIds);
    }

    const notificationIds: string[] = [];
    const hours48 = 48 * 60 * 60 * 1000; // 48 hours in milliseconds

    // Calculate notification times: every 48 hours until deadline
    let currentTime = now.getTime();
    let notificationCount = 0;
    const maxNotifications = 5; // Reduced from 10 to prevent spam

    // Only schedule if we have enough time before deadline
    while (
      currentTime < deadline.getTime() - hours48 && // Stop 48h before deadline
      notificationCount < maxNotifications
    ) {
      const notificationDate = new Date(currentTime);

      // Schedule notification
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Todo Deadline Reminder",
          body: `Task due soon: ${todo.title}`,
          data: {
            todoId: todo.id,
            type: "deadline_reminder",
            notificationCount: notificationCount + 1,
          },
        },
        trigger: { date: notificationDate },
      });

      notificationIds.push(notificationId);
      notificationCount++;
      currentTime += hours48;
    }

    // Schedule final notification on deadline (only if deadline is in the future)
    if (deadline.getTime() > now.getTime()) {
      const finalNotificationId = await Notifications.scheduleNotificationAsync(
        {
          content: {
            title: "Todo Deadline Today!",
            body: `Your task is due today: ${todo.title}`,
            data: {
              todoId: todo.id,
              type: "deadline_final",
            },
          },
          trigger: { date: deadline },
        }
      );

      notificationIds.push(finalNotificationId);
    }

    // Update todo with notification IDs (without triggering updateTodo again)
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === todo.id
          ? {
              ...t,
              notificationIds,
              lastNotificationDate: now,
            }
          : t
      ),
    }));

    console.log(
      `Scheduled ${notificationIds.length} notifications for todo: ${todo.title}`
    );
  },

  cancelNotification: async (notificationId) => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  },

  cancelAllNotifications: async (notificationIds) => {
    for (const notificationId of notificationIds) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    }
  },

  checkAndScheduleNotifications: async () => {
    const todos = get().todos;
    const now = new Date();

    for (const todo of todos) {
      if (todo.deadline && !todo.completed) {
        const deadline = new Date(todo.deadline);
        const timeUntilDeadline = deadline.getTime() - now.getTime();

        // Only schedule if:
        // 1. Deadline hasn't passed
        // 2. No notifications are currently scheduled
        // 3. Deadline is at least 48 hours away (to prevent immediate notifications)
        if (
          timeUntilDeadline > 48 * 60 * 60 * 1000 && // At least 48 hours away
          (!todo.notificationIds || todo.notificationIds.length === 0) &&
          (!todo.lastNotificationDate ||
            now.getTime() - new Date(todo.lastNotificationDate).getTime() >
              24 * 60 * 60 * 1000) // At least 24h since last scheduling
        ) {
          console.log(`Rescheduling notifications for todo: ${todo.title}`);
          await get().scheduleDeadlineNotifications(todo);
        }
      }
    }
  },

  clearAllExistingNotifications: async () => {
    const todos = get().todos;

    for (const todo of todos) {
      if (todo.notificationIds && todo.notificationIds.length > 0) {
        await get().cancelAllNotifications(todo.notificationIds);
      }
    }

    // Clear notification IDs from all todos
    set((state) => ({
      todos: state.todos.map((todo) => ({
        ...todo,
        notificationIds: [],
        lastNotificationDate: undefined,
      })),
    }));

    console.log("Cleared all existing notifications");
  },
}));
