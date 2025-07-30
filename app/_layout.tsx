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
  const { isAuthenticated, loading, hasCompletedOnboarding, verifyAuth } =
    useAuthStore();
  const { isDarkTheme } = useModernTheme();
  const segments = useSegments();
  const router = useRouter();
  const navigationTheme = createNavigationTheme(isDarkTheme);
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [lastNavigation, setLastNavigation] = useState<string>("");

  console.log("Debug Auth State:", {
    isNavigationReady,
    loading,
    isAuthenticated,
    hasCompletedOnboarding,
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

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log("⏰ Auth verification timeout, forcing navigation ready");
      setIsNavigationReady(true);
    }, 5000); // 5 second timeout (reduced from 10)

    initializeAuth();

    return () => clearTimeout(timeoutId);
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

  // Navigation logic based on auth state - only handle initial auth flow
  useEffect(() => {
    if (!isNavigationReady) {
      console.log("⏳ Navigation not ready yet, waiting...");
      return;
    }

    const inAuthGroup = segments[0] === "auth";
    const inOnboardingGroup = segments[0] === "onboarding";
    const inTabsGroup = segments[0] === "(tabs)";

    console.log("🧭 Navigation Check:", {
      isAuthenticated,
      hasCompletedOnboarding,
      inAuthGroup,
      inOnboardingGroup,
      inTabsGroup,
      segments,
      loading,
    });

    // Only handle initial auth flow, not internal navigation
    if (!isAuthenticated && !inAuthGroup) {
      // Not authenticated and not in auth group - go to sign in
      const targetRoute = "/auth/signin";
      if (lastNavigation !== targetRoute) {
        console.log("🔐 Not authenticated, navigating to sign in");
        setLastNavigation(targetRoute);
        try {
          router.replace(targetRoute);
        } catch (error) {
          console.error("❌ Navigation error:", error);
        }
      }
    } else if (
      isAuthenticated &&
      !hasCompletedOnboarding &&
      !inOnboardingGroup
    ) {
      // New user (from signup) needs onboarding - go to onboarding
      const targetRoute = "/onboarding";
      if (lastNavigation !== targetRoute) {
        console.log("🎯 New user needs onboarding, navigating to onboarding");
        setLastNavigation(targetRoute);
        try {
          router.replace(targetRoute);
        } catch (error) {
          console.error("❌ Navigation error:", error);
        }
      }
    } else if (
      isAuthenticated &&
      hasCompletedOnboarding &&
      (inAuthGroup || inOnboardingGroup)
    ) {
      // Returning user (from signin) or completed onboarding - go to main app
      const targetRoute = "/(tabs)";
      if (lastNavigation !== targetRoute) {
        console.log(
          "✅ Returning user or completed onboarding, navigating to main app"
        );
        setLastNavigation(targetRoute);
        try {
          router.replace(targetRoute);
        } catch (error) {
          console.error("❌ Navigation error:", error);
        }
      }
    }
  }, [
    isAuthenticated,
    hasCompletedOnboarding,
    isNavigationReady,
    router,
    loading,
    lastNavigation,
  ]);

  // Show loading screen while auth is being verified
  if (!isNavigationReady || loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0A0A0F",
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16, marginBottom: 8 }}>
          Loading...
        </Text>
        <Text style={{ color: "#64748B", fontSize: 12 }}>
          {!isNavigationReady
            ? "Initializing..."
            : "Verifying authentication..."}
        </Text>
        <Text style={{ color: "#64748B", fontSize: 10, marginTop: 8 }}>
          Auth: {isAuthenticated ? "Yes" : "No"} | Onboarding:{" "}
          {hasCompletedOnboarding ? "Complete" : "Pending"}
        </Text>
        <Text style={{ color: "#64748B", fontSize: 10, marginTop: 4 }}>
          Loading: {loading ? "Yes" : "No"} | Ready:{" "}
          {isNavigationReady ? "Yes" : "No"}
        </Text>
      </View>
    );
  }

  // Debug screen to show current state
  if (__DEV__) {
    console.log("🔍 Debug - Current State:", {
      isAuthenticated,
      hasCompletedOnboarding,
      loading,
      isNavigationReady,
      segments,
    });
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
