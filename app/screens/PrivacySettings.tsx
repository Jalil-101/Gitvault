import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useModernTheme } from "@/context/ThemeContext";
import { useThemeClasses } from "@/hooks/useThemeColor";

interface PrivacyOption {
  id: string;
  title: string;
  description: string;
  value: boolean;
  icon: keyof typeof Ionicons.glyphMap;
}

interface PrivacySection {
  title: string;
  options: PrivacyOption[];
}

const PrivacySettings: React.FC = () => {
  const { colors, isDarkTheme, shadows } = useModernTheme();
  const themeClasses = useThemeClasses();

  const [privacyOptions, setPrivacyOptions] = useState<PrivacySection[]>([
    {
      title: "Profile Visibility",
      options: [
        {
          id: "public_profile",
          title: "Public Profile",
          description: "Make your profile visible to everyone",
          value: true,
          icon: "person-outline",
        },
        {
          id: "show_email",
          title: "Show Email",
          description: "Display email address on profile",
          value: false,
          icon: "mail-outline",
        },
        {
          id: "show_location",
          title: "Show Location",
          description: "Display your location publicly",
          value: false,
          icon: "location-outline",
        },
      ],
    },
    {
      title: "Repository Settings",
      options: [
        {
          id: "default_repo_visibility",
          title: "Default Repository Visibility",
          description: "New repositories are private by default",
          value: true,
          icon: "lock-closed-outline",
        },
        {
          id: "fork_visibility",
          title: "Include Private Contributions",
          description: "Show private contributions on profile",
          value: false,
          icon: "git-branch-outline",
        },
      ],
    },
    {
      title: "Activity & Notifications",
      options: [
        {
          id: "activity_overview",
          title: "Activity Overview",
          description: "Show contribution activity publicly",
          value: true,
          icon: "analytics-outline",
        },
        {
          id: "web_notifications",
          title: "Web Notifications",
          description: "Receive notifications in browser",
          value: true,
          icon: "notifications-outline",
        },
        {
          id: "email_notifications",
          title: "Email Notifications",
          description: "Receive email updates",
          value: false,
          icon: "mail-unread-outline",
        },
      ],
    },
    {
      title: "Security & Access",
      options: [
        {
          id: "two_factor",
          title: "Two-Factor Authentication",
          description: "Require 2FA for account access",
          value: true,
          icon: "shield-checkmark-outline",
        },
        {
          id: "session_management",
          title: "Active Sessions",
          description: "Manage active login sessions",
          value: true,
          icon: "desktop-outline",
        },
      ],
    },
  ]);

  const toggleOption = (sectionIndex: number, optionIndex: number) => {
    setPrivacyOptions((prev) =>
      prev.map((section, sIdx) =>
        sIdx === sectionIndex
          ? {
              ...section,
              options: section.options.map((option, oIdx) =>
                oIdx === optionIndex
                  ? { ...option, value: !option.value }
                  : option
              ),
            }
          : section
      )
    );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background.primary,
      }}
    >
      {/* Header */}
      <View
        style={{
          backgroundColor: colors.surface.secondary,
          paddingHorizontal: 16,
          paddingVertical: 24,
          borderBottomWidth: 1,
          borderBottomColor: colors.border.primary,
          ...shadows.sm,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Ionicons
            name="shield-checkmark"
            size={24}
            color={colors.status.success.main}
          />
          <Text
            style={{
              color: colors.text.primary,
              fontSize: 20,
              fontWeight: "600",
              marginLeft: 12,
            }}
          >
            Privacy Settings
          </Text>
        </View>
        <Text
          style={{
            color: colors.text.secondary,
            fontSize: 14,
          }}
        >
          Manage your privacy and security preferences
        </Text>
      </View>

      {/* Privacy Sections */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
        {privacyOptions.map((section, sectionIndex) => (
          <View key={section.title} style={{ marginBottom: 24 }}>
            {/* Section Header */}
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 18,
                  fontWeight: "500",
                  marginBottom: 4,
                }}
              >
                {section.title}
              </Text>
              <View
                style={{
                  height: 1,
                  backgroundColor: colors.border.secondary,
                  width: "100%",
                }}
              />
            </View>

            {/* Section Options */}
            <View
              style={{
                backgroundColor: colors.surface.elevated,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border.primary,
                overflow: "hidden",
                ...shadows.md,
              }}
            >
              {section.options.map((option, optionIndex) => (
                <TouchableOpacity
                  key={option.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 16,
                    borderBottomWidth:
                      optionIndex !== section.options.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border.primary,
                    backgroundColor: colors.surface.elevated,
                  }}
                  onPress={() => toggleOption(sectionIndex, optionIndex)}
                  activeOpacity={0.7}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: colors.surface.secondary,
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 12,
                      }}
                    >
                      <Ionicons
                        name={option.icon}
                        size={20}
                        color={
                          option.value
                            ? colors.status.success.main
                            : colors.text.quaternary
                        }
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: colors.text.primary,
                          fontSize: 16,
                          fontWeight: "500",
                          marginBottom: 4,
                        }}
                      >
                        {option.title}
                      </Text>
                      <Text
                        style={{
                          color: colors.text.secondary,
                          fontSize: 14,
                        }}
                      >
                        {option.description}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={option.value}
                    onValueChange={() =>
                      toggleOption(sectionIndex, optionIndex)
                    }
                    trackColor={{
                      false: colors.surface.secondary,
                      true: colors.status.success.main,
                    }}
                    thumbColor={
                      option.value
                        ? colors.text.inverse
                        : colors.text.quaternary
                    }
                    ios_backgroundColor={colors.surface.secondary}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Additional Actions */}
        <View style={{ marginTop: 24 }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.surface.elevated,
              borderWidth: 1,
              borderColor: colors.border.primary,
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
              ...shadows.sm,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: colors.accents.blue.light,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color={colors.accents.blue.main}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: colors.text.primary,
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  Download Data
                </Text>
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                  }}
                >
                  Export your account data
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.text.quaternary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: colors.surface.elevated,
              borderWidth: 1,
              borderColor: colors.status.error.main,
              borderRadius: 12,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              ...shadows.sm,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: colors.status.error.light,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color={colors.status.error.main}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: colors.status.error.main,
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  Delete Account
                </Text>
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                  }}
                >
                  Permanently delete your account
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.status.error.main}
            />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View
          style={{
            marginTop: 32,
            padding: 16,
            backgroundColor: colors.surface.elevated,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border.primary,
            ...shadows.sm,
          }}
        >
          <Text
            style={{
              color: colors.text.secondary,
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Last updated: {new Date().toLocaleDateString()}
          </Text>
          <Text
            style={{
              color: colors.text.tertiary,
              fontSize: 12,
              textAlign: "center",
              marginTop: 8,
            }}
          >
            Changes are saved automatically
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PrivacySettings;
