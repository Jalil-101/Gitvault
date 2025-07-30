import { useModernTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface VaultAIModeSelectorProps {
  aiMode: "chat" | "analysis" | "commit" | "review" | "voice";
  onModeChange: (
    mode: "chat" | "analysis" | "commit" | "review" | "voice"
  ) => void;
  realTimeAnalysis: boolean;
}

const VaultAIModeSelector: React.FC<VaultAIModeSelectorProps> = ({
  aiMode,
  onModeChange,
  realTimeAnalysis,
}) => {
  const { colors, shadows, isDarkTheme } = useModernTheme();

  const modes = [
    {
      key: "chat",
      label: "Chat",
      icon: "chatbubble-outline",
      activeIcon: "chatbubble",
    },
    {
      key: "voice",
      label: "Voice",
      icon: "mic-outline",
      activeIcon: "mic",
    },
    {
      key: "commit",
      label: "Commit",
      icon: "git-commit-outline",
      activeIcon: "git-commit",
    },
    {
      key: "review",
      label: "Review",
      icon: "search-outline",
      activeIcon: "search",
    },
    ...(realTimeAnalysis
      ? [
          {
            key: "analysis",
            label: "Analysis",
            icon: "analytics-outline",
            activeIcon: "analytics",
          },
        ]
      : []),
  ];

  return (
    <View
      style={[styles.container, { backgroundColor: colors.surface.primary }]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.modeSelector}
      >
        {modes.map((mode) => (
          <TouchableOpacity
            key={mode.key}
            style={[
              styles.modeButton,
              {
                backgroundColor: colors.surface.secondary,
                borderColor: colors.border.secondary,
                ...shadows.sm,
              },
              aiMode === mode.key && {
                backgroundColor: colors.accents.purple.main,
                borderColor: colors.accents.purple.main,
                ...shadows.md,
              },
            ]}
            onPress={() => onModeChange(mode.key as any)}
            activeOpacity={0.8}
          >
            <View style={styles.modeButtonContent}>
              <Ionicons
                name={aiMode === mode.key ? mode.activeIcon : mode.icon}
                size={18}
                color={
                  aiMode === mode.key
                    ? colors.text.inverse
                    : colors.text.primary
                }
              />
              <Text
                style={[
                  styles.modeButtonText,
                  { color: colors.text.tertiary },
                  aiMode === mode.key && { color: colors.text.inverse },
                ]}
              >
                {mode.label}
              </Text>
            </View>
            {aiMode === mode.key && (
              <View
                style={[
                  styles.activeIndicator,
                  { backgroundColor: colors.accents.purple.main },
                ]}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Active mode description */}
      <View
        style={[
          styles.modeDescription,
          { backgroundColor: colors.accents.purple.light },
        ]}
      >
        <Text
          style={[styles.descriptionText, { color: colors.text.secondary }]}
        >
          {aiMode === "chat" && "💬 General conversation and assistance"}
          {aiMode === "voice" && "🎤 Voice-powered interactions"}
          {aiMode === "commit" && "📝 Git commit message generation"}
          {aiMode === "review" && "🔍 Code review and analysis"}
          {aiMode === "analysis" && "📊 Real-time code analysis"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(48, 54, 61, 0.5)",
    paddingBottom: 12,
  },
  modeSelector: {
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  modeButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    position: "relative",
    minWidth: 70,
  },
  modeButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  modeButtonText: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  activeIndicator: {
    position: "absolute",
    bottom: -2,
    left: "50%",
    marginLeft: -6,
    width: 12,
    height: 3,
    borderRadius: 2,
  },
  modeDescription: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(124, 58, 237, 0.1)",
  },
  descriptionText: {
    fontSize: 12,
    fontStyle: "italic",
    textAlign: "center",
    fontWeight: "500",
  },
});

export default VaultAIModeSelector;
