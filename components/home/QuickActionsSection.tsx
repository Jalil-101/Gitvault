import React from "react";
import { View, Text, TouchableOpacity, Platform, ColorValue,ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Plus, Search, GitPullRequest, AlertCircle } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { BottomSheet } from "@/components/BottomSheet";
import { useBottomSheet } from "@/hooks/useBottomSheet";


const quickActions = [
  {
    id: "search",
    icon: Search,
    label: "Search",
    colorKey: "info" as const,
  },
  {
    id: "prs",
    icon: GitPullRequest,
    label: "PRs",
    colorKey: "warning" as const,
  },
  {
    id: "issues",
    icon: AlertCircle,
    label: "Issues",
    colorKey: "error" as const,
  },
];

export default function QuickActionsSection() {
  const { colors, gradients, shadows } = useModernTheme();
   const bottomSheet = useBottomSheet();

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
          activeOpacity={0.8}
          style={{
            height: 60,
            borderRadius: 32, // Add border radius to the container (rounded-4xl = 32px)
            overflow: "hidden", // Ensure gradient respects the border radius
            ...Platform.select({
              ios: {
                ...shadows.md,
                shadowRadius: 8, // Optional: enhance shadow
              },
              android: {
                elevation: 6,
                borderRadius: 32, // Android needs explicit border radius for elevation
              },
            }),
          }}
          onPress={bottomSheet.open}
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
              borderRadius: 32, // Explicit border radius for gradient
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
        <BottomSheet
          isVisible={bottomSheet.isVisible}
          onClose={bottomSheet.close}
          title="Bottom Sheet Modal"
          snapPoints={[0.3, 0.6, 0.9]}
          enablePanGesture={true}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="text-lg font-semibold mb-4 text-gray-900">
              Content goes here
            </Text>
            <Text className="text-gray-600 mb-4">
              This is a customizable bottom sheet modal with multiple snap
              points. You can drag it to resize or tap outside to close.
            </Text>

            <View className="space-y-3">
              {Array.from({ length: 10 }, (_, i) => (
                <View key={i} className="p-4 bg-gray-100 rounded-lg">
                  <Text className="text-gray-700">List item {i + 1}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              className="bg-red-500 p-4 rounded-lg mt-6"
              onPress={bottomSheet.close}
            >
              <Text className="text-white text-center font-semibold">
                Close Bottom Sheet
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </BottomSheet>

        {/* Secondary Actions */}
        <View className="flex-row justify-between">
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
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
