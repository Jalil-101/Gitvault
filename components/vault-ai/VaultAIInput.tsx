import { useModernTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Animated,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface VoiceState {
  isRecording: boolean;
  isPlaying: boolean;
  recordingTime: number;
  audioLevel: number;
}

interface VaultAIInputProps {
  inputText: string;
  onInputChange: (text: string) => void;
  onSend: () => void;
  isLoading: boolean;
  voiceEnabled: boolean;
  imageUploadEnabled: boolean;
  onVoicePress: () => void;
  onImagePress: () => void;
  voiceState: VoiceState;
  pulseAnim: Animated.Value;
}

const VaultAIInput: React.FC<VaultAIInputProps> = ({
  inputText,
  onInputChange,
  onSend,
  isLoading,
  voiceEnabled,
  imageUploadEnabled,
  onVoicePress,
  onImagePress,
  voiceState,
  pulseAnim,
}) => {
  const { colors, shadows, isDarkTheme } = useModernTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (inputText.trim() && !isLoading) {
      onSend();
      Keyboard.dismiss();
    }
  };

  return (
    <View
      style={[
        styles.inputContainer,
        { backgroundColor: colors.surface.primary },
      ]}
    >
      {/* Top border accent */}
      <View
        style={[
          styles.topBorder,
          { backgroundColor: colors.accents.purple.main },
        ]}
      />

      <View style={styles.inputWrapper}>
        {/* Text Input */}
        <View style={styles.textInputContainer}>
          <TextInput
            style={[
              styles.textInput,
              {
                borderColor: isFocused
                  ? colors.accents.blue.main
                  : colors.border.secondary,
                backgroundColor: colors.surface.secondary,
                color: colors.text.primary,
              },
            ]}
            value={inputText}
            onChangeText={onInputChange}
            placeholder="Ask Vault AI anything..."
            placeholderTextColor={colors.text.tertiary}
            multiline
            maxLength={1000}
            textAlignVertical="center"
            returnKeyType="send"
            blurOnSubmit={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={handleSend}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {/* Voice Button */}
          {voiceEnabled && (
            <TouchableOpacity
              style={[
                styles.actionButton,
                {
                  backgroundColor: colors.surface.secondary,
                  borderColor: colors.border.secondary,
                  ...shadows.sm,
                },
                voiceState.isRecording && {
                  backgroundColor: colors.status.error.main,
                  borderColor: colors.status.error.main,
                  ...shadows.md,
                },
              ]}
              onPress={onVoicePress}
              activeOpacity={0.8}
            >
              <Animated.View
                style={[
                  styles.actionButtonInner,
                  voiceState.isRecording && {
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              >
                <Ionicons
                  name={voiceState.isRecording ? "mic" : "mic-outline"}
                  size={20}
                  color={
                    voiceState.isRecording
                      ? colors.text.inverse
                      : colors.text.primary
                  }
                />
              </Animated.View>
              {voiceState.isRecording && (
                <View
                  style={[
                    styles.recordingIndicator,
                    { backgroundColor: colors.status.error.main },
                  ]}
                >
                  <View style={styles.recordingDot} />
                  <Text style={styles.recordingTime}>
                    {Math.floor(voiceState.recordingTime / 10)}s
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          {/* Image Upload Button */}
          {imageUploadEnabled && (
            <TouchableOpacity
              style={[
                styles.actionButton,
                {
                  backgroundColor: colors.surface.secondary,
                  borderColor: colors.border.secondary,
                  ...shadows.sm,
                },
              ]}
              onPress={onImagePress}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <View style={styles.actionButtonInner}>
                <Ionicons
                  name="image-outline"
                  size={20}
                  color={colors.text.primary}
                />
              </View>
            </TouchableOpacity>
          )}

          {/* Send Button */}
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor:
                  inputText.trim() && !isLoading
                    ? colors.status.success.main
                    : colors.text.tertiary,
                ...shadows.md,
              },
            ]}
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading}
            activeOpacity={0.8}
          >
            <View style={styles.sendButtonInner}>
              {isLoading ? (
                <Ionicons
                  name="ellipsis-horizontal"
                  size={20}
                  color={colors.text.inverse}
                />
              ) : (
                <Ionicons name="send" size={20} color={colors.text.inverse} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Character Counter */}
      <View style={styles.counterContainer}>
        <Text style={[styles.charCount, { color: colors.text.tertiary }]}>
          {inputText.length}/1000
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: "rgba(48, 54, 61, 0.3)",
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 34 : 16, // Extra padding for iOS home indicator
    position: "relative",
  },
  topBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    opacity: 0.6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  textInputContainer: {
    flex: 1,
    position: "relative",
  },
  textInput: {
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 80, // Reduced max height
    minHeight: 44, // Minimum height for touch target
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    position: "relative",
    minWidth: 40,
    minHeight: 40,
  },
  actionButtonInner: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
  },
  recordingIndicator: {
    position: "absolute",
    top: -8,
    right: -8,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    elevation: 2,
  },
  recordingDot: {
    width: 6,
    height: 6,
    backgroundColor: "#ffffff",
    borderRadius: 3,
  },
  recordingTime: {
    fontSize: 10,
    color: "#ffffff",
    fontWeight: "600",
  },
  sendButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    minWidth: 44,
    minHeight: 44,
  },
  sendButtonInner: {
    justifyContent: "center",
    alignItems: "center",
  },
  counterContainer: {
    alignItems: "flex-end",
    marginTop: 6,
    marginRight: 4,
  },
  charCount: {
    fontSize: 11,
    fontWeight: "500",
  },
});

export default VaultAIInput;
