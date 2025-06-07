// components/RepositoryList.tsx
import React from "react";
import { View } from "react-native";
import { RepositoryCard } from "./RepositoryCard";
import { Repository } from "@/types/profile";

interface RepositoryListProps {
  repositories: Repository[];
  formatNumber: (num: number) => string;
  getLanguageColor: (language: string) => string;
}

export const RepositoryList: React.FC<RepositoryListProps> = ({
  repositories,
  formatNumber,
  getLanguageColor,
}) => {
  return (
    <View className="p-4">
      {repositories.map((repo, index) => (
        <RepositoryCard
          key={repo.id}
          repo={repo}
          index={index}
          formatNumber={formatNumber}
          getLanguageColor={getLanguageColor}
        />
      ))}
    </View>
  );
};

