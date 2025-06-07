// components/ProfileTabs.tsx
import React from "react";
import { View, ScrollView } from "react-native";
import { TabButton } from "./TabButton";
import { TabType } from "@/types/profile";

interface ProfileTabsProps {
  selectedTab: TabType;
  onTabChange: (tab: TabType) => void;
  publicRepos: number;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  selectedTab,
  onTabChange,
  publicRepos,
}) => {
  return (
    <View className="border-b border-github-light-border-default dark:border-github-dark-border-default">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        <View className="flex-row">
          <TabButton
            title={`Repositories ${publicRepos}`}
            isActive={selectedTab === "repositories"}
            onPress={() => onTabChange("repositories")}
          />
          <TabButton
            title="Stars 23"
            isActive={selectedTab === "stars"}
            onPress={() => onTabChange("stars")}
          />
          <TabButton
            title="Projects 5"
            isActive={selectedTab === "projects"}
            onPress={() => onTabChange("projects")}
          />
        </View>
      </ScrollView>
    </View>
  );
};
