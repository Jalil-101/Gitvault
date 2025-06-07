// components/profile/AnimatedBackground.tsx
import React from "react";
import { Animated, Dimensions } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface AnimatedBackgroundProps {
  backgroundTransform: Animated.AnimatedAddition<number>;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  backgroundTransform,
}) => {
  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: SCREEN_HEIGHT * 0.5,
        transform: [{ translateY: backgroundTransform }],
      }}
      className="bg-gradient-to-b from-github-light-accent-subtle/20 to-transparent dark:from-github-dark-accent-subtle/20"
    />
  );
};
