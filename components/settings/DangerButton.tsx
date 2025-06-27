// components/settings/DangerButton.tsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { MODERN_DARK } from "../../constants/Colors";

interface DangerButtonProps {
  title: string;
  onPress: () => void;
}

export const DangerButton: React.FC<DangerButtonProps> = ({
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mx-4 mb-6 p-4 rounded-2xl items-center"
      style={{ backgroundColor: MODERN_DARK.surface.secondary }}
    >
      <Text
        className="text-base font-medium"
        style={{ color: MODERN_DARK.status.error.main }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
