// app/onboarding/index.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { useAuthStore } from "@/store/authStore";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Code,
  GitBranch,
  Search,
  Users,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

// Modern onboarding data with icons instead of emojis
const onboardingData = [
  {
    id: 1,
    title: "Welcome to Vault",
    description:
      "Your secure vault for managing repositories, collaborating with developers, and showcasing your projects.",
    icon: Search,
    gradient: ["#667eea", "#764ba2"],
  },
  {
    id: 2,
    title: "Explore Repositories",
    description:
      "Discover thousands of open source projects and find inspiration for your next big idea.",
    icon: GitBranch,
    gradient: ["#f093fb", "#f5576c"],
  },
  {
    id: 3,
    title: "Collaborate & Contribute",
    description:
      "Join a global community of developers. Fork, star, and contribute to projects that matter.",
    icon: Users,
    gradient: ["#4facfe", "#00f2fe"],
  },
  {
    id: 4,
    title: "Manage Your Projects",
    description:
      "Create repositories, track issues, and manage your codebase with powerful tools.",
    icon: Code,
    gradient: ["#43e97b", "#38f9d7"],
  },
];

export default function OnboardingScreen() {
  const { completeOnboarding, user } = useAuthStore();
  const { colors, shadows } = useModernTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const iconRotateAnim = useRef(new Animated.Value(0)).current;

  const currentItem = onboardingData[currentIndex];

  // Animate on index change
  useEffect(() => {
    // Reset animations
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    scaleAnim.setValue(0.8);
    iconRotateAnim.setValue(0);

    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(iconRotateAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentIndex]);

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

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    header: {
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      alignItems: "center" as const,
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    progressText: {
      fontSize: 14,
      color: colors.text.tertiary,
      fontWeight: "500",
    },
    skipButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: colors.surface.secondary,
    },
    skipText: {
      fontSize: 14,
      color: colors.interactive.primary,
      fontWeight: "600",
    },
    content: {
      flex: 1,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      paddingHorizontal: 32,
    },
    iconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      marginBottom: 40,
      ...shadows.lg,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.text.primary,
      textAlign: "center" as const,
      marginBottom: 16,
      letterSpacing: -0.5,
    },
    description: {
      fontSize: 16,
      color: colors.text.secondary,
      textAlign: "center" as const,
      lineHeight: 24,
      paddingHorizontal: 16,
    },
    welcomeCard: {
      backgroundColor: colors.surface.secondary,
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderRadius: 16,
      marginTop: 24,
      borderWidth: 1,
      borderColor: colors.border.secondary,
      ...shadows.sm,
    },
    welcomeText: {
      fontSize: 16,
      color: colors.accents.blue.main,
      textAlign: "center" as const,
      fontWeight: "600",
    },
    pagination: {
      flexDirection: "row" as const,
      justifyContent: "center" as const,
      alignItems: "center" as const,
      paddingVertical: 24,
    },
    dot: {
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    navigation: {
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      alignItems: "center" as const,
      paddingHorizontal: 24,
      paddingVertical: 20,
    },
    navButton: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12,
      flexDirection: "row" as const,
      alignItems: "center" as const,
    },
    navButtonText: {
      fontSize: 16,
      fontWeight: "600",
    },
    nextButton: {
      backgroundColor: colors.interactive.primary,
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: 16,
      flexDirection: "row" as const,
      alignItems: "center" as const,
      ...shadows.md,
    },
    nextButtonText: {
      color: colors.text.inverse,
      fontSize: 16,
      fontWeight: "700",
      marginRight: 8,
    },
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.progressText}>
          {currentIndex + 1} of {onboardingData.length}
        </Text>
        {currentIndex < onboardingData.length - 1 && (
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Animated Icon */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
                {
                  rotate: iconRotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={currentItem.gradient}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <currentItem.icon size={48} color="white" />
          </LinearGradient>
        </Animated.View>

        {/* Animated Title */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text style={styles.title}>{currentItem.title}</Text>
        </Animated.View>

        {/* Animated Description */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text style={styles.description}>{currentItem.description}</Text>
        </Animated.View>

        {/* Welcome message for first screen */}
        {currentIndex === 0 && user && (
          <Animated.View
            style={[
              styles.welcomeCard,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.welcomeText}>
              Welcome, {user.firstName}! Let's get started
            </Text>
          </Animated.View>
        )}
      </View>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {onboardingData.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                width: index === currentIndex ? 32 : 8,
                backgroundColor:
                  index === currentIndex
                    ? colors.interactive.primary
                    : colors.text.quaternary,
              },
            ]}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={handlePrevious}
          disabled={currentIndex === 0}
          style={[
            styles.navButton,
            {
              opacity: currentIndex === 0 ? 0.3 : 1,
            },
          ]}
        >
          <ChevronLeft size={20} color={colors.text.secondary} />
          <Text
            style={[
              styles.navButtonText,
              { color: colors.text.secondary, marginLeft: 4 },
            ]}
          >
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>
            {currentIndex === onboardingData.length - 1
              ? "Get Started"
              : "Next"}
          </Text>
          {currentIndex === onboardingData.length - 1 ? (
            <Check size={20} color={colors.text.inverse} />
          ) : (
            <ChevronRight size={20} color={colors.text.inverse} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
