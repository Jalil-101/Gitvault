import React, { useState } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  RefreshControl,
  StyleSheet,
  ColorValue,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useModernTheme } from "@/context/ThemeContext";
import DashboardHeader from "@/components/home/DashboardHeader";
import OverviewSection from "@/components/home/OverviewSection";
import QuickActionsSection from "@/components/home/QuickActionsSection";
import RecentActivitySection from "@/components/home/RecentActivitySection";
import BottomNavigation from "@/components/home/BottomNavigation";
import { BottomSheet } from "@/components/BottomSheet"; 
import { useBottomSheet } from "@/hooks/useBottomSheet";

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { colors, gradients, isDarkTheme } = useModernTheme();
 const bottomSheet = useBottomSheet();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

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

        {/* <BottomNavigation /> */}
      </SafeAreaView>
    </View>
  );
}
