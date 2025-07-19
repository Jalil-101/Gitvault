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
      <Stack.Screen name="CommitsScreen" options={{ headerShown: false }} />
      <Stack.Screen name="StarsScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
