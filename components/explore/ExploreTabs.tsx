import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  ScrollView,
} from "react-native";
import { ExploreTab } from "@/types/explore";
import { useTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  activeTab: ExploreTab;
  setActiveTab: (tab: ExploreTab) => void;
}

interface TabConfig {
  key: ExploreTab;
  label: string;
  icon: string;
}

const tabs: TabConfig[] = [
  { key: "repositories", label: "Repositories", icon: "📦" },
  { key: "developers", label: "Developers", icon: "👨‍💻" },
  { key: "topics", label: "Topics", icon: "🏷️" },
];

export const ExploreTabs: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const { isDarkTheme } = useTheme();

  const TabButton = ({
    tab,
    isActive,
  }: {
    tab: TabConfig;
    isActive: boolean;
  }) => {
    const scaleAnim = new Animated.Value(1);

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          onPress={() => setActiveTab(tab.key)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          className={`px-4 py-2 mx-1 rounded-full ${
            isActive
              ? "bg-github-light-accent-emphasis dark:bg-github-dark-accent-emphasis"
              : "bg-github-light-canvas-subtle dark:bg-github-dark-canvas-subtle"
          }`}
        >
          <View className="flex-row items-center">
            <Text className="text-sm mr-2">{tab.icon}</Text>
            <Text
              className={`text-sm font-semibold ${
                isActive
                  ? "text-white"
                  : "text-github-light-fg-default dark:text-github-dark-fg-default"
              }`}
            >
              {tab.label}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View className="px-4 py-3">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        <View className="flex-row items-center space-x-2">
          {tabs.map((tab) => (
            <TabButton
              key={tab.key}
              tab={tab}
              isActive={activeTab === tab.key}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
