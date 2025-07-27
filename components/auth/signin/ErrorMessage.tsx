// components/ui/ErrorMessage.tsx
import React from "react";
import { View, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useModernTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

interface ErrorMessageProps {
  message: string;
  visible?: boolean;
  variant?: "default" | "glass";
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  visible = true,
  variant = "default",
}) => {
  const { colors, shadows, glass } = useModernTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(-10)).current;

  React.useEffect(() => {
    if (visible && message) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 120,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -10,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, message]);

  if (!visible || !message) return null;

  const containerStyle = {
    borderRadius: 12,
    padding: 18,
    marginBottom: 24,
    ...shadows.md,
    ...(variant === "glass" && {
      backgroundColor: glass.medium.backgroundColor,
      borderWidth: 1,
      borderColor: glass.medium.borderColor,
    }),
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      {variant === "glass" ? (
        <View style={containerStyle}>
          <LinearGradient
            colors={[
              colors.status.error.main + "20",
              colors.status.error.main + "10",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 12,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <View
              style={{
                backgroundColor: colors.status.error.main + "20",
                borderRadius: 20,
                padding: 6,
                marginRight: 12,
              }}
            >
              <Ionicons
                name="alert-circle"
                size={20}
                color={colors.status.error.main}
              />
            </View>
            <Text
              style={{
                color: colors.status.error.text,
                fontSize: 15,
                fontWeight: "600",
                flex: 1,
                lineHeight: 22,
                letterSpacing: 0.2,
              }}
            >
              {message}
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            ...containerStyle,
            backgroundColor: colors.status.error.light,
            borderLeftWidth: 4,
            borderLeftColor: colors.status.error.main,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <Ionicons
              name="alert-circle"
              size={22}
              color={colors.status.error.main}
              style={{ marginTop: 1 }}
            />
            <Text
              style={{
                color: colors.status.error.text,
                marginLeft: 12,
                fontSize: 15,
                fontWeight: "600",
                flex: 1,
                lineHeight: 22,
                letterSpacing: 0.2,
              }}
            >
              {message}
            </Text>
          </View>
        </View>
      )}
    </Animated.View>
  );
};
