// screens/SettingsScreen.tsx
import { DangerButton } from "@/components/settings/DangerButton";
import { ProfileCard } from "@/components/settings/ProfileCard";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsItem } from "@/components/settings/SettingsItem";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { useModernTheme } from "@/context/ThemeContext";
import { useThemeToggle } from "@/hooks/useColorScheme";
import { useAccentColors, useStatusColors } from "@/hooks/useThemeColor";
import { useAuthStore } from "@/store/authStore";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ColorValue,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const signOut = useAuthStore((state) => state.signOut);
  const user = useAuthStore((state) => state.user);

  // Use specialized theme hooks for better organization
  const { isDarkTheme, toggleTheme } = useThemeToggle();
  const { colors, gradients } = useModernTheme();
  const accentColors = useAccentColors();
  const statusColors = useStatusColors();

  // Local state for other settings
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(true);

  // Get greeting based on time of day
  const getGreeting = () => {
    try {
      const hour = new Date().getHours();
      if (hour < 12) return "Good morning";
      if (hour < 17) return "Good afternoon";
      return "Good evening";
    } catch (error) {
      return "Hello";
    }
  };

  // Profile image URL (same as ProfileHeader)
  const profileImageUrl =
    "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=";

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/auth/signin");
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Handle account deletion
            console.log("Account deletion requested");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background.primary }}
    >
      <LinearGradient
        colors={
          gradients.background as [ColorValue, ColorValue, ...ColorValue[]]
        }
        style={StyleSheet.absoluteFillObject}
      />

      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor={colors.background.primary}
      />

      <SettingsHeader
        title="Settings"
        showNotifications={false}
        // onNotificationsPress={() => router.push("/notifications")}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
      >
        {/* Profile Section */}
        <ProfileCard
          name={`${getGreeting() || "Hello"}, ${
            user?.firstName || user?.email || "User"
          }!`}
          username={user?.email || "user@example.com"}
          avatar={profileImageUrl || ""}
          isOnline={true}
          showArrow={false}
          // onPress={() => router.push("/profile")}
        />

        {/* Account Settings */}
        <SettingsSection title="Account">
          <SettingsItem
            icon="person-outline"
            iconBackground={accentColors.blue.main}
            title="Profile Information"
            subtitle="Name, email, bio"
            // onPress={() => router.push("/profile-edit")}
          />
          <SettingsItem
            icon="key-outline"
            iconBackground={accentColors.green.main}
            title="Password & Security"
            subtitle="Change password, 2FA"
            // onPress={() => router.push("/security")}
          />
          <SettingsItem
            icon="card-outline"
            iconBackground={accentColors.purple.main}
            title="Billing & Plans"
            subtitle="Manage subscription"
            // onPress={() => router.push("/billing")}
          />
          <SettingsItem
            icon="shield-checkmark-outline"
            iconBackground={accentColors.indigo.main}
            title="Privacy Settings"
            subtitle="Control your data"
            onPress={() => router.push("./PrivacySettings")}
            isLast={true}
          />
        </SettingsSection>

        {/* App Preferences */}
        <SettingsSection title="Preferences">
          <SettingsItem
            icon={isDarkTheme ? "moon" : "sunny-outline"}
            iconBackground={accentColors.indigo.main}
            title="Theme"
            subtitle={isDarkTheme ? "Dark mode enabled" : "Light mode enabled"}
            hasSwitch={true}
            switchValue={isDarkTheme}
            onSwitchChange={toggleTheme}
            showChevron={false}
          />
          <SettingsItem
            icon="language-outline"
            iconBackground={accentColors.blue.main}
            title="Language"
            value="English"
            // onPress={() => router.push("/language")}
          />
          <SettingsItem
            icon="code-outline"
            iconBackground={accentColors.green.main}
            title="Code Editor"
            subtitle="Theme, font size, shortcuts"
            // onPress={() => router.push("/editor-settings")}
          />
          <SettingsItem
            icon="git-branch-outline"
            iconBackground={accentColors.orange.main}
            title="Git Configuration"
            subtitle="Default branch, merge strategy"
            // onPress={() => router.push("/git-settings")}
            isLast={true}
          />
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection title="Notifications">
          <SettingsItem
            icon="notifications-outline"
            iconBackground={statusColors.error.main}
            title="Push Notifications"
            subtitle="Get notified about activity"
            hasSwitch={true}
            switchValue={pushNotifications}
            onSwitchChange={setPushNotifications}
            showChevron={false}
            badge={pushNotifications ? 0 : 3}
          />
          <SettingsItem
            icon="mail-outline"
            iconBackground={accentColors.blue.main}
            title="Email Notifications"
            subtitle="Receive updates via email"
            hasSwitch={true}
            switchValue={emailNotifications}
            onSwitchChange={setEmailNotifications}
            showChevron={false}
          />
          <SettingsItem
            icon="time-outline"
            iconBackground={accentColors.purple.main}
            title="Notification Schedule"
            value="9 AM - 6 PM"
            // onPress={() => router.push("/notification-schedule")}
            isLast={true}
          />
        </SettingsSection>

        {/* Security */}
        <SettingsSection title="Security">
          <SettingsItem
            icon="finger-print-outline"
            iconBackground={accentColors.green.main}
            title="Biometric Authentication"
            subtitle="Use Face ID or Touch ID"
            hasSwitch={true}
            switchValue={biometricAuth}
            onSwitchChange={setBiometricAuth}
            showChevron={false}
          />
          <SettingsItem
            icon="lock-closed-outline"
            iconBackground={accentColors.orange.main}
            title="App Lock"
            subtitle="Require authentication to open"
            // onPress={() => router.push("/app-lock")}
          />
          <SettingsItem
            icon="eye-off-outline"
            iconBackground={accentColors.indigo.main}
            title="Active Sessions"
            subtitle="Manage logged in devices"
            // onPress={() => router.push("/sessions")}
            isLast={true}
          />
        </SettingsSection>

        {/* Support */}
        <SettingsSection title="Support">
          <SettingsItem
            icon="help-circle-outline"
            iconBackground={accentColors.blue.main}
            title="Help Center"
            subtitle="Get help and support"
            // onPress={() => router.push("/help")}
          />
          <SettingsItem
            icon="chatbubble-outline"
            iconBackground={accentColors.green.main}
            title="Contact Support"
            subtitle="Get in touch with our team"
            // onPress={() => router.push("/contact")}
          />
          <SettingsItem
            icon="star-outline"
            iconBackground={accentColors.orange.main}
            title="Rate the App"
            subtitle="Share your feedback"
            onPress={() => {
              // Handle app rating
              console.log("Rate app pressed");
            }}
          />
          <SettingsItem
            icon="information-circle-outline"
            iconBackground={accentColors.purple.main}
            title="About"
            value="v2.1.0"
            // onPress={() => router.push("/about")}
            isLast={true}
          />
        </SettingsSection>

        {/* Danger Zone */}
        <SettingsSection title="Account Actions">
          <SettingsItem
            icon="log-out-outline"
            iconBackground={statusColors.warning.main}
            title="Sign Out"
            subtitle="Sign out of your account"
            onPress={handleLogout}
            showChevron={false}
            isLast={true}
          />
        </SettingsSection>

        <DangerButton title="Delete Account" onPress={handleDeleteAccount} />
      </ScrollView>
    </SafeAreaView>
  );
}
