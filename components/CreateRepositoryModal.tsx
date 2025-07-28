// components/CreateRepositoryModal.tsx
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { repositoryService } from "@/services/repositoryService";
import { CreateRepositoryData } from "@/types/repo/repository";
import { useModernTheme } from "@/context/ThemeContext";
import { recordRepositoryCreation } from "@/utils/contributions/contributionData";

interface CreateRepositoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateRepositoryModal: React.FC<CreateRepositoryModalProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const { colors, shadows } = useModernTheme();
  const [formData, setFormData] = useState<CreateRepositoryData>({
    name: "",
    description: "",
    isPrivate: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Repository name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Repository name must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const newRepository = await repositoryService.createRepository(formData);
      
      // Record the repository creation for contribution tracking
      await recordRepositoryCreation(
        newRepository.id.toString(),
        newRepository.name
      );
      
      Alert.alert("Success", "Repository created successfully!");
      setFormData({ name: "", description: "", isPrivate: false });
      setErrors({});
      onSuccess();
      onClose();
    } catch (error) {
      Alert.alert("Error", "Failed to create repository. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", description: "", isPrivate: false });
    setErrors({});
    onClose();
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.surface.primary,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primary,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text.primary,
    },
    closeButton: {
      padding: 4,
    },
    createButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    createButtonText: {
      color: colors.interactive.primary,
      fontSize: 16,
      fontWeight: "600",
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonTextDisabled: {
      color: colors.text.quaternary,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    section: {
      marginBottom: 24,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text.primary,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border.primary,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      backgroundColor: colors.surface.primary,
      color: colors.text.primary,
    },
    textArea: {
      borderWidth: 1,
      borderColor: colors.border.primary,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      backgroundColor: colors.surface.primary,
      color: colors.text.primary,
      minHeight: 100,
      textAlignVertical: "top",
    },
    inputError: {
      borderColor: colors.status.error.main,
    },
    errorText: {
      color: colors.status.error.main,
      fontSize: 14,
      marginTop: 4,
    },
    switchContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    switchLabel: {
      flexDirection: "row",
      alignItems: "center",
    },
    helperText: {
      fontSize: 14,
      color: colors.text.tertiary,
      marginTop: 8,
    },
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={dynamicStyles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={dynamicStyles.header}>
          <TouchableOpacity
            onPress={handleClose}
            style={dynamicStyles.closeButton}
          >
            <Ionicons name="close" size={24} color={colors.text.tertiary} />
          </TouchableOpacity>
          <Text style={dynamicStyles.title}>Create Repository</Text>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            style={[
              dynamicStyles.createButton,
              loading && dynamicStyles.buttonDisabled,
            ]}
          >
            <Text
              style={[
                dynamicStyles.createButtonText,
                loading && dynamicStyles.buttonTextDisabled,
              ]}
            >
              {loading ? "Creating..." : "Create"}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={dynamicStyles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.label}>Repository Name *</Text>
            <TextInput
              style={[
                dynamicStyles.input,
                errors.name && dynamicStyles.inputError,
              ]}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Enter repository name"
              placeholderTextColor={colors.text.quaternary}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.name && (
              <Text style={dynamicStyles.errorText}>{errors.name}</Text>
            )}
          </View>

          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.label}>Description *</Text>
            <TextInput
              style={[
                dynamicStyles.textArea,
                errors.description && dynamicStyles.inputError,
              ]}
              value={formData.description}
              onChangeText={(text) =>
                setFormData({ ...formData, description: text })
              }
              placeholder="Describe your repository"
              placeholderTextColor={colors.text.quaternary}
              multiline
              numberOfLines={4}
            />
            {errors.description && (
              <Text style={dynamicStyles.errorText}>{errors.description}</Text>
            )}
          </View>

          <View style={dynamicStyles.section}>
            <View style={dynamicStyles.switchContainer}>
              <View style={dynamicStyles.switchLabel}>
                <Ionicons
                  name={formData.isPrivate ? "lock-closed" : "globe-outline"}
                  size={20}
                  color={
                    formData.isPrivate
                      ? colors.status.warning.main
                      : colors.accents.green.main
                  }
                />
                <Text
                  style={[
                    dynamicStyles.label,
                    { marginBottom: 0, marginLeft: 8 },
                  ]}
                >
                  Private Repository
                </Text>
              </View>
              <Switch
                value={formData.isPrivate}
                onValueChange={(value) =>
                  setFormData({ ...formData, isPrivate: value })
                }
                trackColor={{
                  false: colors.border.secondary,
                  true: colors.status.warning.main,
                }}
                thumbColor={colors.surface.primary}
              />
            </View>
            <Text style={dynamicStyles.helperText}>
              {formData.isPrivate
                ? "Only you can see this repository"
                : "Anyone can see this repository"}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};
