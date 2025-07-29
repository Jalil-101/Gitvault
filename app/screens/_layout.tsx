// app/screens/layout.tsx
import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <Stack>
      <Stack.Screen name="SearchScreen" options={{ headerShown: false }} />
      <Stack.Screen name="SettingsScreen" options={{ headerShown: false }} />
      
      <Stack.Screen
        name="ExploreRepositoryLisitingScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Todo" options={{ headerShown: false }} />\
      <Stack.Screen name="PrivacySettings" options={{ headerShown: false }} />
      <Stack.Screen name="BillingPlansScreen" options={{ headerShown: false }} />
      <Stack.Screen name="PasswordSecurityScreen" options={{ headerShown: false }} />
      <Stack.Screen name="LanguagesScreen" options={{ headerShown: false }} />
      <Stack.Screen name="GitConfigScreen" options={{ headerShown: false }} />
      <Stack.Screen name="NotificationScheduleScreen" options={{ headerShown: false }} />
      <Stack.Screen name="AppLockScreen" options={{ headerShown: false }} />
      <Stack.Screen name="HelpCenterScreen" options={{ headerShown: false }} />
      <Stack.Screen name="ContactSupportScreen" options={{ headerShown: false }} />
      <Stack.Screen name="CodeEditorScreen" options={{ headerShown: false }} />
      <Stack.Screen name="CommitsScreen" options={{ headerShown: false }} />
      <Stack.Screen name="StarsScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
