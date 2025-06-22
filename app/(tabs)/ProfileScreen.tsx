// app/(tabs)/profile.tsx
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  RefreshControl,
  Alert,
  StyleSheet,
  View,
  ColorValue,
} from "react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { QuickActions } from "@/components/profile/QuickActions";
import { ActivityFeed } from "@/components/profile/ActivityFeed";
import { useProfileData } from "@/hooks/useProfileData";
import { ContributionGraph } from "@/components/profile/ContributionGraph";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen() {
  const { colors, theme, gradients } = useModernTheme();
  const { profileData, isRefreshing, handleRefresh } = useProfileData();

  const handlePress = (action: string) => {
    Alert.alert("Action", `${action} pressed`);
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: colors.background.primary,
      }}
    >
      <LinearGradient
        colors={
          gradients.background as [ColorValue, ColorValue, ...ColorValue[]]
        } // Cast to the required type
        style={StyleSheet.absoluteFillObject}
      />

      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.background.primary}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.interactive.primary}
            colors={[colors.interactive.primary]}
          />
        }
      >
        <ProfileHeader
          {...profileData.user}
          onNotificationPress={() => handlePress("NotificationsScreen")}
          onSettingsPress={() => handlePress("Settings")}
        />

        <ProfileStats stats={profileData.stats} onStatPress={handlePress} />

        <QuickActions
          onNewRepo={() => handlePress("New Repository")}
          onViewRepos={() => handlePress("View Repositories")}
          onActivity={() => handlePress("View Activity")}
        />

        <ContributionGraph />
      </ScrollView>
    </SafeAreaView>
  );
}
