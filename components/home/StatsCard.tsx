import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  Animated,
  Platform,
  ColorValue,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LucideIcon } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { CardColorType } from "@/constants/Colors";

interface StatsCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  colorType: CardColorType;
  style?: ViewStyle;
  onPress?: () => void;
}

export default function StatsCard({
  icon: Icon,
  value,
  label,
  colorType,
  style,
  onPress,
}: StatsCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const { cardColors, shadows } = useModernTheme();
  const cardTheme = cardColors[colorType];

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          opacity: fadeAnim,
        },
        style,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          height: 120,
          borderRadius: 24, // Increased border radius for more pronounced rounded edges
          overflow: "hidden", // Ensures gradient respects the border radius
          ...Platform.select({
            ios: {
              ...shadows.md,
              shadowRadius: 12, // Enhanced shadow for better depth
            },
            android: {
              elevation: 8, // Increased elevation
              borderRadius: 24, // Android needs explicit border radius
            },
          }),
        }}
      >
        <LinearGradient
          colors={
            cardTheme.background as [ColorValue, ColorValue, ...ColorValue[]]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            padding: 16,
            justifyContent: "space-between",
            borderRadius: 24, // Explicit border radius for gradient
          }}
        >
          {/* Icon container with rounded background */}
          <View
            style={{
              alignSelf: "flex-start",
              backgroundColor: `${cardTheme.icon}15`, // 15% opacity background
              borderRadius: 12,
              padding: 8,
            }}
          >
            <Icon size={24} color={cardTheme.icon} />
          </View>

          {/* Stats content */}
          <View>
            <Text
              className="font-black text-3xl mb-1"
              style={{
                color: cardTheme.text,
                lineHeight: 32,
              }}
            >
              {value}
            </Text>
            <Text
              className="text-xs font-medium"
              style={{
                color: `${cardTheme.text}CC`, // 80% opacity
                letterSpacing: 0.5, // Improved letter spacing
              }}
            >
              {label}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}
