import { ThemeProvider } from "@/context/ThemeContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { getAuthStatus } from "@/lib/auth";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <TabsLayout />
    </ThemeProvider>
  );
}




const TabsLayout = () => {
  return (
    <Stack>
      {/* Show onboarding ONLY if not seen */}
      <Stack.Protected
        screenOptions={{ headerShown: false }}
        guard={async () => {
          const { hasSeenOnboarding } = await getAuthStatus();
          return !hasSeenOnboarding;
        }}
      >
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Show auth screens ONLY if not logged in */}
      <Stack.Protected
        screenOptions={{ headerShown: false }}
        guard={async () => {
          const { isAuthenticated } = await getAuthStatus();
          return !isAuthenticated;
        }}
      >
        <Stack.Screen name="auth/signin" options={{ headerShown: false }} />
        <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Show main app ONLY if logged in AND done with onboarding */}
      <Stack.Protected
        screenOptions={{ headerShown: false }}
        guard={async () => {
          const { isAuthenticated, hasSeenOnboarding } = await getAuthStatus();
          return isAuthenticated && hasSeenOnboarding;
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};
