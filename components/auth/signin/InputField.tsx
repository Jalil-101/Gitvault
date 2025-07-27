import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardTypeOptions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useModernTheme } from "@/context/ThemeContext";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  showToggle?: boolean;
  toggleState?: boolean;
  onToggle?: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onFocus,
  onBlur,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  showToggle = false,
  toggleState = false,
  onToggle,
  icon,
  error,
}) => {
  const { colors, shadows, glass } = useModernTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (): void => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = (): void => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleTextChange = (text: string): void => {
    onChangeText(text);
  };

  const handleTogglePress = (): void => {
    onToggle?.();
  };

  const getBorderColor = (): string => {
    if (error) return colors.status.error.main;
    if (isFocused) return colors.border.focus;
    return glass.medium.borderColor;
  };

  const getIconColor = (): string => {
    if (error) return colors.status.error.main;
    if (isFocused) return colors.border.focus;
    return colors.text.tertiary;
  };

  const getShadowStyle = () => {
    if (error) {
      return {
        ...shadows.sm,
        shadowColor: colors.status.error.main,
        shadowOpacity: 0.2,
      };
    }
    if (isFocused) {
      return {
        ...shadows.md,
        shadowColor: colors.border.focus,
        shadowOpacity: 0.3,
      };
    }
    return shadows.sm;
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: error ? colors.status.error.main : colors.text.secondary,
          marginBottom: 8,
          marginLeft: 4,
          letterSpacing: 0.2,
        }}
      >
        {label}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: glass.medium.backgroundColor,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: getBorderColor(),
          minHeight: 56,
          ...getShadowStyle(),
        }}
      >
        <View
          style={{
            paddingLeft: 16,
            paddingRight: 12,
            justifyContent: "center",
          }}
        >
          <Ionicons name={icon} size={20} color={getIconColor()} />
        </View>

        <TextInput
          style={{
            flex: 1,
            paddingVertical: 16,
            paddingRight: showToggle ? 8 : 16,
            fontSize: 16,
            color: colors.text.primary,
            fontWeight: "500",
            letterSpacing: 0.3,
          }}
          placeholder={placeholder}
          placeholderTextColor={colors.text.quaternary}
          value={value}
          onChangeText={handleTextChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
        />

        {showToggle && (
          <TouchableOpacity
            style={{
              paddingRight: 16,
              paddingLeft: 8,
              paddingVertical: 16,
            }}
            onPress={handleTogglePress}
            activeOpacity={0.7}
          >
            <Ionicons
              name={toggleState ? "eye-off" : "eye"}
              size={20}
              color={getIconColor()}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <View
          style={{
            marginTop: 6,
            marginLeft: 4,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="alert-circle"
            size={14}
            color={colors.status.error.main}
            style={{ marginRight: 6 }}
          />
          <Text
            style={{
              color: colors.status.error.main,
              fontSize: 13,
              fontWeight: "500",
              letterSpacing: 0.2,
            }}
          >
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};
