// import { ThemeProvider } from "@/context/ThemeContext";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import "react-native-reanimated";
// // import "../global.css";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { AppearanceProvider } from "react-native-appearance";
// import { getAuthStatus } from "@/lib/auth";
// import { useEffect, useState } from "react";

// export default function RootLayout() {
//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider>
//       <TabsLayout />
//     </ThemeProvider>
//   );
// }

// const TabsLayout = () => {
//   const [authState, setAuthState] = useState<{
//     isAuthenticated: boolean;
//     hasSeenOnboarding: boolean;
//     isLoading: boolean;
//   }>({
//     isAuthenticated: false,
//     hasSeenOnboarding: false,
//     isLoading: true,
//   });

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const { isAuthenticated, hasSeenOnboarding } = await getAuthStatus();
//         setAuthState({
//           isAuthenticated,
//           hasSeenOnboarding,
//           isLoading: false,
//         });
//       } catch (error) {
//         console.error("Auth check failed:", error);
//         setAuthState({
//           isAuthenticated: false,
//           hasSeenOnboarding: false,
//           isLoading: false,
//         });
//       }
//     };

//     checkAuth();
//   }, []);

//   // Show loading while checking auth
//   if (authState.isLoading) {
//     return null; // Or a loading spinner component
//   }

//   return (
//     <Stack>
//       {/* Show onboarding ONLY if not seen */}
//       <Stack.Protected guard={!authState.hasSeenOnboarding}>
//         <Stack.Screen name="onboarding" options={{ headerShown: false }} />
//       </Stack.Protected>

//       {/* Show auth screens ONLY if not logged in */}
//       <Stack.Protected guard={!authState.isAuthenticated}>
//         <Stack.Screen name="auth/signin" options={{ headerShown: false }} />
//         <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
//       </Stack.Protected>

//       {/* Show main app ONLY if logged in AND done with onboarding */}
//       <Stack.Protected
//         guard={authState.isAuthenticated && authState.hasSeenOnboarding}
//       >
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//       </Stack.Protected>
//     </Stack>
//   );
// };


// // Version 2  should probably delete if new implementation works as expected
// // _layout.tsx
// import { Stack } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// import { StatusBar } from "expo-status-bar";
// import { useColorScheme } from "react-native";
// import { GITHUB_DARK, GITHUB_LIGHT } from "../constants/Colors"; // Add this import
// import { ThemeProvider } from "../context/ThemeContext";

// import "../global.css";


// export default function RootLayout() {
//   const colorScheme = useColorScheme(); // returns "light" or "dark"
  

//   return (
//     <SafeAreaProvider>
//       <ThemeProvider>
//         <StatusBar
//           style={colorScheme === "dark" ? "light" : "dark"}
//           backgroundColor={
//             colorScheme === "dark" ? GITHUB_DARK.bg : GITHUB_LIGHT.bg
//           }
//         />
//         <Stack screenOptions={{ headerShown: false }}>
//           {/* <Stack.Screen name="index" />
//             <Stack.Screen name="Welcome" />
//             <Stack.Screen name="onboarding" />
//             <Stack.Screen name="(auth)" /> */}
//           <Stack.Screen name="(tabs)" />
          
//         </Stack>
//       </ThemeProvider>
//     </SafeAreaProvider>
//   );
// }


// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

// Import your modern theme system
import { ModernThemeProvider, useModernTheme } from '@/context/ThemeContext';
import { useColorScheme } from '@/hooks/useColorScheme';



// Import NativeWind for Tailwind CSS support
import '../global.css'; // Make sure you have this file for NativeWind



// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

// Navigation theme configuration based on your modern colors
function createNavigationTheme(isDark: boolean) {
  if (isDark) {
    return {
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        primary: '#6366F1', // Indigo-500 from your dark theme
        background: '#0A0A0F', // Your dark primary background
        card: '#12121A', // Your dark secondary background
        text: '#FFFFFF', // Your dark primary text
        border: 'rgba(255, 255, 255, 0.1)', // Your dark border
        notification: '#EF4444', // Your error color
      },
    };
  }

  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3B82F6', // Blue-500 from your light theme
      background: '#FFFFFF', // Your light primary background
      card: '#F8FAFC', // Your light secondary background
      text: '#0F172A', // Your light primary text
      border: '#E2E8F0', // Your light border
      notification: '#EF4444', // Your error color
    },
  };
}

// Theme-aware layout component
function ThemedLayout() {
  const { isDarkTheme } = useModernTheme();
  const navigationTheme = createNavigationTheme(isDarkTheme);

  return (
    
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider value={navigationTheme}>
      
      {/* Use the Stack component from expo-router */}
      {/* <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: isDarkTheme ? '#0A0A0F' : '#FFFFFF',
          },
        }}
      >
        Define your screens here
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="onboarding" options={{ title: 'Onboarding' }} />
        <Stack.Screen name="auth/signin" options={{ title: 'Sign In' }} />
        <Stack.Screen name="auth/signup" options={{ title: 'Sign Up' }} />
      </Stack> */}
      <Stack
      screenOptions={{
        headerShown: false,}}>
           
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      
      <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
    </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  const [loaded] = useFonts({
    // Add your custom fonts here if needed
    // 'Inter': require('../assets/fonts/Inter-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (

    <ModernThemeProvider>
     
      <ThemedLayout />
    </ModernThemeProvider>
    
  );
}