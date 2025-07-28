// types/todo.ts
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date;
  dueDate?: Date;
  deadline?: Date; // New field for deadline
  priority: "low" | "medium" | "high";
  notificationId?: string;
  notificationIds?: string[]; // Array to track multiple notifications
  lastNotificationDate?: Date; // Track when last notification was sent
}
