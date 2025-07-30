import { useModernTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SmartFeatures {
  voiceEnabled: boolean;
  realTimeAnalysis: boolean;
  predictiveMode: boolean;
  contextAwareness: boolean;
  aiPersonality: "professional" | "friendly" | "witty" | "mentor";
}

interface VaultAISettingsModalProps {
  visible: boolean;
  onClose: () => void;
  smartFeatures: SmartFeatures;
  onSmartFeaturesChange: (features: SmartFeatures) => void;
  imageUploadEnabled: boolean;
  onImageUploadChange: (enabled: boolean) => void;
  apiKey?: string;
  speechApiKey?: string;
  repoStats?: {
    commits: number;
    contributors: number;
    languages: string[];
  };
}

const VaultAISettingsModal: React.FC<VaultAISettingsModalProps> = ({
  visible,
  onClose,
  smartFeatures,
  onSmartFeaturesChange,
  imageUploadEnabled,
  onImageUploadChange,
  apiKey,
  speechApiKey,
  repoStats,
}) => {
  const { colors, shadows, isDarkTheme } = useModernTheme();

  const personalityEmojis = {
    professional: "👔",
    friendly: "😊",
    witty: "😄",
    mentor: "🧠",
  };

  const personalityDescriptions = {
    professional: "Formal and business-focused",
    friendly: "Casual and approachable",
    witty: "Humorous and engaging",
    mentor: "Educational and guiding",
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View
        style={[styles.modalOverlay, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
      >
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: colors.surface.primary,
              ...shadows.xl,
            },
          ]}
        >
          {/* Header */}
          <View
            style={[
              styles.modalHeader,
              { borderBottomColor: colors.border.secondary },
            ]}
          >
            <View
              style={[
                styles.headerIcon,
                { backgroundColor: colors.accents.purple.main },
              ]}
            >
              <Ionicons name="settings" size={24} color={colors.text.inverse} />
            </View>
            <View style={styles.headerText}>
              <Text style={[styles.modalTitle, { color: colors.text.primary }]}>
                Advanced Settings
              </Text>
              <Text
                style={[styles.modalSubtitle, { color: colors.text.secondary }]}
              >
                Customize your Vault AI experience
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={[
                styles.modalCloseButton,
                {
                  backgroundColor: colors.surface.secondary,
                  borderColor: colors.border.secondary,
                },
              ]}
            >
              <Ionicons name="close" size={20} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalBody}
            showsVerticalScrollIndicator={false}
          >
            {/* Smart Features Section */}
            <View style={styles.settingSection}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="target"
                  size={20}
                  color={colors.accents.purple.main}
                />
                <Text
                  style={[styles.sectionTitle, { color: colors.text.primary }]}
                >
                  Smart Features
                </Text>
              </View>

              <View
                style={[
                  styles.settingCard,
                  {
                    backgroundColor: colors.surface.secondary,
                    borderColor: colors.border.secondary,
                  },
                ]}
              >
                <View style={styles.settingRow}>
                  <View style={styles.settingInfo}>
                    <Text
                      style={[
                        styles.settingLabel,
                        { color: colors.text.primary },
                      ]}
                    >
                      Voice Enabled
                    </Text>
                    <Text
                      style={[
                        styles.settingDescription,
                        { color: colors.text.secondary },
                      ]}
                    >
                      Enable voice input and output
                    </Text>
                  </View>
                  <Switch
                    value={smartFeatures.voiceEnabled}
                    onValueChange={(value) =>
                      onSmartFeaturesChange({
                        ...smartFeatures,
                        voiceEnabled: value,
                      })
                    }
                    trackColor={{
                      false: colors.border.secondary,
                      true: colors.accents.purple.main,
                    }}
                    thumbColor={
                      smartFeatures.voiceEnabled
                        ? colors.text.inverse
                        : colors.text.tertiary
                    }
                    ios_backgroundColor={colors.border.secondary}
                  />
                </View>

                <View style={styles.settingRow}>
                  <View style={styles.settingInfo}>
                    <Text
                      style={[
                        styles.settingLabel,
                        { color: colors.text.primary },
                      ]}
                    >
                      Real-time Analysis
                    </Text>
                    <Text
                      style={[
                        styles.settingDescription,
                        { color: colors.text.secondary },
                      ]}
                    >
                      Live code analysis and suggestions
                    </Text>
                  </View>
                  <Switch
                    value={smartFeatures.realTimeAnalysis}
                    onValueChange={(value) =>
                      onSmartFeaturesChange({
                        ...smartFeatures,
                        realTimeAnalysis: value,
                      })
                    }
                    trackColor={{
                      false: colors.border.secondary,
                      true: colors.accents.purple.main,
                    }}
                    thumbColor={
                      smartFeatures.realTimeAnalysis
                        ? colors.text.inverse
                        : colors.text.tertiary
                    }
                    ios_backgroundColor={colors.border.secondary}
                  />
                </View>

                <View style={styles.settingRow}>
                  <View style={styles.settingInfo}>
                    <Text
                      style={[
                        styles.settingLabel,
                        { color: colors.text.primary },
                      ]}
                    >
                      Predictive Mode
                    </Text>
                    <Text
                      style={[
                        styles.settingDescription,
                        { color: colors.text.secondary },
                      ]}
                    >
                      AI predicts your next actions
                    </Text>
                  </View>
                  <Switch
                    value={smartFeatures.predictiveMode}
                    onValueChange={(value) =>
                      onSmartFeaturesChange({
                        ...smartFeatures,
                        predictiveMode: value,
                      })
                    }
                    trackColor={{
                      false: colors.border.secondary,
                      true: colors.accents.purple.main,
                    }}
                    thumbColor={
                      smartFeatures.predictiveMode
                        ? colors.text.inverse
                        : colors.text.tertiary
                    }
                    ios_backgroundColor={colors.border.secondary}
                  />
                </View>

                <View style={[styles.settingRow, styles.lastSettingRow]}>
                  <View style={styles.settingInfo}>
                    <Text
                      style={[
                        styles.settingLabel,
                        { color: colors.text.primary },
                      ]}
                    >
                      Context Awareness
                    </Text>
                    <Text
                      style={[
                        styles.settingDescription,
                        { color: colors.text.secondary },
                      ]}
                    >
                      AI understands your project context
                    </Text>
                  </View>
                  <Switch
                    value={smartFeatures.contextAwareness}
                    onValueChange={(value) =>
                      onSmartFeaturesChange({
                        ...smartFeatures,
                        contextAwareness: value,
                      })
                    }
                    trackColor={{
                      false: colors.border.secondary,
                      true: colors.accents.purple.main,
                    }}
                    thumbColor={
                      smartFeatures.contextAwareness
                        ? colors.text.inverse
                        : colors.text.tertiary
                    }
                    ios_backgroundColor={colors.border.secondary}
                  />
                </View>
              </View>
            </View>

            {/* AI Personality Section */}
            <View style={styles.settingSection}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="sparkles"
                  size={20}
                  color={colors.accents.purple.main}
                />
                <Text
                  style={[styles.sectionTitle, { color: colors.text.primary }]}
                >
                  AI Personality
                </Text>
              </View>

              <View style={styles.personalityGrid}>
                {(["professional", "friendly", "witty", "mentor"] as const).map(
                  (personality) => (
                    <TouchableOpacity
                      key={personality}
                      style={[
                        styles.personalityCard,
                        {
                          backgroundColor: colors.surface.secondary,
                          borderColor: colors.border.secondary,
                        },
                        smartFeatures.aiPersonality === personality && {
                          backgroundColor: colors.accents.purple.light,
                          borderColor: colors.accents.purple.main,
                        },
                      ]}
                      onPress={() =>
                        onSmartFeaturesChange({
                          ...smartFeatures,
                          aiPersonality: personality,
                        })
                      }
                    >
                      <Text style={styles.personalityEmoji}>
                        {personalityEmojis[personality]}
                      </Text>
                      <Text
                        style={[
                          styles.personalityLabel,
                          { color: colors.text.primary },
                        ]}
                      >
                        {personality.charAt(0).toUpperCase() +
                          personality.slice(1)}
                      </Text>
                      <Text
                        style={[
                          styles.personalityDescription,
                          { color: colors.text.secondary },
                        ]}
                      >
                        {personalityDescriptions[personality]}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>

            {/* Repository Stats Section */}
            {repoStats && (
              <View style={styles.settingSection}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionIcon}>📊</Text>
                  <Text style={styles.sectionTitle}>Repository Stats</Text>
                </View>

                <View style={styles.statsCard}>
                  <View style={styles.statsGrid}>
                    <View style={styles.statItem}>
                      <View style={styles.statIconContainer}>
                        <Text style={styles.statIcon}>📝</Text>
                      </View>
                      <Text style={styles.statValue}>{repoStats.commits}</Text>
                      <Text style={styles.statLabel}>Commits</Text>
                    </View>
                    <View style={styles.statItem}>
                      <View style={styles.statIconContainer}>
                        <Text style={styles.statIcon}>👥</Text>
                      </View>
                      <Text style={styles.statValue}>
                        {repoStats.contributors}
                      </Text>
                      <Text style={styles.statLabel}>Contributors</Text>
                    </View>
                    <View style={styles.statItem}>
                      <View style={styles.statIconContainer}>
                        <Text style={styles.statIcon}>🔧</Text>
                      </View>
                      <Text style={styles.statValue}>
                        {repoStats.languages.length}
                      </Text>
                      <Text style={styles.statLabel}>Languages</Text>
                    </View>
                  </View>

                  <View style={styles.languagesContainer}>
                    <Text style={styles.languagesTitle}>Languages Used:</Text>
                    <View style={styles.languagesTags}>
                      {repoStats.languages
                        .slice(0, 6)
                        .map((language, index) => (
                          <View key={index} style={styles.languageTag}>
                            <Text style={styles.languageTagText}>
                              {language}
                            </Text>
                          </View>
                        ))}
                      {repoStats.languages.length > 6 && (
                        <View style={styles.languageTag}>
                          <Text style={styles.languageTagText}>
                            +{repoStats.languages.length - 6}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* API Status Section */}
            <View style={styles.settingSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🔑</Text>
                <Text style={styles.sectionTitle}>API Status</Text>
              </View>

              <View style={styles.apiStatusCard}>
                <View style={styles.apiStatusItem}>
                  <View style={styles.apiStatusIcon}>
                    <Text style={styles.apiStatusEmoji}>🤖</Text>
                  </View>
                  <View style={styles.apiStatusInfo}>
                    <Text style={styles.apiStatusTitle}>AI Model</Text>
                    <Text style={styles.apiStatusSubtitle}>
                      DeepSeek R1 (Free)
                    </Text>
                  </View>
                  <View style={styles.apiStatusBadge}>
                    <Text style={styles.apiStatusBadgeText}>FREE</Text>
                  </View>
                </View>

                <View style={styles.apiStatusItem}>
                  <View style={styles.apiStatusIcon}>
                    <Text style={styles.apiStatusEmoji}>🔗</Text>
                  </View>
                  <View style={styles.apiStatusInfo}>
                    <Text style={styles.apiStatusTitle}>AI Connection</Text>
                    <Text style={styles.apiStatusSubtitle}>
                      {apiKey ? "Connected and ready" : "No API key configured"}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusIndicator,
                      { backgroundColor: apiKey ? "#238636" : "#f85149" },
                    ]}
                  >
                    <Text style={styles.statusIndicatorText}>
                      {apiKey ? "✓" : "✗"}
                    </Text>
                  </View>
                </View>

                <View style={styles.apiStatusItem}>
                  <View style={styles.apiStatusIcon}>
                    <Text style={styles.apiStatusEmoji}>🎤</Text>
                  </View>
                  <View style={styles.apiStatusInfo}>
                    <Text style={styles.apiStatusTitle}>Speech API</Text>
                    <Text style={styles.apiStatusSubtitle}>
                      {speechApiKey
                        ? "Voice features enabled"
                        : "Voice features disabled"}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusIndicator,
                      { backgroundColor: speechApiKey ? "#238636" : "#f85149" },
                    ]}
                  >
                    <Text style={styles.statusIndicatorText}>
                      {speechApiKey ? "✓" : "✗"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Image Upload Section */}
            <View style={styles.settingSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🖼️</Text>
                <Text style={styles.sectionTitle}>Image Upload</Text>
              </View>

              <View style={styles.settingCard}>
                <View style={[styles.settingRow, styles.lastSettingRow]}>
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingLabel}>Enable Image Upload</Text>
                    <Text style={styles.settingDescription}>
                      Allow image attachments in conversations
                    </Text>
                  </View>
                  <Switch
                    value={imageUploadEnabled}
                    onValueChange={onImageUploadChange}
                    trackColor={{ false: "#30363d", true: "#7c3aed" }}
                    thumbColor={imageUploadEnabled ? "#ffffff" : "#8b949e"}
                    ios_backgroundColor="#30363d"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#161b22",
    borderRadius: 20,
    width: "95%",
    maxHeight: "90%",
    borderWidth: 1,
    borderColor: "#30363d",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#30363d",
    backgroundColor: "#21262d",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#7c3aed",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  headerIconText: {
    fontSize: 24,
  },
  headerText: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f0f6fc",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#8b949e",
  },
  modalCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#30363d",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseText: {
    fontSize: 18,
    color: "#f85149",
    fontWeight: "bold",
  },
  modalBody: {
    padding: 20,
  },
  settingSection: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#58a6ff",
    letterSpacing: 0.3,
  },
  settingCard: {
    backgroundColor: "#21262d",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#30363d",
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#30363d",
  },
  lastSettingRow: {
    borderBottomWidth: 0,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: "#f0f6fc",
    fontWeight: "600",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: "#8b949e",
    lineHeight: 18,
  },
  personalityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  personalityCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#21262d",
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#30363d",
    alignItems: "center",
    position: "relative",
  },
  activePersonalityCard: {
    borderColor: "#7c3aed",
    backgroundColor: "rgba(124, 58, 237, 0.1)",
  },
  personalityEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  personalityLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  personalityDescription: {
    fontSize: 12,
    color: "#6e7681",
    textAlign: "center",
    lineHeight: 16,
  },
  personalityCheckmark: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#7c3aed",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  statsCard: {
    backgroundColor: "#21262d",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#30363d",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#161b22",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#30363d",
  },
  statIcon: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#58a6ff",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#8b949e",
    fontWeight: "500",
  },
  languagesContainer: {
    borderTopWidth: 1,
    borderTopColor: "#30363d",
    paddingTop: 16,
  },
  languagesTitle: {
    fontSize: 14,
    color: "#f0f6fc",
    fontWeight: "600",
    marginBottom: 12,
  },
  languagesTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  languageTag: {
    backgroundColor: "#161b22",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#30363d",
  },
  languageTagText: {
    fontSize: 12,
    color: "#8b949e",
    fontWeight: "500",
  },
  apiStatusCard: {
    backgroundColor: "#21262d",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#30363d",
    overflow: "hidden",
  },
  apiStatusItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#30363d",
  },
  apiStatusIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#161b22",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#30363d",
  },
  apiStatusEmoji: {
    fontSize: 20,
  },
  apiStatusInfo: {
    flex: 1,
  },
  apiStatusTitle: {
    fontSize: 16,
    color: "#f0f6fc",
    fontWeight: "600",
    marginBottom: 2,
  },
  apiStatusSubtitle: {
    fontSize: 13,
    color: "#8b949e",
    lineHeight: 18,
  },
  apiStatusBadge: {
    backgroundColor: "#238636",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  apiStatusBadgeText: {
    fontSize: 10,
    color: "#ffffff",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  statusIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  statusIndicatorText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default VaultAISettingsModal;
