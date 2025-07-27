// components/InputField.tsx
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useModernTheme } from "@/context/ThemeContext";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  field: string;
  onChangeText: (field: string, value: string) => void;
  onFocus: (field: string) => void;
  onBlur: () => void;
  focusedField: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  showToggle?: boolean;
  toggleState?: boolean;
  onToggle?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  disabled?: boolean;
  variant?: "default" | "glass" | "filled";
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  field,
  onChangeText,
  onFocus,
  onBlur,
  focusedField,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  showToggle = false,
  toggleState = false,
  onToggle = () => {},
  icon,
  error,
  disabled = false,
  variant = "default",
}) => {
  const { colors, shadows, getShadow, getGlassStyle } = useModernTheme();

  const isFocused = focusedField === field;
  const hasError = Boolean(error);

  // Determine container styles based on variant and state
  const getContainerStyle = () => {
    const baseStyle = {
      borderRadius: 12,
      borderWidth: 2,
      ...getShadow(isFocused ? "md" : "sm"),
    };

    if (variant === "glass") {
      return {
        ...baseStyle,
        ...getGlassStyle("medium"),
        borderColor: hasError
          ? colors.status.error.main
          : isFocused
          ? colors.border.focus
          : colors.border.glass,
      };
    }

    if (variant === "filled") {
      return {
        ...baseStyle,
        backgroundColor: colors.surface.secondary,
        borderColor: hasError
          ? colors.status.error.main
          : isFocused
          ? colors.border.focus
          : colors.border.primary,
      };
    }

    // Default variant
    return {
      ...baseStyle,
      backgroundColor: colors.surface.primary,
      borderColor: hasError
        ? colors.status.error.main
        : isFocused
        ? colors.border.focus
        : colors.border.primary,
    };
  };

  // Determine opacity for disabled state
  const containerOpacity = disabled ? 0.5 : 1;

  // Icon color based on state
  const getIconColor = () => {
    if (hasError) return colors.status.error.main;
    if (isFocused) return colors.border.focus;
    return colors.text.tertiary;
  };

  // Placeholder color
  const placeholderColor = hasError
    ? colors.status.error.main
    : colors.text.quaternary;

  // Text color
  const textColor = hasError ? colors.status.error.main : colors.text.primary;

  return (
    <View style={{ marginBottom: 20, opacity: containerOpacity }}>
      {/* Label */}
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: hasError ? colors.status.error.main : colors.text.primary,
          marginBottom: 8,
          marginLeft: 4,
        }}
      >
        {label}
      </Text>

      {/* Input Container */}
      <View style={getContainerStyle()}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            minHeight: 56, // Consistent height
          }}
        >
          {/* Leading Icon */}
          {icon && (
            <View
              style={{
                paddingLeft: 16,
                paddingRight: 8,
                justifyContent: "center",
              }}
            >
              <Ionicons name={icon} size={20} color={getIconColor()} />
            </View>
          )}

          {/* Text Input */}
          <TextInput
            style={{
              flex: 1,
              paddingVertical: 16,
              paddingHorizontal: icon ? 8 : 16,
              fontSize: 16,
              color: textColor,
              fontWeight: "500",
            }}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            value={value}
            onChangeText={(text) => !disabled && onChangeText(field, text)}
            onFocus={() => !disabled && onFocus(field)}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
            editable={!disabled}
            selectTextOnFocus={!disabled}
          />

          {/* Trailing Toggle Button */}
          {showToggle && (
            <TouchableOpacity
              style={{
                paddingRight: 16,
                paddingLeft: 8,
                justifyContent: "center",
              }}
              onPress={onToggle}
              disabled={disabled}
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
      </View>

      {/* Error Message */}
      {hasError && (
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
            size={16}
            color={colors.status.error.main}
            style={{ marginRight: 6 }}
          />
          <Text
            style={{
              fontSize: 12,
              color: colors.status.error.main,
              fontWeight: "500",
              flex: 1,
            }}
          >
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};
