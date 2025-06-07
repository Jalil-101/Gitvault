// Enhanced HomeScreen with completed hero section
import React from "react";
import {
  ScrollView,
  View,
  Text,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { useFeedData } from "@/hooks/useFeedData";
import { HomeHeader } from "@/components/home/HomeHeader";
import { FeedItem } from "@/components/home/FeedItem";
import { LoadingState } from "@/components/common/LoadingState";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen: React.FC = () => {
  const { colors, isDarkTheme } = useTheme();
  const {
    feedItems,
    isLoading,
    isRefreshing,
    error,
    loadFeedData,
    handleRefresh,
  } = useFeedData();

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.canvas.subtle }}>
        <HomeHeader />
        <LoadingState message="Loading your feed..." />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.canvas.subtle }}>
        <HomeHeader />
        <ErrorState error={error} onRetry={loadFeedData} />
      </SafeAreaView>
    );
  }

  if (feedItems.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.canvas.subtle }}>
        <HomeHeader />
        <EmptyState
          title="Welcome to GitHub Mobile"
          description="Stay connected with your repositories, issues, and pull requests on the go."
          icon="logo-github"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.canvas.subtle }}>
      <HomeHeader />

      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.accent.fg}
            colors={[colors.accent.fg]}
            progressBackgroundColor={colors.canvas.overlay}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View className="relative px-4 pt-6 pb-4">
          <LinearGradient
            colors={
              isDarkTheme
                ? ["rgba(47, 129, 247, 0.05)", "transparent"]
                : ["rgba(9, 105, 218, 0.05)", "transparent"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />

          <View className="flex-row items-center mb-4">
            <View
              className="w-8 h-8 rounded-lg items-center justify-center mr-3"
              style={{ backgroundColor: colors.accent.subtle }}
            >
              <Ionicons name="logo-github" size={20} color={colors.accent.fg} />
            </View>
            <View className="flex-1">
              <Text
                className="text-lg font-bold"
                style={{ color: colors.fg.default }}
              >
                Good morning! 👋
              </Text>
              <Text className="text-sm" style={{ color: colors.fg.muted }}>
                Here's what's happening in your world
              </Text>
            </View>
          </View>

          {/* Quick Stats */}
          <View className="flex-row justify-between mb-4">
            <TouchableOpacity
              className="flex-1 p-3 rounded-lg mr-2"
              style={{ backgroundColor: colors.canvas.default }}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center justify-between mb-1">
                <Text
                  className="text-xs font-medium"
                  style={{ color: colors.fg.muted }}
                >
                  Repositories
                </Text>
                <Ionicons
                  name="folder-outline"
                  size={14}
                  color={colors.accent.fg}
                />
              </View>
              <Text
                className="text-lg font-bold"
                style={{ color: colors.fg.default }}
              >
                12
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 p-3 rounded-lg mx-1"
              style={{ backgroundColor: colors.canvas.default }}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center justify-between mb-1">
                <Text
                  className="text-xs font-medium"
                  style={{ color: colors.fg.muted }}
                >
                  Issues
                </Text>
                <Ionicons
                  name="alert-circle-outline"
                  size={14}
                  color={colors.success.fg}
                />
              </View>
              <Text
                className="text-lg font-bold"
                style={{ color: colors.fg.default }}
              >
                3
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 p-3 rounded-lg ml-2"
              style={{ backgroundColor: colors.canvas.default }}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center justify-between mb-1">
                <Text
                  className="text-xs font-medium"
                  style={{ color: colors.fg.muted }}
                >
                  Pull Requests
                </Text>
                <Ionicons
                  name="git-pull-request"
                  size={14}
                  color={colors.accent.fg}
                />
              </View>
              <Text
                className="text-lg font-bold"
                style={{ color: colors.fg.default }}
              >
                5
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section Header */}
        <View className="px-4 py-2 flex-row items-center justify-between">
          <Text
            className="text-lg font-semibold"
            style={{ color: colors.fg.default }}
          >
            Recent Activity
          </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text
              className="text-sm font-medium"
              style={{ color: colors.accent.fg }}
            >
              View all
            </Text>
          </TouchableOpacity>
        </View>

        {/* Feed Items */}
        <View className="pb-6">
          {feedItems.map((item, index) => (
            <FeedItem
              key={`${item.type}-${item.id}-${index}`}
              item={item}
              index={index}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;




