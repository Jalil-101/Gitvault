// components/explore/PopularTopics.tsx
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Hash } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useModernTheme } from "@/context/ThemeContext";

interface PopularTopicsProps {
  onTopicPress?: (topic: string) => void;
}

const popularTopics = [
  "react",
  "javascript",
  "typescript",
  "python",
  "machine-learning",
  "web-development",
  "mobile",
  "ios",
  "android",
  "nodejs",
  "vue",
  "angular",
  "docker",
  "kubernetes",
  "aws",
];

// Color palette for topics
const topicColors = [
  { main: "#10B981", light: "#34D399" }, // green
  { main: "#3B82F6", light: "#60A5FA" }, // blue
  { main: "#8B5CF6", light: "#A78BFA" }, // purple
  { main: "#F59E0B", light: "#FBBF24" }, // amber
  { main: "#EF4444", light: "#F87171" }, // red
  { main: "#06B6D4", light: "#22D3EE" }, // cyan
];
