// components/AddTodoModal.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { Todo } from "@/types/todo";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PrioritySelector from "./PrioritySelector";

interface AddTodoModalProps {
  visible: boolean;
  onClose: () => void;
  onAddTodo: (todo: Omit<Todo, "id" | "createdAt" | "updatedAt">) => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  visible,
  onClose,
  onAddTodo,
}) => {
  const { colors, shadows, glass } = useModernTheme();

  const [newTodo, setNewTodo] = useState<{
    title: string;
    description: string;
    priority: "medium" | "low" | "high";
    deadline?: Date;
    completed: boolean;
  }>({
    title: "",
    description: "",
    priority: "medium",
    deadline: undefined,
    completed: false,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const handleAddTodo = () => {
    if (!newTodo.title.trim()) {
      Alert.alert("Error", "Please enter a todo title");
      return;
    }

    if (newTodo.deadline && newTodo.deadline <= new Date()) {
      Alert.alert("Error", "Deadline must be in the future");
      return;
    }

    onAddTodo(newTodo);
    setNewTodo({
      title: "",
      description: "",
      priority: "medium",
      deadline: undefined,
      completed: false,
    });
    onClose();
  };

  const handleClose = () => {
    setNewTodo({
      title: "",
      description: "",
      priority: "medium",
      deadline: undefined,
      completed: false,
    });
    setShowDatePicker(false);
    setShowTimePicker(false);
    onClose();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTempDate(selectedDate);
      setShowTimePicker(true);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const finalDateTime = new Date(tempDate);
      finalDateTime.setHours(selectedTime.getHours());
      finalDateTime.setMinutes(selectedTime.getMinutes());
      setNewTodo({ ...newTodo, deadline: finalDateTime });
    }
  };

  const formatDeadline = (date: Date) => {
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const removeDeadline = () => {
    setNewTodo({ ...newTodo, deadline: undefined });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return colors.status.error.main;
      case "medium":
        return colors.status.warning.main;
      case "low":
        return colors.status.success.main;
      default:
        return colors.text.tertiary;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background.primary,
        }}
      >
        {/* Modal Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 24,
            borderBottomWidth: 1,
            borderBottomColor: colors.border.primary,
            backgroundColor: colors.surface.primary,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: colors.text.primary,
            }}
          >
            Add Todo
          </Text>
          <TouchableOpacity onPress={handleClose}>
            <Text
              style={{
                color: colors.interactive.primary,
                fontSize: 18,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1, padding: 24 }}>
          {/* Title Input */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: colors.text.primary,
              marginBottom: 8,
            }}
          >
            Title *
          </Text>
          <TextInput
            style={{
              borderColor: colors.border.primary,
              backgroundColor: colors.surface.secondary,
              color: colors.text.primary,
              borderWidth: 1,
              borderRadius: 12,
              padding: 16,
              marginBottom: 20,
              fontSize: 18,
            }}
            placeholder="What needs to be done?"
            placeholderTextColor={colors.text.tertiary}
            value={newTodo.title}
            onChangeText={(text) => setNewTodo({ ...newTodo, title: text })}
          />

          {/* Description Input */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: colors.text.primary,
              marginBottom: 8,
            }}
          >
            Description
          </Text>
          <TextInput
            style={{
              borderColor: colors.border.primary,
              backgroundColor: colors.surface.secondary,
              color: colors.text.primary,
              borderWidth: 1,
              borderRadius: 12,
              padding: 16,
              marginBottom: 20,
              height: 100,
            }}
            placeholder="Add details about this task..."
            placeholderTextColor={colors.text.tertiary}
            value={newTodo.description}
            onChangeText={(text) =>
              setNewTodo({ ...newTodo, description: text })
            }
            multiline
            textAlignVertical="top"
          />

          {/* Priority Selection */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: colors.text.primary,
              marginBottom: 8,
            }}
          >
            Priority
          </Text>
          <PrioritySelector
            selectedPriority={newTodo.priority}
            onPriorityChange={(priority) =>
              setNewTodo({ ...newTodo, priority })
            }
          />

          {/* Deadline Section */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: colors.text.primary,
              marginTop: 20,
              marginBottom: 8,
            }}
          >
            Deadline
          </Text>

          {newTodo.deadline ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: colors.surface.secondary,
                borderWidth: 1,
                borderColor: colors.border.primary,
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color={colors.text.secondary}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{
                    color: colors.text.primary,
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  {formatDeadline(newTodo.deadline)}
                </Text>
              </View>
              <TouchableOpacity onPress={removeDeadline}>
                <Ionicons
                  name="close-circle"
                  size={24}
                  color={colors.status.error.main}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.surface.secondary,
                borderWidth: 1,
                borderColor: colors.border.primary,
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
              }}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons
                name="calendar-outline"
                size={20}
                color={colors.text.secondary}
                style={{ marginRight: 8 }}
              />
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 16,
                }}
              >
                Set deadline (optional)
              </Text>
            </TouchableOpacity>
          )}

          {/* Notification Info */}
          {newTodo.deadline && (
            <View
              style={{
                backgroundColor: colors.accents.blue.light,
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
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
                  name="notifications-outline"
                  size={20}
                  color={colors.accents.blue.main}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{
                    color: colors.accents.blue.main,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Notifications Enabled
                </Text>
              </View>
              <Text
                style={{
                  color: colors.accents.blue.main,
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                You'll receive reminders every 48 hours until the deadline, plus
                a final reminder on the due date.
              </Text>
            </View>
          )}

          {/* Add Button */}
          <TouchableOpacity
            style={{
              backgroundColor: colors.interactive.primary,
              borderRadius: 12,
              padding: 16,
              marginTop: 20,
              ...shadows.md,
            }}
            onPress={handleAddTodo}
          >
            <Text
              style={{
                color: colors.text.inverse,
                textAlign: "center",
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              Create Todo
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}

        {/* Time Picker */}
        {showTimePicker && (
          <DateTimePicker
            value={tempDate}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>
    </Modal>
  );
};

export default AddTodoModal;
