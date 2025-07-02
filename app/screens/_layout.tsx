// app/screens/layout.tsx
import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <Stack>
       <Stack.Screen name="IssueScreen" options={{ headerShown: false }} />
      <Stack.Screen name="SearchScreen" options={{ headerShown: false }} />
      <Stack.Screen name="SettingsScreen" options={{ headerShown: false }} />
      <Stack.Screen name="FileViewerScreen" options={{ headerShown: false }} />
      <Stack.Screen name="ReadmeViewerScreen" options={{ headerShown: false }} />
     
    </Stack>
  );
}
