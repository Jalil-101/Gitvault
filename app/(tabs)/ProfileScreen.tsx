// app/(tabs)/profile.tsx
import { CreateRepositoryModal } from "@/components/CreateRepositoryModal";
import { ContributionGraph } from "@/components/profile/ContributionGraph";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { QuickActions } from "@/components/profile/QuickActions";
import { useModernTheme } from "@/context/ThemeContext";
import { useProfileData } from "@/hooks/useProfileData";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  ColorValue,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";

export default function ProfileScreen() {
  const { colors, theme, gradients } = useModernTheme();
  const { profileData, isRefreshing, handleRefresh } = useProfileData();
  const [showCreateRepoModal, setShowCreateRepoModal] = useState(false);

  const handlePress = (action: string) => {
    Alert.alert("Action", `${action} pressed`);
  };

  const handleCreateRepository = () => {
    setShowCreateRepoModal(true);
  };

  const handleRepositoryCreated = () => {
    // Refresh profile data or handle success
    console.log("Repository created successfully!");
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

        <QuickActions
          onNewRepo={handleCreateRepository}
          onViewRepos={() => handlePress("View Repositories")}
          onActivity={() => handlePress("View Activity")}
        />

        <ContributionGraph />
      </ScrollView>

      {/* Create Repository Modal */}
      <CreateRepositoryModal
        visible={showCreateRepoModal}
        onClose={() => setShowCreateRepoModal(false)}
        onSuccess={handleRepositoryCreated}
      />
    </SafeAreaView>
  );
}
