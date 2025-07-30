import { useModernTheme } from "@/context/ThemeContext";
import * as Speech from "expo-speech";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Clipboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CopyIcon, SpeakIcon, StopIcon } from "./VaultAIIcons";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
  messageType?:
    | "text"
    | "code"
    | "commit"
    | "analysis"
    | "suggestion"
    | "voice";
  metadata?: {
    language?: string;
    confidence?: number;
    codeQuality?: number;
    suggestions?: string[];
    audioLength?: number;
    sentiment?: "positive" | "neutral" | "negative";
  };
}

interface VaultAIMessageProps {
  message: Message;
}

const VaultAIMessage: React.FC<VaultAIMessageProps> = ({ message }) => {
  const { colors, shadows, isDarkTheme } = useModernTheme();

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Alert.alert("✅ Copied!", "Message copied to clipboard");
  };

  const speakText = (text: string) => {
    Speech.speak(text, { language: "en" });
  };

  return (
    <View
      style={[
        styles.messageContainer,
        message.isUser ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          message.isUser
            ? {
                backgroundColor: colors.status.success.main,
                ...shadows.md,
              }
            : {
                backgroundColor: colors.surface.secondary,
                borderColor: colors.border.secondary,
                ...shadows.sm,
              },
        ]}
      >
        {/* Message type indicator */}
        {!message.isUser && message.messageType && (
          <View
            style={[
              styles.messageTypeIndicator,
              { borderBottomColor: colors.border.tertiary },
            ]}
          >
            <View
              style={[
                styles.messageTypeDot,
                { backgroundColor: colors.accents.blue.main },
              ]}
            />
            <Text
              style={[
                styles.messageTypeText,
                { color: colors.accents.blue.main },
              ]}
            >
              {message.messageType.toUpperCase()}
            </Text>
          </View>
        )}

        {message.isLoading ? (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingIndicator}>
              <ActivityIndicator
                size="small"
                color={colors.accents.blue.main}
              />
              <View style={styles.loadingDots}>
                <View
                  style={[
                    styles.loadingDot,
                    { backgroundColor: colors.accents.blue.main },
                  ]}
                />
                <View
                  style={[
                    styles.loadingDot,
                    { backgroundColor: colors.accents.blue.main },
                  ]}
                />
                <View
                  style={[
                    styles.loadingDot,
                    { backgroundColor: colors.accents.blue.main },
                  ]}
                />
              </View>
            </View>
            <Text
              style={[styles.loadingText, { color: colors.accents.blue.main }]}
            >
              AI is thinking...
            </Text>
          </View>
        ) : (
          <>
            <Text
              style={[
                styles.messageText,
                message.isUser
                  ? { color: colors.text.inverse }
                  : { color: colors.text.primary },
              ]}
            >
              {message.text}
            </Text>

            {/* Message metadata */}
            {message.metadata && (
              <View
                style={[
                  styles.metadataContainer,
                  { borderTopColor: colors.border.tertiary },
                ]}
              >
                {message.metadata.confidence && (
                  <Text
                    style={[
                      styles.metadataText,
                      { color: colors.text.tertiary },
                    ]}
                  >
                    Confidence: {Math.round(message.metadata.confidence * 100)}%
                  </Text>
                )}
                {message.metadata.sentiment && (
                  <View style={styles.sentimentIndicator}>
                    <View
                      style={[
                        styles.sentimentDot,
                        {
                          backgroundColor:
                            message.metadata.sentiment === "positive"
                              ? colors.status.success.main
                              : message.metadata.sentiment === "negative"
                              ? colors.status.error.main
                              : colors.text.tertiary,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.metadataText,
                        { color: colors.text.tertiary },
                      ]}
                    >
                      {message.metadata.sentiment}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {!message.isUser && (
              <View
                style={[
                  styles.messageActions,
                  { borderTopColor: colors.border.tertiary },
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: colors.surface.primary,
                      borderColor: colors.border.secondary,
                      ...shadows.sm,
                    },
                  ]}
                  onPress={() => copyToClipboard(message.text)}
                  activeOpacity={0.7}
                >
                  <View style={styles.actionButtonInner}>
                    <CopyIcon />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: colors.surface.primary,
                      borderColor: colors.border.secondary,
                      ...shadows.sm,
                    },
                  ]}
                  onPress={() => speakText(message.text)}
                  activeOpacity={0.7}
                >
                  <View style={styles.actionButtonInner}>
                    <SpeakIcon />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    styles.stopButton,
                    {
                      backgroundColor: colors.surface.secondary,
                      borderColor: colors.status.error.main,
                      ...shadows.sm,
                    },
                  ]}
                  onPress={() => Speech.stop()}
                  activeOpacity={0.7}
                >
                  <View style={styles.actionButtonInner}>
                    <StopIcon />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>

      <View style={styles.timestampContainer}>
        <Text style={[styles.timestamp, { color: colors.text.tertiary }]}>
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        {!message.isUser && (
          <View
            style={[
              styles.aiIndicator,
              { backgroundColor: colors.accents.purple.main },
            ]}
          >
            <Text
              style={[styles.aiIndicatorText, { color: colors.text.inverse }]}
            >
              AI
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  userMessage: {
    alignItems: "flex-end",
  },
  aiMessage: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "88%",
    padding: 20,
    borderRadius: 24,
    position: "relative",
  },
  messageTypeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  messageTypeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  messageTypeText: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 26,
  },
  metadataContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    gap: 16,
  },
  metadataText: {
    fontSize: 12,
    fontWeight: "500",
  },
  sentimentIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sentimentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  messageActions: {
    flexDirection: "row",
    marginTop: 16,
    gap: 10,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  actionButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  stopButton: {
    // Special styling for stop button
  },
  actionButtonInner: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    paddingVertical: 16,
  },
  loadingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  loadingDots: {
    flexDirection: "row",
    marginLeft: 16,
    gap: 6,
  },
  loadingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    opacity: 0.4,
  },
  loadingText: {
    fontSize: 15,
    fontStyle: "italic",
    textAlign: "center",
    fontWeight: "500",
  },
  timestampContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 10,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: "500",
  },
  aiIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  aiIndicatorText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default VaultAIMessage;
