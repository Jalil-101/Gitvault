// app/_layout.tsx
import { pushNotificationService } from "@/services/PushNotificationService";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
// import NetInfo from "@react-native-async-storage/async-storage";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
// Import your modern theme system
import { ModernThemeProvider, useModernTheme } from "@/context/ThemeContext";
import { useColorScheme } from "@/hooks/useColorScheme";

// Import your existing Zustand auth store
import { useAuthStore } from "@/store/authStore";

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

  // Add this in your _layout.tsx

  useEffect(() => {
    // Test store access
    const store = useAuthStore.getState();
    console.log("🏪 Initial Store State:", {
      isAuthenticated: store.isAuthenticated,
      loading: store.loading,
      isFirstTime: store.isFirstTime,
      user: store.user,
      // Add other store properties
    });

    // Test store methods exist
    console.log("🔧 Store Methods Available:", {
      verifyAuth: typeof store.verifyAuth,
      signIn: typeof store.signIn,
      signOut: typeof store.signOut,
      // Add other methods you expect
    });
  }, []);

  useEffect(() => {
    const unsubscribe = useAuthStore.subscribe((state) => ({
      loading: state.loading,
      isAuthenticated: state.isAuthenticated,
      isFirstTime: state.isFirstTime,
    }));

    return () => {
      unsubscribe(); // ✅ Clean up on unmount
    };
  }, []);
  // Add network interceptor to see all requests
  const originalFetch = global.fetch;
  global.fetch = (...args) => {
    console.log("📤 Network Request:", args[0]);
    return originalFetch(...args)
      .then((response) => {
        console.log("📥 Network Response:", {
          url: args[0],
          status: response.status,
          ok: response.ok,
        });
        return response;
      })
      .catch((error) => {
        console.error("🚫 Network Error:", {
          url: args[0],
          error: error.message,
        });
        throw error;
      });
  };

  useEffect(() => {
    // Don't navigate until navigation is ready and not loading
    if (!isNavigationReady || loading) return;

    // Add a small delay to ensure the layout is fully mounted
    const navigationTimeout = setTimeout(() => {
      const inAuthGroup = segments[0] === "auth";
      const inOnboardingGroup = segments[0] === "onboarding";
      const inTabsGroup = segments[0] === "(tabs)";

      if (!isAuthenticated) {
        // User is not authenticated - redirect to auth screens
        if (!inAuthGroup) {
          router.replace("/auth/signin");
        }
      } else {
        // User is authenticated
        if (isFirstTime) {
          // User hasn't completed onboarding - redirect to onboarding
          if (!inOnboardingGroup) {
            router.replace("/onboarding");
          }
        } else {
          // User is authenticated and has completed onboarding - redirect to main app
          if (inAuthGroup || inOnboardingGroup) {
            router.replace("/(tabs)");
          }
        }
      }
    }, 100); // Small delay to ensure mounting is complete

    return () => clearTimeout(navigationTimeout);
  }, [
    isAuthenticated,
    loading,
    isFirstTime,
    segments,
    isNavigationReady,
    router,
  ]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={navigationTheme}>
        {/* Show loading screen while navigation is not ready */}
        {!isNavigationReady || loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkTheme ? "#0A0A0F" : "#FFFFFF",
            }}
          >
            <View className="w-16 h-16 rounded-full bg-blue-500 items-center justify-center mb-4">
              <Text className="text-white text-2xl font-bold">GH</Text>
            </View>
            <Text
              className={`text-lg font-medium ${
                isDarkTheme ? "text-white" : "text-gray-900"
              }`}
            >
              Loading...
            </Text>
          </View>
        ) : (
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: isDarkTheme ? "#0A0A0F" : "#FFFFFF",
              },
              animation: "slide_from_right",
            }}
          >
            {/* Auth Screens */}
            <Stack.Screen
              name="auth/signin"
              options={{
                title: "Sign In",
                presentation: "card",
                gestureEnabled: false, // Prevent swipe back on auth screens
              }}
            />
            <Stack.Screen
              name="auth/signup"
              options={{
                title: "Sign Up",
                presentation: "card",
                gestureEnabled: false,
              }}
            />
            vv
            {/* Onboarding Screens */}
            <Stack.Screen
              name="onboarding/index"
              options={{
                title: "Welcome",
                gestureEnabled: false, // Prevent going back during onboarding
              }}
            />
            <Stack.Screen
              name="onboarding/profile-setup"
              options={{
                title: "Profile Setup",
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="onboarding/preferences"
              options={{
                title: "Preferences",
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="onboarding/complete"
              options={{
                title: "Complete Setup",
                gestureEnabled: false,
              }}
            />
            {/* Main App Screens */}
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
                gestureEnabled: false, // Prevent accidental navigation back to auth
              }}
            />
            {/* Modal Screens - These can be accessed from within the app */}
            <Stack.Screen
              name="modal/repository-create"
              options={{
                title: "Create Repository",
                presentation: "modal",
                animation: "slide_from_bottom",
              }}
            />
            <Stack.Screen
              name="modal/user-profile"
              options={{
                title: "User Profile",
                presentation: "modal",
                animation: "slide_from_bottom",
              }}
            />
            <Stack.Screen
              name="modal/settings"
              options={{
                title: "Settings",
                presentation: "modal",
                animation: "slide_from_bottom",
              }}
            />
            {/* Repository Detail Screens */}
            <Stack.Screen
              name="repository/[id]"
              options={{
                title: "Repository",
                presentation: "card",
              }}
            />
            <Stack.Screen
              name="repository/[id]/issues"
              options={{
                title: "Issues",
                presentation: "card",
              }}
            />
            <Stack.Screen
              name="repository/[id]/pull-requests"
              options={{
                title: "Pull Requests",
                presentation: "card",
              }}
            />
            {/* User Profile Screens */}
            <Stack.Screen
              name="user/[username]"
              options={{
                title: "User Profile",
                presentation: "card",
              }}
            />
            {/* Search Results */}
            <Stack.Screen
              name="search/results"
              options={{
                title: "Search Results",
                presentation: "card",
              }}
            />
            {/* 404 Screen */}
            <Stack.Screen
              name="+not-found"
              options={{
                title: "Not Found",
              }}
            />
          </Stack>
        )}

        <StatusBar style={isDarkTheme ? "light" : "dark"} />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

// Theme-aware layout component
function ThemedLayout() {
  return <AuthAwareNavigation />;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    // Add your custom fonts here if needed
    // 'Inter': require('../assets/fonts/Inter-Regular.ttf'),
    // 'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    // 'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Initialize push notifications
  useEffect(() => {
    // Initialize push notifications
    const initNotifications = async () => {
      try {
        await pushNotificationService.initialize();
        // Optional: Clear notifications when app starts
        // await pushNotificationService.dismissAllNotifications();
      } catch (error) {
        console.error("Failed to initialize push notifications:", error);
      }
    };

    initNotifications();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ModernThemeProvider>
      <ThemedLayout />
    </ModernThemeProvider>
  );
}
