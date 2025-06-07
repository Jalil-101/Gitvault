// screens/ProfileScreen.tsx
import React, { useEffect, useRef } from "react";
import {
  ScrollView,
  RefreshControl,
  Animated,
  StatusBar,
  View,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";
import { Link, useRouter } from "expo-router";
import { AnimatedHeader } from "@/components/profile/AnimatedHeader";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileBio } from "@/components/profile/ProfileBio";
import { ProfileActions } from "@/components/profile/ProfileActions";
import { ContributionGraph } from "@/components/profile/ContributionGraph";
import { RepositoriesSection } from "@/components/profile/RepositoriesSection";
import { AnimatedBackground } from "@/components/profile/AnimatedBackground";
import { useProfileAnimations } from "@/hooks/useProfileAnimations";
import { mockProfile, mockRepositories } from "@/data/mockProfileData";


const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const HEADER_HEIGHT = 100;

const ProfileScreen: React.FC = () => {
  const { theme, colors } = useTheme();
  const {
    scrollY,
    fadeAnim,
    slideAnim,
    scaleAnim,
    sparkleAnim,
    startAnimations,
    headerOpacity,
    avatarScale,
    backgroundTransform,
  } = useProfileAnimations(HEADER_HEIGHT, SCREEN_HEIGHT);

  const refreshing = false;

  useEffect(() => {
    startAnimations();
  }, []);

  const onRefresh = () => {
    // Implement refresh logic
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      TypeScript: "#3178c6",
      JavaScript: "#f1e05a",
      Python: "#3572A5",
      Java: "#b07219",
      "C++": "#f34b7d",
      Go: "#00ADD8",
    };
    return colors[language] || "#8b949e";
  };
 const router = useRouter();
  return (
    
    <SafeAreaView className="flex-1 bg-github-light-canvas-subtle dark:bg-github-dark-canvas-default">
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={
          theme === "dark" ? colors.canvas.default : colors.canvas.subtle
        }
      />

      <AnimatedHeader
        username={mockProfile.username}
        headerOpacity={headerOpacity}
      />
      <AnimatedBackground backgroundTransform={backgroundTransform} />

      <Animated.ScrollView
        style={{ opacity: fadeAnim }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme === "dark" ? colors.fg.muted : colors.fg.muted}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader
          profile={mockProfile}
          avatarScale={avatarScale}
          scaleAnim={scaleAnim}
          slideAnim={slideAnim}
          fadeAnim={fadeAnim}
          sparkleAnim={sparkleAnim}
          formatNumber={formatNumber}
        />

        <ProfileBio profile={mockProfile} />
        <ProfileActions />

        <ContributionGraph
          contributions={mockProfile.contributions}
          formatNumber={formatNumber}
        />

        <RepositoriesSection
          repositories={mockRepositories}
          formatNumber={formatNumber}
          getLanguageColor={getLanguageColor}
        />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
