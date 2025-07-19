// components/commits/CommitsHeader.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { CommitsHeaderProps } from "@/types/commits";

export const CommitsHeader: React.FC<CommitsHeaderProps> = ({
  navigation,
  selectedBranch,
  onBranchPress,
}) => {
  const { colors } = useModernTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: colors.surface.secondary,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.primary,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
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
          Commits
        </Text>
        <Text
          style={{
            color: colors.text.tertiary,
            fontSize: 14,
            textAlign: "center",
          }}
        >
          1.2k commits
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: colors.surface.elevated,
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 6,
        }}
        onPress={onBranchPress}
      >
        <Text style={{ color: colors.text.primary, fontSize: 14 }}>
          {selectedBranch}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
