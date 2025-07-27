// components/RepositoryOptionsModal.tsx
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Repository } from "../types/repository";
import { useModernTheme } from "@/context/ThemeContext";

interface RepositoryOptionsModalProps {
  visible: boolean;
  repository: Repository | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onViewFiles: () => void;
}

export const RepositoryOptionsModal: React.FC<RepositoryOptionsModalProps> = ({
  visible,
  repository,
  onClose,
  onEdit,
  onDelete,
  onViewFiles,
}) => {
  const { colors, shadows } = useModernTheme();

  const handleDelete = () => {
    Alert.alert(
      "Delete Repository",
      `Are you sure you want to delete "${repository?.name}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: onDelete },
      ]
    );
  };

  const dynamicStyles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
    },
    modal: {
      backgroundColor: colors.surface.primary,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 34,
      ...shadows.lg,
    },
    header: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primary,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text.primary,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    optionText: {
      fontSize: 16,
      color: colors.text.primary,
      marginLeft: 12,
    },
    deleteOption: {
      borderTopWidth: 1,
      borderTopColor: colors.border.primary,
    },
    deleteText: {
      color: colors.status.error.main,
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={dynamicStyles.overlay} onPress={onClose}>
        <View style={dynamicStyles.modal}>
          <View style={dynamicStyles.header}>
            <Text style={dynamicStyles.title} numberOfLines={1}>
              {repository?.name}
            </Text>
          </View>

          <TouchableOpacity style={dynamicStyles.option} onPress={onViewFiles}>
            <Ionicons
              name="folder-outline"
              size={20}
              color={colors.accents.green.main}
            />
            <Text style={dynamicStyles.optionText}>View Files</Text>
          </TouchableOpacity>

          <TouchableOpacity style={dynamicStyles.option} onPress={onEdit}>
            <Ionicons
              name="create-outline"
              size={20}
              color={colors.interactive.primary}
            />
            <Text style={dynamicStyles.optionText}>Edit Repository</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[dynamicStyles.option, dynamicStyles.deleteOption]}
            onPress={handleDelete}
          >
            <Ionicons
              name="trash-outline"
              size={20}
              color={colors.status.error.main}
            />
            <Text style={[dynamicStyles.optionText, dynamicStyles.deleteText]}>
              Delete Repository
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
