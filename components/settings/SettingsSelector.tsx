// components/settings/SettingsSelector.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useModernThemeColor } from "@/hooks/useThemeColor";

interface SelectorOption {
  label: string;
  value: string;
}

interface SettingsSelectorProps {
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBackground?: string;
  title: string;
  subtitle?: string;
  options: SelectorOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  isLast?: boolean;
}

export const SettingsSelector: React.FC<SettingsSelectorProps> = ({
  icon,
  iconColor,
  iconBackground,
  title,
  subtitle,
  options,
  selectedValue,
  onValueChange,
  isLast = false,
}) => {
  const { colors } = useModernThemeColor();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  const renderOption = ({ item }: { item: SelectorOption }) => (
    <TouchableOpacity
      onPress={() => {
        onValueChange(item.value);
        setIsModalVisible(false);
      }}
      className="p-4 border-b border-modern-dark-border-primary"
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-base text-modern-dark-text-primary">
          {item.label}
        </Text>
        {selectedValue === item.value && (
          <Ionicons
            name="checkmark"
            size={20}
            color={colors.accents.green.main}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <View
          className={`flex-row items-center p-4 ${
            !isLast ? "border-b border-modern-dark-border-primary" : ""
          }`}
        >
          {icon && (
            <View
              className="w-8 h-8 rounded-lg items-center justify-center mr-3"
              style={{
                backgroundColor: iconBackground || colors.accents.blue.main,
              }}
            >
              <Ionicons
                name={icon}
                size={18}
                color={iconColor || colors.text.inverse}
              />
            </View>
          )}

          <View className="flex-1">
            <Text className="text-base font-medium text-modern-dark-text-primary">
              {title}
            </Text>
            {subtitle && (
              <Text className="text-sm text-modern-dark-text-tertiary mt-1">
                {subtitle}
              </Text>
            )}
          </View>

          <View className="flex-row items-center">
            <Text className="text-sm text-modern-dark-text-tertiary mr-2">
              {selectedOption?.label}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.text.quaternary}
            />
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View className="flex-1 bg-modern-dark-bg-primary">
          <View className="flex-row items-center justify-between p-4 border-b border-modern-dark-border-primary">
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text className="text-base text-modern-dark-interactive-primary">
                Cancel
              </Text>
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-modern-dark-text-primary">
              {title}
            </Text>
            <View style={{ width: 50 }} />
          </View>

          <FlatList
            data={options}
            renderItem={renderOption}
            keyExtractor={(item) => item.value}
            className="bg-modern-dark-surface-secondary mx-4 mt-4 rounded-2xl"
          />
        </View>
      </Modal>
    </>
  );
};
