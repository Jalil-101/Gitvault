// components/common/ActionCard.tsx
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { ArrowUpRight } from "lucide-react-native";
import { useModernTheme } from "@/context/ThemeContext";

interface ActionCardProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  color: string;
  onPress: () => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  color,
  onPress,
}) => {
  const { colors } = useModernTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 p-4 mx-1 rounded-modern-lg border"
      style={{
        backgroundColor: colors.surface.secondary,
        borderColor: colors.border.primary,
      }}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={20} color={color} />
        </View>
        <ArrowUpRight size={16} color={colors.text.tertiary} />
      </View>

      <Text
        className="text-base font-semibold mb-1"
        style={{ color: colors.text.primary }}
      >
        {title}
      </Text>

      <Text className="text-sm" style={{ color: colors.text.secondary }}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
};
