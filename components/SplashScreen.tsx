// components/SplashScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const shieldScale = useRef(new Animated.Value(0)).current;
  const checkmarkOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateSplash = async () => {
      // Initial delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Animate logo appearance
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();

      // Animate shield and checkmark
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(shieldScale, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(checkmarkOpacity, {
            toValue: 1,
            duration: 400,
            delay: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }, 400);

      // Animate text
      setTimeout(() => {
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 800);

      // Finish splash screen
      setTimeout(() => {
        onFinish();
      }, 2500);
    };

    animateSplash();
  }, [
    logoScale,
    logoOpacity,
    textOpacity,
    shieldScale,
    checkmarkOpacity,
    onFinish,
  ]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <LinearGradient
        colors={["#1a1a2e", "#16213e", "#0f3460"]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Logo Container */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              },
            ]}
          >
            {/* Circular Background */}
            <View style={styles.circleBackground}>
              {/* Left Bracket */}
              <View style={styles.leftBracket}>
                <View style={styles.bracketLine} />
                <View style={styles.bracketLine} />
              </View>

              {/* Shield with Checkmark */}
              <Animated.View
                style={[
                  styles.shieldContainer,
                  {
                    transform: [{ scale: shieldScale }],
                  },
                ]}
              >
                <View style={styles.shield}>
                  <Animated.View
                    style={[
                      styles.checkmarkContainer,
                      {
                        opacity: checkmarkOpacity,
                      },
                    ]}
                  >
                    <Ionicons
                      name="checkmark"
                      size={24}
                      color="#ffffff"
                      style={styles.checkmark}
                    />
                  </Animated.View>
                </View>
              </Animated.View>

              {/* Right Bracket */}
              <View style={styles.rightBracket}>
                <View style={styles.bracketLine} />
                <View style={styles.bracketLine} />
              </View>
            </View>
          </Animated.View>

          {/* App Name */}
          <Animated.Text
            style={[
              styles.appName,
              {
                opacity: textOpacity,
              },
            ]}
          >
            VAULT
          </Animated.Text>

          {/* Subtitle */}
          <Animated.Text
            style={[
              styles.subtitle,
              {
                opacity: textOpacity,
              },
            ]}
          >
            Secure Git Repository Management
          </Animated.Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    marginBottom: 40,
  },
  circleBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#1a1a2e",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  leftBracket: {
    position: "absolute",
    left: 15,
    alignItems: "flex-start",
  },
  rightBracket: {
    position: "absolute",
    right: 15,
    alignItems: "flex-end",
  },
  bracketLine: {
    width: 3,
    height: 20,
    backgroundColor: "#ffffff",
    marginVertical: 2,
    borderRadius: 2,
  },
  shieldContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  shield: {
    width: 50,
    height: 60,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkmarkContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    marginTop: 2,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 4,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#a0a0a0",
    textAlign: "center",
    letterSpacing: 1,
  },
});
