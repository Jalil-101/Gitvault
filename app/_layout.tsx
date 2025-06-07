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

// _layout.tsx
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { GITHUB_DARK, GITHUB_LIGHT } from "../constants/Colors"; // Add this import
import { ThemeProvider } from "../context/ThemeContext";

import "../global.css";


export default function RootLayout() {
  const colorScheme = useColorScheme(); // returns "light" or "dark"
  

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar
          style={colorScheme === "dark" ? "light" : "dark"}
          backgroundColor={
            colorScheme === "dark" ? GITHUB_DARK.bg : GITHUB_LIGHT.bg
          }
        />
        <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="index" />
            <Stack.Screen name="Welcome" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="(auth)" /> */}
          <Stack.Screen name="(tabs)" />
          
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
