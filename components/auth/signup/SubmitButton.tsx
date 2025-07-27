// components/SubmitButton.tsx
import React from "react";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useModernTheme } from "@/context/ThemeContext";

interface SubmitButtonProps {
  onPress: () => void;
  loading: boolean;
  title: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onPress,
  loading,
  title,
}) => {
  const { colors, shadows } = useModernTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[
        {
          backgroundColor: loading
            ? colors.text.quaternary
            : colors.interactive.primary,
          borderRadius: 12,
          paddingVertical: 16,
          marginBottom: 20,
        },
        loading ? {} : shadows.md,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.text.inverse} size="small" />
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.text.inverse,
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              marginRight: 8,
            }}
          >
            {title}
          </Text>
          <Ionicons
            name="arrow-forward"
            size={18}
            color={colors.text.inverse}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
