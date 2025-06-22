// screens/SettingsScreen.tsx
import { SettingsGroup } from "@/components/settings/SettingsGroup";
import { SettingsSelector } from "@/components/settings/SettingsSelector";
import { SettingsSlider } from "@/components/settings/SettingsSlider";
import { SettingsButton } from "@/components/settings/SettingsButton";
import React, { JSX, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen(): JSX.Element {
  // State management for all settings
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [volume, setVolume] = useState(75);
  const [notifications, setNotifications] = useState("all");
  const [autoBackup, setAutoBackup] = useState("daily");

  // Options for selectors
  const themeOptions = [
    { label: "Dark Mode", value: "dark" },
    { label: "Light Mode", value: "light" },
    { label: "Follow System", value: "system" },
  ];

  const languageOptions = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Japanese", value: "ja" },
  ];

  const notificationOptions = [
    { label: "All Notifications", value: "all" },
    { label: "Important Only", value: "important" },
    { label: "None", value: "none" },
  ];

  const backupOptions = [
    { label: "Never", value: "never" },
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  // Action handlers
  const handleSaveSettings = () => {
    // Here you would save to AsyncStorage, API, etc.
    Alert.alert(
      "Settings Saved",
      "Your preferences have been updated successfully."
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      "Reset Settings",
      "Are you sure you want to reset all settings to default values?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            setFontSize(16);
            setTheme("dark");
            setLanguage("en");
            setVolume(75);
            setNotifications("all");
            setAutoBackup("daily");
          },
        },
      ]
    );
  };

  const handleExportData = () => {
    // Implement data export logic
    Alert.alert(
      "Export Data",
      "Data export functionality would be implemented here."
    );
  };
  
    return (
      <SafeAreaView className="flex-1 bg-modern-dark-bg-primary">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Display Settings */}
          <SettingsGroup
            title="Display & Appearance"
            description="Customize how the app looks and feels"
            variant="card"
          >
            <SettingsSelector
              icon="color-palette-outline"
              iconBackground="#6366F1"
              title="Theme"
              subtitle="Choose your preferred color scheme"
              options={themeOptions}
              selectedValue={theme}
              onValueChange={setTheme}
            />

            <SettingsSlider
              icon="text-outline"
              iconBackground="#10B981"
              title="Font Size"
              subtitle="Adjust text size for better readability"
              value={fontSize}
              minimumValue={12}
              maximumValue={24}
              step={2}
              onValueChange={setFontSize}
              formatValue={(value) => `${value}px`}
              isLast
            />
          </SettingsGroup>

          {/* Audio Settings */}
          <SettingsGroup
            title="Audio & Notifications"
            description="Control sound and notification preferences"
            variant="card"
          >
            <SettingsSlider
              icon="volume-high-outline"
              iconBackground="#F59E0B"
              title="Master Volume"
              subtitle="Adjust overall app volume"
              value={volume}
              minimumValue={0}
              maximumValue={100}
              step={5}
              onValueChange={setVolume}
              formatValue={(value) => `${value}%`}
            />

            <SettingsSelector
              icon="notifications-outline"
              iconBackground="#8B5CF6"
              title="Notifications"
              subtitle="Choose which notifications to receive"
              options={notificationOptions}
              selectedValue={notifications}
              onValueChange={setNotifications}
              isLast
            />
          </SettingsGroup>

          {/* Localization */}
          <SettingsGroup
            title="Language & Region"
            description="Set your preferred language and regional settings"
            variant="card"
          >
            <SettingsSelector
              icon="language-outline"
              iconBackground="#F59E0B"
              title="Language"
              subtitle="Select your preferred language"
              options={languageOptions}
              selectedValue={language}
              onValueChange={setLanguage}
              isLast
            />
          </SettingsGroup>

          {/* Data & Backup */}
          <SettingsGroup
            title="Data & Backup"
            description="Manage your data and backup preferences"
            variant="card"
          >
            <SettingsSelector
              icon="cloud-upload-outline"
              iconBackground="#06B6D4"
              title="Auto Backup"
              subtitle="Automatically backup your data"
              options={backupOptions}
              selectedValue={autoBackup}
              onValueChange={setAutoBackup}
              isLast
            />
          </SettingsGroup>

          {/* Action Buttons */}
          <View className="mt-4">
            <SettingsButton
              title="Export Data"
              subtitle="Download your data as a backup file"
              variant="secondary"
              icon="download-outline"
              onPress={handleExportData}
            />

            <SettingsButton
              title="Save All Changes"
              subtitle="Apply and save all your settings"
              variant="primary"
              icon="checkmark-outline"
              onPress={handleSaveSettings}
            />

            <SettingsButton
              title="Reset to Defaults"
              subtitle="Restore all settings to their original values"
              variant="danger"
              icon="refresh-outline"
              onPress={handleResetSettings}
            />
          </View>

          <View className="h-8" />
        </ScrollView>
      </SafeAreaView>
    );
  };
