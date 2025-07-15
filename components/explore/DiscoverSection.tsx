// components/explore/DiscoverSection.tsx
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Compass, ArrowRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useModernTheme } from "@/context/ThemeContext";
import { RepositoryCard } from "./RepositoryCard";
import { mockDiscoverRepos } from "@/data/mockData";
import { router } from "expo-router";
interface DiscoverSectionProps {
  onRepositoryPress?: (repository: any) => void;
}


export const DiscoverSection: React.FC<DiscoverSectionProps> = ({
  onRepositoryPress,
}) => {
  const { colors, shadows } = useModernTheme();

  return (
    <View className="mb-6">
      {/* Enhanced Section Header */}
      <View
        className="flex-row items-center justify-between p-5 rounded-2xl mb-5 mx-5"
        style={{
          backgroundColor: colors.surface.secondary,
          borderWidth: 1,
          borderColor: `${colors.accents.blue.main}20`,
          ...shadows.sm,
        }}
      >
        <LinearGradient
          colors={[
            `${colors.accents.blue.main}05`,
            `${colors.accents.blue.light}05`,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute inset-0 rounded-2xl"
        />

        <View className="flex-row items-center flex-1">
          <View
            className="w-12 h-12 rounded-2xl items-center justify-center mr-4"
            style={{
              backgroundColor: colors.surface.primary,
              borderWidth: 2,
              borderColor: `${colors.accents.blue.main}20`,
            }}
          >
            <View
              className="w-8 h-8 rounded-xl items-center justify-center"
              style={{ backgroundColor: `${colors.accents.blue.main}15` }}
            >
              <Compass size={18} color={colors.accents.blue.main} />
            </View>
          </View>
          <View className="flex-1">
            <Text
              className="text-lg font-semibold leading-6"
              style={{ color: colors.text.primary }}
            >
              Discover
            </Text>
            <Text
              className="text-sm font-medium mt-0.5"
              style={{ color: colors.text.secondary }}
            >
              Popular repositories
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="flex-row items-center p-3 rounded-xl"
          style={{
            backgroundColor: colors.accents.blue.main,
            ...shadows.sm,
          }}
          onPress={() => router.push("/screens/ExploreRepositoryListingScreen")}
        >
          <LinearGradient
            colors={[colors.accents.blue.main, colors.accents.blue.light]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="absolute inset-0 rounded-xl"
          />
          <Text
            className="text-sm font-semibold mr-2"
            style={{ color: colors.surface.primary }}
          >
            View all
          </Text>
          <ArrowRight size={16} color={colors.surface.primary} />
        </TouchableOpacity>
      </View>

      {/* Horizontal Repository Cards ScrollView */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingRight: 20,
          paddingBottom: 12,
        }}
        style={{ flexGrow: 0, paddingBottom: 8 }}
      >
        {mockDiscoverRepos.map((repo, index) => (
          <View
            key={repo.id}
            style={{
              width: 280,
              height: 140, // Fixed height for consistency
              marginRight: index === mockDiscoverRepos.length - 1 ? 0 : 16,
            }}
          >
            <RepositoryCard
              repository={repo}
              onPress={() => onRepositoryPress?.(repo)}
              variant="discover"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
