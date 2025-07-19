// components/StarsHeader.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";

interface StarsHeaderProps {
  onBackPress: () => void;
  repositoryCount: number;
}

export const StarsHeader: React.FC<StarsHeaderProps> = ({
  onBackPress,
  repositoryCount,
}) => {
  const { colors } = useModernTheme();

  return (
    <View
      style={{
        backgroundColor: colors.surface.secondary,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.primary,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <TouchableOpacity onPress={onBackPress}>
          <ArrowLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>

        <View style={{ flex: 1, marginHorizontal: 16 }}>
          <Text
            style={{
              color: colors.text.primary,
              fontSize: 18,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Starred
          </Text>
          <Text
            style={{
              color: colors.text.tertiary,
              fontSize: 14,
              textAlign: "center",
            }}
          >
            {repositoryCount} repositories
          </Text>
        </View>

        <View style={{ width: 24 }} />
      </View>
    </View>
  );
};
