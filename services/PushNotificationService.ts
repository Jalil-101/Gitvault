// services/PushNotificationService.ts
import Constants from "expo-constants";
import * as Device from "expo-device";
import type { NotificationTriggerInput } from "expo-notifications";
import * as Notifications from "expo-notifications";
import { AndroidNotificationPriority } from "expo-notifications";
import { Platform } from "react-native";

// Configure how notifications are handled when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export class PushNotificationService {
  static sendCommentNotification(
    authorUsername: string,
    title: string,
    currentUser: string
  ) {
    console.log(
      `Comment notification: ${authorUsername} commented on ${title}`
    );
  }
  static setupNotificationHandlers() {
    console.log("Setting up notification handlers");
  }
  static initializePushNotifications() {
    console.log("Initializing push notifications");
  }
  static sendStarNotification(
    ownerUsername: string,
    name: string,
    currentUser: string
  ) {
    console.log(
      `Star notification: ${currentUser} starred ${name} by ${ownerUsername}`
    );
  }
  private static instance: PushNotificationService;
  private expoPushToken: string | null = null;

  public static getInstance(): PushNotificationService {
    if (!PushNotificationService.instance) {
      PushNotificationService.instance = new PushNotificationService();
    }
    return PushNotificationService.instance;
  }

  /**
   * Initialize push notifications and get the push token
   */
  async initialize(): Promise<string | null> {
    try {
      // Check if device supports push notifications
      if (!Device.isDevice) {
        console.log("Must use physical device for Push Notifications");
        return null;
      }

      // Request permissions
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return null;
      }

      // Get the push token
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });

      this.expoPushToken = token.data;
      console.log("Push token:", token.data);

      // Configure notification channel for Android
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
          sound: "default",
        });
      }

      return token.data;
    } catch (error) {
      console.error("Error initializing push notifications:", error);
      return null;
    }
  }

  /**
   * Get the current push token
   */
  getPushToken(): string | null {
    return this.expoPushToken;
  }

  /**
   * Schedule a local notification (for testing)
   */
  async scheduleLocalNotification(
    title: string,
    body: string,
    data?: any,
    seconds: number = 5
  ): Promise<string> {
    try {
      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: true,
          priority: AndroidNotificationPriority.HIGH,
        },
        trigger: {
          seconds,
          repeats: false,
        } as NotificationTriggerInput,
      });
      return identifier;
    } catch (error) {
      console.error("Error scheduling notification:", error);
      throw error;
    }
  }

  /**
   * Send notification immediately (FIXED - now uses scheduleNotificationAsync)
   */
  async presentNotification(
    title: string,
    body: string,
    data?: any
  ): Promise<string> {
    try {
      // Use scheduleNotificationAsync with trigger: null for immediate notification
      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: true,
          priority: AndroidNotificationPriority.HIGH,
        },
        trigger: null, // null trigger means show immediately
      });
      return identifier;
    } catch (error) {
      console.error("Error presenting notification:", error);
      throw error;
    }
  }

  /**
   * Set up notification listeners
   */
  setupNotificationListeners(
    onNotificationReceived?: (notification: Notifications.Notification) => void,
    onNotificationResponse?: (
      response: Notifications.NotificationResponse
    ) => void
  ) {
    // Listener for when a notification is received while the app is foregrounded
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
        onNotificationReceived?.(notification);
      }
    );

    // Listener for when a user taps on or interacts with a notification
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response:", response);
        onNotificationResponse?.(response);
      });

    // Return cleanup function
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }

  /**
   * Clear all notifications from the notification tray
   */
  async dismissAllNotifications(): Promise<void> {
    try {
      await Notifications.dismissAllNotificationsAsync();
    } catch (error) {
      console.error("Error dismissing notifications:", error);
    }
  }

  /**
   * Set badge count (iOS)
   */
  async setBadgeCount(count: number): Promise<void> {
    try {
      await Notifications.setBadgeCountAsync(count);
    } catch (error) {
      console.error("Error setting badge count:", error);
    }
  }

  /**
   * Get badge count (iOS)
   */
  async getBadgeCount(): Promise<number> {
    try {
      return await Notifications.getBadgeCountAsync();
    } catch (error) {
      console.error("Error getting badge count:", error);
      return 0;
    }
  }
}

// Export singleton instance
export const pushNotificationService = PushNotificationService.getInstance();
