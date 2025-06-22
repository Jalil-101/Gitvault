// components/profile/contribution/ContributionHeader.tsx
import React from "react";
import { View, Text } from "react-native";
import { Calendar } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ContributionHeaderProps {
  totalContributions: number;
  colors: any;
  shadows: any;
}

export const ContributionHeader: React.FC<ContributionHeaderProps> = ({
  totalContributions,
  colors,
  shadows,
}) => {
  return (
    <View
      className="flex-row items-center justify-between p-5 rounded-2xl mb-5 mx-5"
      style={{
        backgroundColor: colors.surface.secondary,
        borderWidth: 1,
        borderColor: "#22C55E30",
        ...shadows.sm,
      }}
    >
      <LinearGradient
        colors={["#22C55E08", "#16A34A08"]}
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
            borderColor: "#22C55E30",
          }}
        >
          <View
            className="w-8 h-8 rounded-xl items-center justify-center"
            style={{ backgroundColor: "#22C55E20" }}
          >
            <Calendar size={18} color="#16A34A" />
          </View>
        </View>
        <View className="flex-1">
          <Text
            className="text-lg font-semibold leading-6"
            style={{ color: colors.text.primary }}
          >
            Contributions
          </Text>
          <Text
            className="text-sm font-medium mt-0.5"
            style={{ color: colors.text.secondary }}
          >
            {totalContributions.toLocaleString()} this year
          </Text>
        </View>
      </View>
    </View>
  );
};
