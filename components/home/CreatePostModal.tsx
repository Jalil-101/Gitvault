// CreatePostModal.tsx
import { useModernTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";

type StatusColorKey = "success" | "warning" | "error" | "info";

interface ActivityData {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  colorKey: StatusColorKey;
  avatar?: string;
  user?: string;
}

interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  activityData: ActivityData | null;
  onCreatePost: (postData: {
    activityId: string;
    content: string;
    activityData: ActivityData;
  }) => Promise<void>;
}

export default function CreatePostModal({
  visible,
  onClose,
  activityData,
  onCreatePost,
}: CreatePostModalProps) {
  const { colors } = useModernTheme();
  const [postContent, setPostContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreatePost = async () => {
    if (!activityData || !postContent.trim()) {
      Alert.alert("Error", "Please enter some content for your post");
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreatePost({
        activityId: activityData.id,
        content: postContent.trim(),
        activityData,
      });

      setPostContent("");
      onClose();
      Alert.alert("Success", "Post created successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setPostContent("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View
        className="flex-1"
        style={{ backgroundColor: colors.background.primary }}
      >
        {/* Header */}
        <View
          className="flex-row items-center justify-between p-4 border-b"
          style={{ borderBottomColor: colors.border.secondary }}
        >
          <TouchableOpacity onPress={handleClose}>
            <Text
              className="text-base font-medium"
              style={{ color: colors.interactive.primary }}
            >
              Cancel
            </Text>
          </TouchableOpacity>

          <Text
            className="text-lg font-semibold"
            style={{ color: colors.text.primary }}
          >
            Create Post
          </Text>

          <TouchableOpacity
            onPress={handleCreatePost}
            disabled={!postContent.trim() || isSubmitting}
            style={{
              opacity: !postContent.trim() || isSubmitting ? 0.5 : 1,
            }}
          >
            <Text
              className="text-base font-semibold"
              style={{ color: colors.interactive.primary }}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Activity Reference */}
        {activityData && (
          <View
            className="m-4 p-4 rounded-2xl"
            style={{
              backgroundColor: colors.surface.glass,
              borderWidth: 1,
              borderColor: colors.border.glass,
            }}
          >
            <Text
              className="text-sm font-medium mb-2"
              style={{ color: colors.text.secondary }}
            >
              Posting about:
            </Text>

            <View className="flex-row items-center space-x-3">
              <Image
                source={{ uri: activityData.avatar }}
                className="w-8 h-8 rounded-full"
              />
              <View className="flex-1">
                <Text
                  className="font-semibold text-sm"
                  style={{ color: colors.text.primary }}
                >
                  {activityData.user} {activityData.title}
                </Text>
                <Text
                  className="text-xs"
                  style={{ color: colors.text.tertiary }}
                >
                  {activityData.subtitle} • {activityData.time}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Post Content Input */}
        <View className="flex-1 p-4">
          <TextInput
            className="flex-1 text-base"
            style={{
              color: colors.text.primary,
              textAlignVertical: "top",
            }}
            placeholder="What do you want to say about this activity?"
            placeholderTextColor={colors.text.tertiary}
            multiline
            value={postContent}
            onChangeText={setPostContent}
            maxLength={500}
          />

          <Text
            className="text-xs mt-2 text-right"
            style={{ color: colors.text.tertiary }}
          >
            {postContent.length}/500
          </Text>
        </View>
      </View>
    </Modal>
  );
}
