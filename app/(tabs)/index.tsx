import React, { useState } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  RefreshControl,
  StyleSheet,
  ColorValue,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useModernTheme } from "@/context/ThemeContext";
import DashboardHeader from "@/components/home/DashboardHeader";
import OverviewSection from "@/components/home/OverviewSection";
import QuickActionsSection from "@/components/home/QuickActionsSection";
import RecentActivitySection from "@/components/home/RecentActivitySection";
import { RepositoryCard } from "@/components/repository/RepositoryCard";
import { Repository } from '@/types/repository';




export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
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
        avatar_url: "https://github.com/username.png"
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
        spdx_id: "MIT"
      }
    }
    // Add more repositories...
  ];

  return (
    <View className="flex-1">
      {/* Animated Background using theme gradients */}
      <LinearGradient
        colors={gradients.background as [ColorValue, ColorValue, ...ColorValue[]]} // Cast to the required type
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
          <RecentActivitySection />

         
        </ScrollView>
         {/* <FlatList
        data={repositories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RepositoryCard repository={item} />
        )}
        className="pt-2"
      /> */}
        

      
      </SafeAreaView>
    </View>
  );
}
