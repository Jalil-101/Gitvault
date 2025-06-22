import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useModernTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
// components/notifications/EmptyNotifications.tsx
interface EmptyNotificationsProps {
  message?: string;
  onRefresh?: () => void;
}

export const EmptyNotifications: React.FC<EmptyNotificationsProps> = ({
  message = "No notifications yet",
  onRefresh,
}) => {
  const { colors, isDarkTheme } = useModernTheme();

  return (
    <View className="flex-1 items-center justify-center px-8">
      <View
        className={`w-20 h-20 rounded-full items-center justify-center mb-6 ${
          isDarkTheme
            ? "bg-modern-dark-surface-secondary"
            : "bg-modern-light-surface-secondary"
        }`}
      >
        <Ionicons
          name="notifications-outline"
          size={40}
          color={isDarkTheme ? colors.text.tertiary : colors.text.tertiary}
        />
      </View>

      <Text
        className={`text-xl font-semibold mb-2 text-center ${
          isDarkTheme
            ? "text-modern-dark-text-primary"
            : "text-modern-light-text-primary"
        }`}
      >
        All caught up!
      </Text>

      <Text
        className={`text-base text-center mb-6 ${
          isDarkTheme
            ? "text-modern-dark-text-secondary"
            : "text-modern-light-text-secondary"
        }`}
      >
        {message}
      </Text>

      {onRefresh && (
        <TouchableOpacity
          onPress={onRefresh}
          className={`px-6 py-3 rounded-modern ${
            isDarkTheme
              ? "bg-modern-dark-interactive-primary"
              : "bg-modern-light-interactive-primary"
          }`}
        >
          <Text className="text-white font-medium">Check for updates</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
