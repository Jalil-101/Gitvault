import { useModernTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { AlertCircle, GitPullRequest, Plus, Search } from "lucide-react-native";
import React from "react";
import {
  ColorValue,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

const quickActions = [
  {
    id: "search",
    icon: Search,
    label: "Search",
    colorKey: "info" as const,
    onPress: () => router.push("/screens/SearchScreen"),
  },
  {
    id: "prs",
    icon: GitPullRequest,
    label: "PRs",
    colorKey: "warning" as const,
    onPress: () => router.push("/repository/RepositoryListScreen"),
  },
  {
    id: "issues",
    icon: AlertCircle,
    label: "Issues",
    colorKey: "error" as const,
    onPress: () => router.push("/screens/IssueScreen"),
  },
];

export default function QuickActionsSection() {
  const { colors, gradients, shadows } = useModernTheme();

  const handleNewRepository = () => {
    // Handle new repository action
    console.log("New Repository pressed");
    // Example: navigation.navigate('NewRepositoryScreen');
  };

  return (
    <View className="px-5 mb-8">
      <Text
        className="text-2xl font-bold mb-4"
        style={{
          color: colors.text.primary,
          letterSpacing: -0.5,
        }}
      >
        Quick Actions
      </Text>

      <View className="gap-4">
        {/* New Repository Button */}
        <TouchableOpacity
          onPress={handleNewRepository}
          activeOpacity={0.8}
          style={{
            height: 60,
            borderRadius: 32,
            overflow: "hidden",
            ...Platform.select({
              ios: {
                ...shadows.md,
                shadowRadius: 8,
              },
              android: {
                elevation: 6,
                borderRadius: 32,
              },
            }),
          }}
        >
          <LinearGradient
            colors={
              gradients.primary as [ColorValue, ColorValue, ...ColorValue[]]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              borderRadius: 32,
            }}
          >
            <Plus size={24} color={colors.text.inverse} />

            <Text
              className="font-bold text-base"
              style={{ color: colors.text.inverse }}
            >
              New Repository
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Secondary Actions */}
        <View className="flex-row justify-between">
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              onPress={action.onPress}
              activeOpacity={0.7}
              className="flex-1 items-center p-4 rounded-2xl mx-1.5"
              style={{
                backgroundColor: colors.surface.glass,
                borderWidth: 1,
                borderColor: colors.border.glass,
              }}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center mb-2"
                style={{
                  backgroundColor: colors.status[action.colorKey].main,
                }}
              >
                <action.icon size={20} color={colors.text.inverse} />
              </View>
              <Text
                className="text-xs font-semibold"
                style={{ color: colors.text.secondary }}
              >
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}