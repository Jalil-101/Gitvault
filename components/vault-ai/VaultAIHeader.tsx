import { useModernTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Enhanced Settings Icon Component with modern design
const SettingsIcon = ({ colors }: { colors: any }) => (
  <View style={styles.settingsIconContainer}>
    <View
      style={[styles.settingsIconRing, { borderColor: colors.text.primary }]}
    >
      {/* Center dot */}
      <View
        style={[
          styles.settingsCenterDot,
          { backgroundColor: colors.text.primary },
        ]}
      />
      {/* Surrounding dots with better positioning */}
      <View
        style={[
          styles.settingsDot,
          { top: 1, left: 6, backgroundColor: colors.text.primary },
        ]}
      />
      <View
        style={[
          styles.settingsDot,
          { bottom: 1, left: 6, backgroundColor: colors.text.primary },
        ]}
      />
      <View
        style={[
          styles.settingsDot,
          { left: 1, top: 6, backgroundColor: colors.text.primary },
        ]}
      />
      <View
        style={[
          styles.settingsDot,
          { right: 1, top: 6, backgroundColor: colors.text.primary },
        ]}
      />
      <View
        style={[
          styles.settingsDot,
          { top: 2, left: 2, backgroundColor: colors.text.primary },
        ]}
      />
      <View
        style={[
          styles.settingsDot,
          { top: 2, right: 2, backgroundColor: colors.text.primary },
        ]}
      />
      <View
        style={[
          styles.settingsDot,
          { bottom: 2, left: 2, backgroundColor: colors.text.primary },
        ]}
      />
      <View
        style={[
          styles.settingsDot,
          { bottom: 2, right: 2, backgroundColor: colors.text.primary },
        ]}
      />
    </View>
  </View>
);

interface VaultAIHeaderProps {
  onSettingsPress: () => void;
}

const VaultAIHeader: React.FC<VaultAIHeaderProps> = ({ onSettingsPress }) => {
  const { colors, gradients, shadows, isDarkTheme } = useModernTheme();

  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor: colors.surface.primary },
      ]}
    >
      {/* Gradient overlay effect */}
      <LinearGradient
        colors={gradients.purple as [any, any, ...any[]]}
        style={styles.gradientOverlay}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          <View style={styles.titleContainer}>
            <Ionicons
              name="sparkles"
              size={24}
              color={colors.accents.purple.main}
              style={styles.aiIcon}
            />
            <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
              Vault AI
            </Text>
            <View
              style={[
                styles.titleAccent,
                { backgroundColor: colors.accents.blue.main },
              ]}
            />
          </View>
          <Text
            style={[styles.headerSubtitle, { color: colors.text.secondary }]}
          >
            Voice-Enhanced Intelligence
          </Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[
              styles.settingsButton,
              {
                backgroundColor: colors.surface.secondary,
                borderColor: colors.border.secondary,
                ...shadows.sm,
              },
            ]}
            onPress={onSettingsPress}
            activeOpacity={0.7}
          >
            <View style={styles.settingsButtonInner}>
              <SettingsIcon colors={colors} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "relative",
    elevation: 8,
    shadowColor: "#7c3aed",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 20,
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  headerContent: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(139, 148, 158, 0.1)",
  },
  headerLeft: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  titleAccent: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 8,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsButton: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  settingsButtonInner: {
    justifyContent: "center",
    alignItems: "center",
  },
  settingsIconContainer: {
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsIconRing: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    position: "relative",
    backgroundColor: "transparent",
  },
  settingsCenterDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    position: "absolute",
    top: 5.5,
    left: 5.5,
  },
  settingsDot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    position: "absolute",
  },
  aiIcon: {
    marginRight: 8,
  },
});

export default VaultAIHeader;
