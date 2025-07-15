// components/explore/ExploreScreen.tsx
import React from "react";
import { View, ScrollView, SafeAreaView, ColorValue,StyleSheet  } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useModernTheme } from "@/context/ThemeContext";
import { ExploreHeader } from "@/components/explore/ExploreHeader";
import { TrendingSection } from "@/components/explore/TrendingSection";
import { DiscoverSection } from "@/components/explore/DiscoverSection";
import { QuickActionsGrid } from "@/components/explore/QuickActionsGrid";
import { RecentSearches } from "@/components/explore/RecentSearches";
// import { PopularTopics } from "@/components/explore/PopularTopics"; // Change to named import

interface ExploreScreenProps {
  onSearch?: (query: string) => void;
  onRepositoryPress?: (repository: any) => void;
  onTopicPress?: (topic: string) => void;
}

const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onSearch,
  onRepositoryPress,
  onTopicPress,
}) => {
  const { colors, isDarkTheme, shadows,gradients } = useModernTheme();


  
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background.primary }}
    >
      <LinearGradient
        colors={
          gradients.background as [ColorValue, ColorValue, ...ColorValue[]]
        } // Cast to the required type
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <ExploreHeader
          onSearch={onSearch}
          onNotificationPress={() => {}}
          onMenuPress={() => {}}
        />

        {/* Main Content Container */}
        <View
          className="mx-4 mt-2 rounded-2xl"
          style={{
            backgroundColor: `${colors.surface.primary}95`,
            borderWidth: 1,
            borderColor: `${colors.accents.blue.main}10`,
            ...shadows.md,
          }}
        >
          <LinearGradient
            colors={[
              `${colors.surface.primary}95`,
              `${colors.surface.secondary}50`,
              `${colors.surface.primary}95`,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="absolute inset-0 rounded-2xl"
          />

          <View className="p-2 space-y-6">
            <TrendingSection onRepositoryPress={onRepositoryPress} />
            <QuickActionsGrid
              onActionPress={(actionId) =>
                console.log("Action pressed:", actionId)
              }
            />
            <DiscoverSection onRepositoryPress={onRepositoryPress} />
            {/* <PopularTopics onTopicPress={onTopicPress} /> */}
            <RecentSearches
              onSearch={onSearch}
              onClearSearch={(query) => console.log("Clear search:", query)}
            />
          </View>
        </View>

        {/* Bottom Spacer */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
};

// Default export for route file
export default ExploreScreen;

// Named export for component usage elsewhere
export { ExploreScreen };
