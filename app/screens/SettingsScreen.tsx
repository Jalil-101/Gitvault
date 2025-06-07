// screens/SettingsScreen.tsx
import React, { useState } from "react";
import { ScrollView, StatusBar, Animated, View, Text, Platform} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";
import { useSettingsActions } from "@/hooks/useSettingsActions";

// Component imports
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { LoadingOverlay } from "@/components/settings/LoadingOverlay";
import { ProfileSection } from "@/components/settings/sections/ProfileSection";
import { AppearanceSection } from "@/components/settings/sections/AppearanceSection";
import { NotificationsSection } from "@/components/settings/sections/NotificationsSection";
import { SecuritySection } from "@/components/settings/sections/SecuritySection";
import { DataPrivacySection } from "@/components/settings/sections/DataPrivacySection";
import { SupportSection } from "@/components/settings/sections/SupportSection";
import { AccountSection } from "@/components/settings/sections/AccountSection";

const SettingsScreen: React.FC = () => {
  const { theme, colors } = useTheme();
  const { isLoading } = useSettingsActions();

  // Settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privateProfileEnabled, setPrivateProfileEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  // Animation setup
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        translucent
        backgroundColor="transparent"
      />
      {Platform.OS === "android" && (
        <View
          style={{
            height: StatusBar.currentHeight,
            backgroundColor: colors.canvas.subtle,
          }}
        />
      )}
      <SafeAreaView
        className="flex-1 bg-github-light-canvas-subtle dark:bg-github-dark-canvas-default"
        edges={["top"]}
      >
        <SettingsHeader />

        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 20 }}
          >
            <ProfileSection
              privateProfileEnabled={privateProfileEnabled}
              setPrivateProfileEnabled={setPrivateProfileEnabled}
            />

            <AppearanceSection />

            <NotificationsSection
              notificationsEnabled={notificationsEnabled}
              setNotificationsEnabled={setNotificationsEnabled}
            />

            <SecuritySection
              biometricEnabled={biometricEnabled}
              setBiometricEnabled={setBiometricEnabled}
            />

            <DataPrivacySection
              analyticsEnabled={analyticsEnabled}
              setAnalyticsEnabled={setAnalyticsEnabled}
            />

            <SupportSection />

            <AccountSection />

            {/* Footer */}
            <View className="px-4 mt-8 mb-4">
              <Text className="text-center text-xs text-github-light-fg-muted dark:text-github-dark-fg-muted">
                DeVault Mobile  • Made with ❤️
              </Text>
              <Text className="text-center text-xs text-github-light-fg-muted dark:text-github-dark-fg-muted mt-1">
                Version 1.0.0 • Build 2024.1
              </Text>
            </View>
          </ScrollView>
        </Animated.View>

        <LoadingOverlay visible={isLoading} message="Signing out..." />
      </SafeAreaView>
    </>
  );
};

export default SettingsScreen;
