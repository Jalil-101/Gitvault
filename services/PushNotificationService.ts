// services/PushNotificationService.ts
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform, Vibration } from "react-native";

class PushNotificationService {
  private static instance: PushNotificationService;

  static getInstance(): PushNotificationService {
    if (!PushNotificationService.instance) {
      PushNotificationService.instance = new PushNotificationService();
    }
    return PushNotificationService.instance;
  }

  static async initializePushNotifications(): Promise<void> {
    try {
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          console.log("Failed to get push token for push notification!");
          return;
        }

        // Configure notification handler
        Notifications.setNotificationHandler({
          handleNotification: async (notification) => {
            console.log("📱 Notification received:", notification);

            // Trigger vibration
            Vibration.vibrate(500);

            return {
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: true,
            };
          },
        });

        // Create notification channels for Android
        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "Default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
            sound: "default",
            enableVibrate: true,
            showBadge: true,
          });

          await Notifications.setNotificationChannelAsync("todo-deadlines", {
            name: "Todo Deadlines",
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 500, 250, 500],
            lightColor: "#FF231F7C",
            sound: "default",
            enableVibrate: true,
            showBadge: true,
          });

          await Notifications.setNotificationChannelAsync("social", {
            name: "Social Interactions",
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 300, 200, 300],
            lightColor: "#FF231F7C",
            sound: "default",
            enableVibrate: true,
            showBadge: true,
          });
        }

        console.log("✅ Push notifications initialized successfully");
      } else {
        console.log("📱 Must use physical device for Push Notifications");
      }
    } catch (error) {
      console.error("❌ Error initializing push notifications:", error);
    }
  }

  static async setupNotificationHandlers(): Promise<void> {
    try {
      console.log("🔔 Setting up notification handlers...");

      // Set notification handler
      Notifications.setNotificationHandler(async (notification) => {
        return {
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
          shouldShowBanner: true,
          shouldShowList: true,
        };
      });

      // Handle notification received while app is running
      const notificationReceivedListener =
        Notifications.addNotificationReceivedListener((notification) => {
          console.log("📱 Notification received:", notification);
          // Add vibration
          Vibration.vibrate(500);
        });

      // Handle notification response (when user taps notification)
      const notificationResponseListener =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log("👆 Notification response:", response);
          const data = response.notification.request.content.data;

          // Handle different notification types
          if (data.type === "todo_deadline") {
            console.log("📋 Todo deadline notification tapped");
            // Navigate to todo screen or specific todo
          } else if (data.type === "post_like") {
            console.log("❤️ Post like notification tapped");
            // Navigate to post
          } else if (data.type === "comment") {
            console.log("💬 Comment notification tapped");
            // Navigate to post with comments
          }
        });

      console.log("✅ Notification handlers setup complete");
    } catch (error) {
      console.error("❌ Error setting up notification handlers:", error);
    }
  }

  // Static method for sending comment notifications (for ExploreScreen)
  static async sendCommentNotification(
    postAuthor: string,
    postTitle: string,
    commenterName: string,
    postId: string
  ): Promise<string> {
    return this.getInstance().sendCommentNotification(
      postAuthor,
      postTitle,
      commenterName,
      postId
    );
  }

  async presentNotification(
    title: string,
    body: string,
    data: any = {},
    channelId: string = "default"
  ): Promise<string> {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: "default",
          priority: Notifications.AndroidNotificationPriority.HIGH,
          vibrate: [0, 250, 250, 250],
          icon: "notification-icon", // App icon
          color: "#1a1a2e", // App theme color
        },
        trigger: null, // Send immediately
      });

      console.log("📤 Immediate notification sent:", notificationId);
      return notificationId;
    } catch (error) {
      console.error("❌ Error presenting notification:", error);
      throw error;
    }
  }

  async scheduleLocalNotification(
    title: string,
    body: string,
    data: any = {},
    seconds: number = 0,
    channelId: string = "default"
  ): Promise<string> {
    try {
      const trigger = seconds > 0 ? { seconds } : null;

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: "default",
          priority: Notifications.AndroidNotificationPriority.HIGH,
          vibrate: [0, 250, 250, 250],
          icon: "notification-icon",
          color: "#1a1a2e",
        },
        trigger,
      });

      console.log("📅 Scheduled notification:", notificationId);
      return notificationId;
    } catch (error) {
      console.error("❌ Error scheduling notification:", error);
      throw error;
    }
  }

  async scheduleTodoDeadlineNotification(
    todoId: string,
    todoTitle: string,
    deadline: Date,
    channelId: string = "todo-deadlines"
  ): Promise<string> {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Todo Deadline Reminder",
          body: `Task due soon: ${todoTitle}`,
          data: {
            todoId,
            type: "todo_deadline",
            deadline: deadline.toISOString(),
          },
          sound: "default",
          priority: Notifications.AndroidNotificationPriority.HIGH,
          vibrate: [0, 500, 250, 500],
          icon: "notification-icon",
          color: "#1a1a2e",
        },
        trigger: { date: deadline },
      });

      console.log("📋 Todo deadline notification scheduled:", notificationId);
      return notificationId;
    } catch (error) {
      console.error("❌ Error scheduling todo deadline notification:", error);
      throw error;
    }
  }

  async sendPostLikeNotification(
    postAuthor: string,
    postTitle: string,
    likerName: string,
    postId: string
  ): Promise<string> {
    try {
      const notificationId = await this.presentNotification(
        "New Like",
        `${likerName} liked your post: ${postTitle}`,
        {
          type: "post_like",
          postId,
          postAuthor,
          likerName,
        },
        "social"
      );

      console.log("❤️ Post like notification sent:", notificationId);
      return notificationId;
    } catch (error) {
      console.error("❌ Error sending post like notification:", error);
      throw error;
    }
  }

  async sendCommentNotification(
    postAuthor: string,
    postTitle: string,
    commenterName: string,
    postId: string
  ): Promise<string> {
    try {
      const notificationId = await this.presentNotification(
        "New Comment",
        `${commenterName} commented on your post: ${postTitle}`,
        {
          type: "comment",
          postId,
          postAuthor,
          commenterName,
        },
        "social"
      );

      console.log("💬 Comment notification sent:", notificationId);
      return notificationId;
    } catch (error) {
      console.error("❌ Error sending comment notification:", error);
      throw error;
    }
  }

  async sendRepositoryStarNotification(
    repoName: string,
    starrerName: string,
    repoId: string
  ): Promise<string> {
    try {
      const notificationId = await this.presentNotification(
        "Repository Starred",
        `${starrerName} starred your repository: ${repoName}`,
        {
          type: "repo_star",
          repoId,
          starrerName,
        },
        "social"
      );

      console.log("⭐ Repository star notification sent:", notificationId);
      return notificationId;
    } catch (error) {
      console.error("❌ Error sending repository star notification:", error);
      throw error;
    }
  }

  async cancelNotification(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      console.log("❌ Cancelled notification:", notificationId);
    } catch (error) {
      console.error("❌ Error cancelling notification:", error);
      throw error;
    }
  }

  async cancelAllScheduledNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log("❌ Cancelled all scheduled notifications");
    } catch (error) {
      console.error("❌ Error cancelling all notifications:", error);
      throw error;
    }
  }

  async getPendingNotifications(): Promise<
    Notifications.NotificationRequest[]
  > {
    try {
      const notifications =
        await Notifications.getAllScheduledNotificationsAsync();
      console.log("📋 Pending notifications:", notifications.length);
      return notifications;
    } catch (error) {
      console.error("❌ Error getting pending notifications:", error);
      throw error;
    }
  }
}

export const pushNotificationService = PushNotificationService.getInstance();
export { PushNotificationService };
