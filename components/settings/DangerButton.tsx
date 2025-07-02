// components/settings/DangerButton.tsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useModernThemeColor } from "../../hooks/useThemeColor";

interface DangerButtonProps {
  title: string;
  onPress: () => void;
}

export const DangerButton: React.FC<DangerButtonProps> = ({
  title,
  onPress,
}) => {
  const { surface, status } = useModernThemeColor();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="mx-4 mb-6 p-4 rounded-2xl items-center"
      style={{ backgroundColor: surface.secondary }}
    >
      <Text
        className="text-base font-medium"
        style={{ color: status.error.main }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};