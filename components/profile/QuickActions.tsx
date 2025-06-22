// components/profile/QuickActions.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Plus, GitBranch, TrendingUp } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { ActionCard } from "@/components/profile/ActionCard";

interface QuickActionsProps {
  onNewRepo: () => void;
  onViewRepos: () => void;
  onActivity: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onNewRepo,
  onViewRepos,
  onActivity,
}) => {
  const { colors } = useModernTheme();

  return (
    <View className="px-6 mb-6">
      <Text
        className="text-xl font-semibold mb-4"
        style={{ color: colors.text.primary }}
      >
        Quick Actions
      </Text>

      {/* Primary Action */}
      <TouchableOpacity
        onPress={onNewRepo}
        className="flex-row items-center justify-center py-4 px-6 rounded-modern-lg mb-3"
        style={{ backgroundColor: colors.interactive.primary }}
      >
        <Plus size={20} color={colors.text.inverse} />
        <Text
          className="text-base font-semibold ml-2"
          style={{ color: colors.text.inverse }}
        >
          Create New Repository
        </Text>
      </TouchableOpacity>

      {/* Secondary Actions */}
      <View className="flex-row -mx-1">
        <ActionCard
          title="Repositories"
          subtitle="View all repos"
          icon={GitBranch}
          color={colors.accents.purple.main}
          onPress={onViewRepos}
        />

        <ActionCard
          title="Activity"
          subtitle="Recent updates"
          icon={TrendingUp}
          color={colors.accents.green.main}
          onPress={onActivity}
        />
      </View>
    </View>
  );
};
