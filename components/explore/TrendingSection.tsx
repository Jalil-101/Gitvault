// components/explore/TrendingSection.tsx
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { TrendingUp, ArrowRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useModernTheme } from "@/context/ThemeContext";
import { RepositoryCard } from "@/components/explore/RepositoryCard";
import { mockTrendingRepos } from "@/data/mockData";
import { useRouter } from "expo-router";
interface TrendingSectionProps {
  onRepositoryPress?: (repository: any) => void;
}
 const router = useRouter();

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  onRepositoryPress,
}) => {
  const { colors, shadows } = useModernTheme();

  return (
    <View className="mb-6">
      {/* Enhanced Section Header */}
      <View
        className="flex-row items-center justify-between p-6 rounded-2xl mb-6"
        style={{
          backgroundColor: colors.surface.secondary,
          borderWidth: 1,
          borderColor: `${colors.accents.green.main}20`,
          ...shadows.sm,
        }}
      >
        <LinearGradient
          colors={[
            `${colors.accents.green.main}05`,
            `${colors.accents.green.light}05`,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute inset-0 rounded-2xl"
        />

        <View className="flex-row items-center flex-1">
          <View
            className="w-14 h-14 rounded-2xl items-center justify-center mr-5"
            style={{
              backgroundColor: colors.surface.primary,
              borderWidth: 2,
              borderColor: `${colors.accents.green.main}20`,
            }}
          >
            <View
              className="w-10 h-10 rounded-2xl items-center justify-center"
              style={{ backgroundColor: `${colors.accents.green.main}15` }}
            >
              <TrendingUp size={20} color={colors.accents.green.main} />
            </View>
          </View>
          <View className="flex-1">
            <Text
              className="text-lg font-semibold leading-6"
              style={{ color: colors.text.primary }}
            >
              Trending Today
            </Text>
            <Text
              className="text-sm font-medium mt-1"
              style={{ color: colors.text.secondary }}
            >
              Most starred repositories
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="flex-row items-center px-5 py-4 rounded-2xl"
          style={{
            backgroundColor: colors.accents.green.main,
            ...shadows.sm,
          }}
          // Navigate to trending repositories
          onPress={() =>
            router.push(
              "/repository/ExploreRepositoryListingScreen?type=trending"
            )
          }
        >
          <LinearGradient
            colors={[colors.accents.green.main, colors.accents.green.light]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="absolute inset-0 rounded-2xl"
          />
          <Text
            className="text-sm font-semibold mr-3"
            style={{ color: colors.surface.primary }}
          >
            View all
          </Text>
          <ArrowRight size={18} color={colors.surface.primary} />
        </TouchableOpacity>
      </View>

      {/* Repository Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 24, paddingRight: 24, gap: 24 }}
      >
        {mockTrendingRepos.map((repo) => (
          <RepositoryCard
            key={repo.id}
            repository={repo}
            onPress={() => onRepositoryPress?.(repo)}
            variant="trending"
          />
        ))}
      </ScrollView>
    </View>
  );
};
