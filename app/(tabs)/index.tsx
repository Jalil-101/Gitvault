import DashboardHeader from "@/components/home/DashboardHeader";
import OverviewSection from "@/components/home/OverviewSection";
import QuickActionsSection from "@/components/home/QuickActionsSection";
import { useModernTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ColorValue,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DebugPanel } from "@/components/DebugPanel";
import NotificationTestButton from "@/components/notifications/NotificationTestButton";
import { GitHubRepository as Repository } from "@/types/repository";

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const { colors, gradients, isDarkTheme } = useModernTheme();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };
  const repositories: Repository[] = [
    {
      id: 1,
      name: "my-awesome-app",
      full_name: "username/my-awesome-app",
      description: "A fantastic mobile app built with React Native",
      private: false,
      owner: {
        login: "username",
        avatar_url: "https://github.com/username.png",
      },
      html_url: "https://github.com/username/my-awesome-app",
      clone_url: "https://github.com/username/my-awesome-app.git",
      ssh_url: "git@github.com:username/my-awesome-app.git",
      language: "TypeScript",
      stargazers_count: 125,
      watchers_count: 28,
      forks_count: 15,
      open_issues_count: 5,
      default_branch: "main",
      created_at: "2023-06-15T10:30:00Z",
      updated_at: "2024-12-15T14:22:00Z",
      pushed_at: "2024-12-15T14:22:00Z",
      size: 4096,
      topics: ["react-native", "typescript", "mobile", "expo"],
      license: {
        name: "MIT License",
        spdx_id: "MIT",
      },
    },
    // Add more repositories...
  ];

  return (
    <View className="flex-1">
      {/* Animated Background using theme gradients */}
      <LinearGradient
        colors={
          gradients.background as [ColorValue, ColorValue, ...ColorValue[]]
        } // Cast to the required type
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView className="flex-1">
        <StatusBar
          barStyle={isDarkTheme ? "light-content" : "dark-content"}
          backgroundColor="transparent"
          translucent
        />

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.text.primary}
              colors={[colors.interactive.primary]}
              progressBackgroundColor={colors.surface.glass}
            />
          }
        >
          <DashboardHeader />
          <OverviewSection />
          <QuickActionsSection />

          <NotificationTestButton />

          {/* Debug Panel Toggle */}
          <View style={{ padding: 20 }}>
            <View
              style={{
                backgroundColor: colors.surface.primary,
                padding: 15,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border.primary,
              }}
            >
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 10,
                }}
              >
                🐛 Debug Tools
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                  marginBottom: 15,
                }}
              >
                Use these tools to troubleshoot authentication and repository
                issues.
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.interactive.primary,
                  padding: 12,
                  borderRadius: 8,
                  alignItems: "center",
                }}
                onPress={() => setShowDebugPanel(true)}
              >
                <Text
                  style={{
                    color: colors.text.inverse,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Open Debug Panel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Debug Panel */}
        <DebugPanel
          visible={showDebugPanel}
          onClose={() => setShowDebugPanel(false)}
        />
      </SafeAreaView>
    </View>
  );
}
