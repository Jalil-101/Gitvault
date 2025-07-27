// components/repository/AddFileModal.tsx
import { GRADIENTS } from "@/constants/Colors";
import { useModernTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AddFileModalProps {
  visible: boolean;
  repositoryId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddFileModal: React.FC<AddFileModalProps> = ({
  visible,
  repositoryId,
  onClose,
  onSuccess,
}) => {
  const { colors, shadows, glass, isDarkTheme } = useModernTheme();
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<"upload" | "create">(
    "upload"
  );

  const styles = createThemedStyles(colors, shadows, glass, isDarkTheme);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        setSelectedFile(file);
        setFileName(file.name);
        setFilePath(file.name); // Default to file name as path
        setUploadMethod("upload");
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Failed to pick document");
    }
  };

  const handleCreateFile = () => {
    setSelectedFile(null);
    setUploadMethod("create");
  };

  const handleUpload = async () => {
    if (!fileName.trim()) {
      Alert.alert("Error", "Please enter a file name");
      return;
    }

    if (uploadMethod === "upload" && !selectedFile) {
      Alert.alert("Error", "Please select a file to upload");
      return;
    }

    if (uploadMethod === "create" && !fileContent.trim()) {
      Alert.alert("Error", "Please enter file content");
      return;
    }

    setIsUploading(true);
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      if (uploadMethod === "upload" && selectedFile) {
        // Upload existing file
        const formData = new FormData();
        formData.append("file", {
          uri: selectedFile.uri,
          type: selectedFile.mimeType || "application/octet-stream",
          name: selectedFile.name,
        } as any);
        formData.append("filePath", filePath || fileName);

        const response = await fetch(
          `https://vault-backend-susi.onrender.com/api/git/repositories/${repositoryId}/files`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
            body: formData,
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Upload failed: ${response.status} - ${errorText}`);
        }
      } else {
        // Create new file with content
        const response = await fetch(
          `https://vault-backend-susi.onrender.com/api/git/repositories/${repositoryId}/files`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fileName: fileName,
              filePath: filePath || fileName,
              content: fileContent,
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Create failed: ${response.status} - ${errorText}`);
        }
      }

      Alert.alert("Success", "File added successfully!");
      onSuccess();
      handleClose();
    } catch (error) {
      console.error("File upload error:", error);
      Alert.alert(
        "Error",
        `Failed to add file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setFileName("");
    setFilePath("");
    setFileContent("");
    setSelectedFile(null);
    setUploadMethod("upload");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={GRADIENTS.light.background}
          style={StyleSheet.absoluteFillObject}
        />

        <SafeAreaView style={styles.safeArea}>
          <BlurView
            intensity={80}
            tint={isDarkTheme ? "dark" : "light"}
            style={styles.header}
          >
            <TouchableOpacity onPress={handleClose} style={styles.headerButton}>
              <Ionicons name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add File</Text>
            <TouchableOpacity
              onPress={handleUpload}
              disabled={isUploading}
              style={styles.headerButton}
            >
              {isUploading ? (
                <ActivityIndicator
                  size="small"
                  color={colors.interactive.primary}
                />
              ) : (
                <Text
                  style={[
                    styles.saveButton,
                    { color: colors.interactive.primary },
                  ]}
                >
                  Save
                </Text>
              )}
            </TouchableOpacity>
          </BlurView>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Upload Method Selection */}
            <View style={[styles.card, styles.methodCard]}>
              <Text style={styles.sectionTitle}>Upload Method</Text>
              <View style={styles.methodButtons}>
                <TouchableOpacity
                  style={[
                    styles.methodButton,
                    uploadMethod === "upload" && styles.activeMethodButton,
                  ]}
                  onPress={() => setUploadMethod("upload")}
                >
                  <Ionicons
                    name="cloud-upload"
                    size={20}
                    color={
                      uploadMethod === "upload"
                        ? colors.text.inverse
                        : colors.text.secondary
                    }
                  />
                  <Text
                    style={[
                      styles.methodButtonText,
                      uploadMethod === "upload" &&
                        styles.activeMethodButtonText,
                    ]}
                  >
                    Upload File
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.methodButton,
                    uploadMethod === "create" && styles.activeMethodButton,
                  ]}
                  onPress={() => setUploadMethod("create")}
                >
                  <Ionicons
                    name="create"
                    size={20}
                    color={
                      uploadMethod === "create"
                        ? colors.text.inverse
                        : colors.text.secondary
                    }
                  />
                  <Text
                    style={[
                      styles.methodButtonText,
                      uploadMethod === "create" &&
                        styles.activeMethodButtonText,
                    ]}
                  >
                    Create File
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* File Upload Section */}
            {uploadMethod === "upload" && (
              <View style={[styles.card, styles.uploadCard]}>
                <Text style={styles.sectionTitle}>Upload File</Text>

                <TouchableOpacity
                  style={styles.filePickerButton}
                  onPress={handlePickDocument}
                >
                  <LinearGradient
                    colors={GRADIENTS.light.primary}
                    style={styles.filePickerGradient}
                  >
                    <Ionicons
                      name="cloud-upload"
                      size={24}
                      color={colors.text.inverse}
                    />
                    <Text style={styles.filePickerText}>Select File</Text>
                  </LinearGradient>
                </TouchableOpacity>

                {selectedFile && (
                  <View style={styles.selectedFileInfo}>
                    <Ionicons
                      name="document"
                      size={20}
                      color={colors.text.secondary}
                    />
                    <Text style={styles.selectedFileName}>
                      {selectedFile.name}
                    </Text>
                    <Text style={styles.selectedFileSize}>
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* File Creation Section */}
            {uploadMethod === "create" && (
              <View style={[styles.card, styles.createCard]}>
                <Text style={styles.sectionTitle}>Create New File</Text>

                <TextInput
                  style={styles.textInput}
                  placeholder="Enter file content..."
                  placeholderTextColor={colors.text.quaternary}
                  value={fileContent}
                  onChangeText={setFileContent}
                  multiline
                  numberOfLines={8}
                  textAlignVertical="top"
                />
              </View>
            )}

            {/* File Details */}
            <View style={[styles.card, styles.detailsCard]}>
              <Text style={styles.sectionTitle}>File Details</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>File Name</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter file name (e.g., README.md)"
                  placeholderTextColor={colors.text.quaternary}
                  value={fileName}
                  onChangeText={setFileName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>File Path (Optional)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter file path (e.g., docs/README.md)"
                  placeholderTextColor={colors.text.quaternary}
                  value={filePath}
                  onChangeText={setFilePath}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const createThemedStyles = (
  colors: any,
  shadows: any,
  glass: any,
  isDarkTheme: boolean
) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.glass,
    },
    headerButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.interactive.ghost,
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text.primary,
    },
    saveButton: {
      fontSize: 16,
      fontWeight: "600",
    },
    content: {
      flex: 1,
    },
    card: {
      backgroundColor: colors.surface.primary,
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 16,
      padding: 20,
      ...shadows.md,
      borderWidth: 1,
      borderColor: colors.border.primary,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text.primary,
      marginBottom: 16,
    },
    methodCard: {
      marginTop: 8,
    },
    methodButtons: {
      flexDirection: "row",
      gap: 12,
    },
    methodButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: colors.surface.secondary,
      borderWidth: 1,
      borderColor: colors.border.secondary,
    },
    activeMethodButton: {
      backgroundColor: colors.interactive.primary,
      borderColor: colors.interactive.primary,
    },
    methodButtonText: {
      marginLeft: 8,
      fontSize: 14,
      fontWeight: "500",
      color: colors.text.secondary,
    },
    activeMethodButtonText: {
      color: colors.text.inverse,
    },
    uploadCard: {},
    filePickerButton: {
      borderRadius: 12,
      overflow: "hidden",
    },
    filePickerGradient: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      paddingHorizontal: 20,
    },
    filePickerText: {
      marginLeft: 8,
      fontSize: 16,
      fontWeight: "600",
      color: colors.text.inverse,
    },
    selectedFileInfo: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 16,
      padding: 12,
      backgroundColor: colors.surface.secondary,
      borderRadius: 8,
    },
    selectedFileName: {
      flex: 1,
      marginLeft: 8,
      fontSize: 14,
      color: colors.text.primary,
      fontWeight: "500",
    },
    selectedFileSize: {
      fontSize: 12,
      color: colors.text.tertiary,
    },
    createCard: {},
    detailsCard: {},
    inputGroup: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.text.primary,
      marginBottom: 8,
    },
    textInput: {
      backgroundColor: colors.surface.secondary,
      borderWidth: 1,
      borderColor: colors.border.secondary,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      color: colors.text.primary,
    },
  });
