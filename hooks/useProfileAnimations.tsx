// hooks/useProfileAnimations.ts
import { useRef } from "react";
import { Animated } from "react-native";

export const useProfileAnimations = (
  headerHeight: number,
  screenHeight: number
) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const avatarScale = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [1, 0.7],
    extrapolate: "clamp",
  });

  const backgroundTransform = scrollY.interpolate({
    inputRange: [0, screenHeight],
    outputRange: [0, -screenHeight * 0.3],
    extrapolate: "clamp",
  });

  const startAnimations = () => {
    // Initial entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous sparkle animation
    const sparkleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    sparkleAnimation.start();
  };

  return {
    scrollY,
    fadeAnim,
    slideAnim,
    scaleAnim,
    sparkleAnim,
    startAnimations,
    headerOpacity,
    avatarScale,
    backgroundTransform,
  };
};
