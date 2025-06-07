import React from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import { ExploreTab } from "@/types/explore";
import { RepoCard } from "@/components/explore/RepoCard";
import { DeveloperCard } from "@/components/explore/DeveloperCard";
import { TopicCard } from "@/components/explore/TopicCard";

interface ExploreItemsListProps {
  activeTab: ExploreTab;
  data: any[];
  scrollY: Animated.Value;
}

export const ExploreItemsList: React.FC<ExploreItemsListProps> = ({
  activeTab,
  data,
  scrollY,
}) => {
  const getTabTitle = (tab: ExploreTab) => {
    const titles = {
      repositories: "Trending Repositories",
      developers: "Trending Developers",
      topics: "Trending Topics",
    };
    return titles[tab] || "Trending";
  };

  const renderItem = (item: any, index: number) => {
    const animatedStyle = {
      opacity: scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [1, 0.8],
        extrapolate: "clamp",
      }),
      transform: [
        {
          translateX: scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, index % 2 === 0 ? -5 : 5],
            extrapolate: "clamp",
          }),
        },
      ],
    };

    return (
      <Animated.View key={index} style={animatedStyle}>
        {activeTab === "repositories" && <RepoCard repo={item} />}
        {activeTab === "developers" && <DeveloperCard developer={item} />}
        {activeTab === "topics" && <TopicCard topic={item} />}
      </Animated.View>
    );
  };

  const handleLoadMore = () => {
    console.log("Load more items");
    // Handle load more logic here
  };

  if (data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center py-20">
        <Text className="text-github-light-fg-muted dark:text-github-dark-fg-muted">
          No {activeTab} found
        </Text>
      </View>
    );
  }

  return (
    <View className="px-4 space-y-3 pb-6">
      {data.map((item, index) => renderItem(item, index))}

      {/* Load More Button */}
      <TouchableOpacity
        className="mt-6 p-4 rounded-xl border-2 border-dashed border-github-light-border-default dark:border-github-dark-border-default"
        onPress={handleLoadMore}
      >
        <Text className="text-center text-github-light-fg-muted dark:text-github-dark-fg-muted font-medium">
          Load More {getTabTitle(activeTab).split(" ")[1]}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
