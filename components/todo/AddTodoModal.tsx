// components/todo/AddTodoModal.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { Todo } from "@/types/todo";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Platform,
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
  const [tempDateTime, setTempDateTime] = useState(new Date());
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");

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
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setNewTodo({
      title: "",
      description: "",
      priority: "medium",
      deadline: undefined,
      completed: false,
    });
    setShowDatePicker(false);
    setShowTimePicker(false);
    setTempDateTime(new Date());
    setPickerMode("date");
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (date) {
      // Create a new date with the selected date and set a default time (9:00 AM)
      const newDateTime = new Date(date);
      newDateTime.setHours(9); // Default to 9:00 AM
      newDateTime.setMinutes(0);
      newDateTime.setSeconds(0);
      newDateTime.setMilliseconds(0);

      setTempDateTime(newDateTime);
    }
  };

  const handleTimeChange = (event: any, time?: Date) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false);
    }

    if (time) {
      // Combine the temp date with the selected time
      const finalDateTime = new Date(tempDateTime);
      finalDateTime.setHours(time.getHours());
      finalDateTime.setMinutes(time.getMinutes());
      finalDateTime.setSeconds(0);
      finalDateTime.setMilliseconds(0);

      setTempDateTime(finalDateTime);
    }
  };

  const handleDateTimePickerChange = (event: any, selectedValue?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
      setShowTimePicker(false);
    }

    if (selectedValue) {
      if (pickerMode === "date") {
        // Handle date selection - set default time to 9:00 AM
        const newDateTime = new Date(selectedValue);
        newDateTime.setHours(9); // Default to 9:00 AM
        newDateTime.setMinutes(0);
        newDateTime.setSeconds(0);
        newDateTime.setMilliseconds(0);

        setTempDateTime(newDateTime);
      } else {
        // Handle time selection
        const finalDateTime = new Date(tempDateTime);
        finalDateTime.setHours(selectedValue.getHours());
        finalDateTime.setMinutes(selectedValue.getMinutes());
        finalDateTime.setSeconds(0);
        finalDateTime.setMilliseconds(0);

        setTempDateTime(finalDateTime);
      }
    }
  };

  const handleDatePickerDismiss = () => {
    setShowDatePicker(false);
    if (Platform.OS === "ios") {
      // On iOS, show time picker after date is confirmed
      setPickerMode("time");
      setShowTimePicker(true);
    } else {
      // On Android, set the deadline immediately
      setNewTodo({ ...newTodo, deadline: tempDateTime });
    }
  };

  const handleTimePickerDismiss = () => {
    setShowTimePicker(false);
    setPickerMode("date");
    // Set the final deadline
    setNewTodo({ ...newTodo, deadline: tempDateTime });
  };

  const handleDatePickerCancel = () => {
    setShowDatePicker(false);
    setPickerMode("date");
  };

  const handleTimePickerCancel = () => {
    setShowTimePicker(false);
    setPickerMode("date");
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

  const openDateTimePicker = () => {
    setPickerMode("date");
    setShowDatePicker(true);
    setShowTimePicker(false);
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
              onPress={openDateTimePicker}
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
                You'll receive reminders 24 hours before the deadline and on the
                due date.
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

        {/* Date Picker with Dismiss Buttons */}
        {showDatePicker && (
          <View
            style={{
              backgroundColor: colors.surface.primary,
              borderTopWidth: 1,
              borderTopColor: colors.border.primary,
              padding: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: colors.text.primary,
                }}
              >
                Select Date
              </Text>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <TouchableOpacity onPress={handleDatePickerCancel}>
                  <Text
                    style={{
                      color: colors.text.secondary,
                      fontSize: 16,
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDatePickerDismiss}>
                  <Text
                    style={{
                      color: colors.interactive.primary,
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <DateTimePicker
              value={tempDateTime}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateTimePickerChange}
              minimumDate={new Date()}
            />
          </View>
        )}

        {/* Time Picker with Dismiss Buttons */}
        {showTimePicker && (
          <View
            style={{
              backgroundColor: colors.surface.primary,
              borderTopWidth: 1,
              borderTopColor: colors.border.primary,
              padding: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: colors.text.primary,
                }}
              >
                Select Time
              </Text>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <TouchableOpacity onPress={handleTimePickerCancel}>
                  <Text
                    style={{
                      color: colors.text.secondary,
                      fontSize: 16,
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleTimePickerDismiss}>
                  <Text
                    style={{
                      color: colors.interactive.primary,
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <DateTimePicker
              value={tempDateTime}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateTimePickerChange}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default AddTodoModal;
