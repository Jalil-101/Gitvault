import React, { useState } from "react";
import { Animated, RefreshControl, Dimensions } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { ExploreTab } from "@/types/explore";
import { ExploreAnimatedHeader } from "./ExploreAnimatedHeader";
import { ExploreItemsList } from "./ExploreItemsList";
import { ExploreLoadingError } from "./ExploreLoadingError";

const { height } = Dimensions.get("window");

interface ExploreContentProps {
  activeTab: ExploreTab;
  data: any[];
  loading: boolean;
  error: any;
  refreshing: boolean;
  onRefresh: () => Promise<void>;
}

export const ExploreContent: React.FC<ExploreContentProps> = ({
  activeTab,
  data,
  loading,
  error,
  refreshing,
  onRefresh,
}) => {
  const { colors, isDarkTheme } = useTheme();
  const [scrollY] = useState(new Animated.Value(0));

  const handleScroll = () => {
    // Reset scroll position when tab changes
    scrollY.setValue(0);
  };

  // Reset scroll when tab changes
  React.useEffect(() => {
    handleScroll();
  }, [activeTab]);

  return (
    <Animated.ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={isDarkTheme ? colors.accent.fg : colors.accent.fg}
          colors={[colors.accent.fg]}
          progressBackgroundColor={colors.canvas.default}
        />
      }
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
      contentContainerStyle={{
        paddingBottom: 20,
        minHeight: height * 0.8,
      }}
    >
      <ExploreAnimatedHeader
        activeTab={activeTab}
        scrollY={scrollY}
        dataLength={data.length}
      />

      <ExploreLoadingError
        loading={loading}
        error={error}
        refreshing={refreshing}
        onRetry={onRefresh}
      />

      {!loading && !error && (
        <ExploreItemsList activeTab={activeTab} data={data} scrollY={scrollY} />
      )}
    </Animated.ScrollView>
  );
};
