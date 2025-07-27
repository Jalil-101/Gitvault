// app/onboarding/index.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { useModernTheme } from "@/context/ThemeContext";

const { width } = Dimensions.get("window");

// Onboarding data
const onboardingData = [
  {
    id: 1,
    title: "Welcome to GitHub Clone",
    description:
      "Discover amazing repositories, collaborate with developers, and showcase your projects.",
    icon: "👋",
    backgroundColor: "#3B82F6",
  },
  {
    id: 2,
    title: "Explore Repositories",
    description:
      "Browse through thousands of open source projects and find inspiration for your next big idea.",
    icon: "🔍",
    backgroundColor: "#10B981",
  },
  {
    id: 3,
    title: "Collaborate & Contribute",
    description:
      "Join a global community of developers. Fork, star, and contribute to projects that matter.",
    icon: "🤝",
    backgroundColor: "#8B5CF6",
  },
  {
    id: 4,
    title: "Manage Your Projects",
    description:
      "Create repositories, track issues, and manage your codebase with powerful tools.",
    icon: "🚀",
    backgroundColor: "#F59E0B",
  },
];

export default function OnboardingScreen() {
  const { completeOnboarding, user } = useAuthStore();
  const { isDarkTheme, colors } = useModernTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    completeOnboarding();
    router.replace("/(tabs)");
  };

  const currentItem = onboardingData[currentIndex];

  // Helper function to get primary accent color
  const getPrimaryColor = () => {
    return colors.interactive.primary;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background.primary,
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row justify-between items-center p-6">
            <Text
              className={`text-sm ${
                isDarkTheme ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {currentIndex + 1} of {onboardingData.length}
            </Text>
            {currentIndex < onboardingData.length - 1 && (
              <TouchableOpacity onPress={handleSkip}>
                <Text
                  style={{ color: getPrimaryColor() }}
                  className="text-sm font-medium"
                >
                  Skip
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Content */}
          <View className="flex-1 items-center justify-center px-6">
            {/* Icon */}
            <View
              style={{ backgroundColor: currentItem.backgroundColor }}
              className="w-32 h-32 rounded-full items-center justify-center mb-8"
            >
              <Text className="text-6xl">{currentItem.icon}</Text>
            </View>

            {/* Title */}
            <Text
              className={`text-3xl font-bold text-center mb-4 ${
                isDarkTheme ? "text-white" : "text-gray-900"
              }`}
            >
              {currentItem.title}
            </Text>

            {/* Description */}
            <Text
              className={`text-lg text-center leading-relaxed px-4 ${
                isDarkTheme ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {currentItem.description}
            </Text>

            {/* Welcome message for first screen */}
            {currentIndex === 0 && user && (
              <View
                style={{
                  backgroundColor: colors.surface.secondary,
                }}
                className="mt-6 p-4 rounded-lg"
              >
                <Text
                  style={{
                    color: colors.accents.blue.main,
                  }}
                  className="text-center"
                >
                  Welcome, {user.firstName}! 🎉
                </Text>
              </View>
            )}
          </View>

          {/* Pagination Dots */}
          <View className="flex-row justify-center items-center py-4">
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={{
                  width: index === currentIndex ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor:
                    index === currentIndex
                      ? getPrimaryColor()
                      : colors.text.quaternary,
                  marginHorizontal: 4,
                }}
              />
            ))}
          </View>

          {/* Navigation Buttons */}
          <View className="flex-row justify-between items-center p-6">
            <TouchableOpacity
              onPress={handlePrevious}
              disabled={currentIndex === 0}
              style={{
                opacity: currentIndex === 0 ? 0.5 : 1,
              }}
              className="py-3 px-6"
            >
              <Text
                className={`text-base font-medium ${
                  isDarkTheme ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Previous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNext}
              style={{
                backgroundColor: getPrimaryColor(),
              }}
              className="py-3 px-8 rounded-lg"
            >
              <Text className="text-white text-base font-semibold">
                {currentIndex === onboardingData.length - 1
                  ? "Get Started"
                  : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
