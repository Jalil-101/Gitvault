// app/_layout.tsx
import { PushNotificationService } from "@/services/PushNotificationService";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
// import NetInfo from "@react-native-async-storage/async-storage";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
// Import your modern theme system
import { ModernThemeProvider, useModernTheme } from "@/context/ThemeContext";

// Import your existing Zustand auth store
import { useAuthStore } from "@/store/authStore";

// Import the splash wrapper
import { SplashWrapper } from "@/components/SplashWrapper";

// Import NativeWind for Tailwind CSS support
import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

// Navigation theme configuration based on your modern colors
function createNavigationTheme(isDark: boolean) {
  if (isDark) {
    return {
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        primary: "#6366F1", // Indigo-500 from your dark theme
        background: "#0A0A0F", // Your dark primary background
        card: "#12121A", // Your dark secondary background
        text: "#FFFFFF", // Your dark primary text
        border: "rgba(255, 255, 255, 0.1)", // Your dark border
        notification: "#EF4444", // Your error color
      },
    };
  }

  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#3B82F6", // Blue-500 from your light theme
      background: "#FFFFFF", // Your light primary background
      card: "#F8FAFC", // Your light secondary background
      text: "#0F172A", // Your light primary text
      border: "#E2E8F0", // Your light border
      notification: "#EF4444", // Your error color
    },
  };
}

// Auth-aware navigation component
function AuthAwareNavigation() {
  const { isAuthenticated, loading, isFirstTime, verifyAuth } = useAuthStore();
  const { isDarkTheme } = useModernTheme();
  const segments = useSegments();
  const router = useRouter();
  const navigationTheme = createNavigationTheme(isDarkTheme);
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  console.log("Debug Auth State:", {
    isNavigationReady,
    loading,
    isAuthenticated,
    isFirstTime,
  });
  // Initialize auth verification on app start
  useEffect(() => {
    const initializeAuth = async () => {
      console.log("🚀 Starting auth verification...");
      try {
        const result = await verifyAuth();
        console.log("✅ Auth verification completed:", result);
      } catch (error) {
        console.error("❌ Auth verification failed:", error);
      } finally {
        console.log("🏁 Setting navigation ready to true");
        setIsNavigationReady(true);
      }
    };
    initializeAuth();
  }, [verifyAuth]);

  useEffect(() => {
    const checkNetwork = async () => {
      const state: NetInfoState = await NetInfo.fetch();
      console.log("🌐 Network State:", {
        connected: state.isConnected,
        type: state.type,
        details: state.details,
      });
    };
    checkNetwork();
  }, []);

  // Navigation logic based on auth state
  useEffect(() => {
    if (!isNavigationReady) return;

    const inAuthGroup = segments[0] === "auth";
    const inOnboardingGroup = segments[0] === "onboarding";

    console.log("🧭 Navigation Check:", {
      isAuthenticated,
      isFirstTime,
      inAuthGroup,
      inOnboardingGroup,
      segments,
    });

    if (isFirstTime) {
      console.log("🎯 First time user, navigating to onboarding");
      router.replace("/onboarding");
    } else if (!isAuthenticated && !inAuthGroup) {
      console.log("🔐 Not authenticated, navigating to auth");
      router.replace("/auth/signin");
    } else if (isAuthenticated && (inAuthGroup || inOnboardingGroup)) {
      console.log("✅ Authenticated, navigating to main app");
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, isFirstTime, segments, isNavigationReady, router]);

  // Show loading screen while auth is being verified
  if (!isNavigationReady || loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="repository" options={{ headerShown: false }} />
      <Stack.Screen name="screens" options={{ headerShown: false }} />
    </Stack>
  );
}

// Themed layout component
function ThemedLayout() {
  return (
    <ThemeProvider value={createNavigationTheme(false)}>
      <AuthAwareNavigation />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Initialize push notifications
        const initNotifications = async () => {
          try {
            await PushNotificationService.initializePushNotifications();
            await PushNotificationService.setupNotificationHandlers();
            console.log("✅ Push notifications initialized");
          } catch (error) {
            console.error("❌ Failed to initialize push notifications:", error);
          }
        };

        // Initialize notifications
        await initNotifications();

        // Hide the splash screen
        await SplashScreen.hideAsync();

        setIsReady(true);
      } catch (error) {
        console.error("Error preparing app:", error);
        setIsReady(true); // Still set ready to prevent infinite loading
      }
    };

    prepareApp();
  }, []);

  // Show error screen if fonts failed to load
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading fonts: {error.message}</Text>
      </View>
    );
  }

  // Show loading screen while fonts are loading
  if (!loaded || !isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ModernThemeProvider>
        <SplashWrapper>
          <ThemedLayout />
        </SplashWrapper>
      </ModernThemeProvider>
    </GestureHandlerRootView>
  );
}
