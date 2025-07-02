// app/screens/layout.tsx
import { Stack } from "expo-router";

export default function RepositoryLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          paddingTop: 24,
        },
      }}
    >
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="RepositoryListScreen"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
