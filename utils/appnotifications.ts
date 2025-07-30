// utils/appnotifications.ts
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

// Remove duplicate notification handler - it's handled in PushNotificationService.ts
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// });

export async function requestNotificationPermissions() {
  try {
    if (!Device.isDevice) {
      console.log("📱 Must use physical device for Push Notifications");
      return false;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("❌ Failed to get push token for push notification!");
      return false;
    }

    // Remove duplicate Android channel setup - it's handled in PushNotificationService.ts
    // if (Platform.OS === "android") {
    //   await Notifications.setNotificationChannelAsync("default", {
    //     name: "Default",
    //     importance: Notifications.AndroidImportance.MAX,
    //     vibrationPattern: [0, 250, 250, 250],
    //     lightColor: "#FF231F7C",
    //     sound: "default",
    //     enableVibrate: true,
    //     showBadge: true,
    //   });

    //   await Notifications.setNotificationChannelAsync("todo-deadlines", {
    //     name: "Todo Deadlines",
    //     importance: Notifications.AndroidImportance.HIGH,
    //     vibrationPattern: [0, 500, 250, 500],
    //     lightColor: "#FF231F7C",
    //     sound: "default",
    //     enableVibrate: true,
    //     showBadge: true,
    //   });
    // }

    console.log("✅ Notification permissions granted");
    return true;
  } catch (error) {
    console.error("❌ Error requesting notification permissions:", error);
    return false;
  }
}

export async function scheduleTodoNotification(
  todoId: string,
  title: string,
  deadline: Date,
  type: "reminder" | "final" = "reminder"
): Promise<string> {
  try {
    // Ensure we have permissions
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      throw new Error("Notification permissions not granted");
    }

    const notificationTitle =
      type === "final" ? "Todo Deadline Today!" : "Todo Deadline Reminder";

    const notificationBody =
      type === "final"
        ? `Your task is due today: ${title}`
        : `Task due soon: ${title}`;

    console.log(
      `📅 Attempting to schedule ${type} notification for "${title}" at ${deadline.toISOString()}`
    );

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: notificationTitle,
        body: notificationBody,
        data: {
          todoId,
          type: "todo_deadline",
          notificationType: type,
        },
        sound: "default",
        priority: Notifications.AndroidNotificationPriority.HIGH,
        vibrate: [0, 500, 250, 500],
      },
      trigger: { date: deadline },
    });

    console.log(
      `✅ Successfully scheduled ${type} notification for todo: ${title} at ${deadline.toISOString()}`
    );
    console.log(`📋 Notification ID: ${notificationId}`);

    return notificationId;
  } catch (error) {
    console.error("❌ Error scheduling todo notification:", error);
    throw error;
  }
}

export async function scheduleImmediateNotification(
  title: string,
  body: string,
  data: any = {}
): Promise<string> {
  try {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      throw new Error("Notification permissions not granted");
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: "default",
        priority: Notifications.AndroidNotificationPriority.HIGH,
        vibrate: [0, 250, 250, 250],
      },
      trigger: null, // Send immediately
    });

    console.log(`📤 Immediate notification sent: ${title}`);
    return notificationId;
  } catch (error) {
    console.error("❌ Error sending immediate notification:", error);
    throw error;
  }
}

export async function cancelNotification(
  notificationId: string
): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log("❌ Cancelled notification:", notificationId);
  } catch (error) {
    console.error("❌ Error cancelling notification:", error);
    throw error;
  }
}

export async function cancelAllNotifications(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log("❌ Cancelled all scheduled notifications");
  } catch (error) {
    console.error("❌ Error cancelling all notifications:", error);
    throw error;
  }
}

export async function getPendingNotifications(): Promise<
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
