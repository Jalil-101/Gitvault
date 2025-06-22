// components/explore/MonthNavigation.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

interface MonthNavigationProps {
  currentMonthIndex: number;
  totalMonths: number;
  monthName: string;
  year: number;
  onPrevious: () => void;
  onNext: () => void;
  colors: any;
  shadows: any;
}

export const MonthNavigation: React.FC<MonthNavigationProps> = ({
  currentMonthIndex,
  totalMonths,
  monthName,
  year,
  onPrevious,
  onNext,
  colors,
  shadows,
}) => {
  const isPreviousDisabled = currentMonthIndex === 0;
  const isNextDisabled = currentMonthIndex === totalMonths - 1;

  return (
    <View className="flex-row items-center justify-between px-5 mb-5">
      <TouchableOpacity
        onPress={onPrevious}
        disabled={isPreviousDisabled}
        className="flex-row items-center p-3 rounded-xl"
        style={{
          backgroundColor: isPreviousDisabled
            ? colors.surface.tertiary
            : colors.surface.secondary,
          borderWidth: 1,
          borderColor: isPreviousDisabled
            ? `${colors.text.tertiary}20`
            : "#22C55E30",
          ...shadows.sm,
        }}
      >
        <ChevronLeft
          size={16}
          color={isPreviousDisabled ? colors.text.tertiary : "#16A34A"}
        />
        <Text
          className="text-sm font-medium ml-1"
          style={{
            color: isPreviousDisabled
              ? colors.text.tertiary
              : colors.text.primary,
          }}
        >
          Previous
        </Text>
      </TouchableOpacity>

      <View className="flex-1 items-center">
        <Text
          className="text-lg font-bold"
          style={{ color: colors.text.primary }}
        >
          {monthName} {year}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onNext}
        disabled={isNextDisabled}
        className="flex-row items-center p-3 rounded-xl"
        style={{
          backgroundColor: isNextDisabled
            ? colors.surface.tertiary
            : colors.surface.secondary,
          borderWidth: 1,
          borderColor: isNextDisabled
            ? `${colors.text.tertiary}20`
            : "#22C55E30",
          ...shadows.sm,
        }}
      >
        <Text
          className="text-sm font-medium mr-1"
          style={{
            color: isNextDisabled ? colors.text.tertiary : colors.text.primary,
          }}
        >
          Next
        </Text>
        <ChevronRight
          size={16}
          color={isNextDisabled ? colors.text.tertiary : "#16A34A"}
        />
      </TouchableOpacity>
    </View>
  );
};
