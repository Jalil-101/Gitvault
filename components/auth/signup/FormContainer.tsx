// components/FormContainer.tsx
import React from "react";
import { View } from "react-native";
import { useModernTheme } from "@/context/ThemeContext";

interface FormContainerProps {
  children: React.ReactNode;
}

export const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  const { colors, shadows } = useModernTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface.primary,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 24,
          paddingTop: 32,
          paddingBottom: 40,
          flex: 1,
        },
        shadows.lg,
      ]}
    >
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
};
