// components/explore/ContributionCalendar.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ContributionDay } from "@/types/contribution";
import {
  getContributionLevelColor,
  getContributionLevelBorderColor,
} from "@/utils/contributions/contributionColor";

interface ContributionCalendarProps {
  monthContributions: ContributionDay[];
  onDayPress: (day: ContributionDay) => void;
  colors: any;
  shadows: any;
}

export const ContributionCalendar: React.FC<ContributionCalendarProps> = ({
  monthContributions,
  onDayPress,
  colors,
  shadows,
}) => {
  const createMonthGrid = (monthContributions: ContributionDay[]) => {
    if (monthContributions.length === 0) return [];

    const firstDay = new Date(monthContributions[0].date);

    // Get first day of month and its day of week
    const firstDayOfMonth = new Date(
      firstDay.getFullYear(),
      firstDay.getMonth(),
      1
    );
    const startDayOfWeek = firstDayOfMonth.getDay();

    // Get last day of month
    const lastDayOfMonth = new Date(
      firstDay.getFullYear(),
      firstDay.getMonth() + 1,
      0
    );

    const grid: (ContributionDay | null)[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startDayOfWeek; i++) {
      grid.push(null);
    }

    // Add month contributions
    const contributionMap = new Map(
      monthContributions.map((day) => [day.date, day])
    );

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const dateStr = `${firstDay.getFullYear()}-${String(
        firstDay.getMonth() + 1
      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const contribution = contributionMap.get(dateStr);

      if (contribution) {
        grid.push(contribution);
      } else {
        grid.push({
          date: dateStr,
          count: 0,
          level: 0,
        });
      }
    }

    return grid;
  };

  const monthGrid = createMonthGrid(monthContributions);
  const weeks: (ContributionDay | null)[][] = [];

  // Group into weeks
  for (let i = 0; i < monthGrid.length; i += 7) {
    weeks.push(monthGrid.slice(i, i + 7));
  }

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <View
      className="mx-5 p-5 rounded-2xl"
      style={{
        backgroundColor: colors.surface.secondary,
        borderWidth: 1,
        borderColor: "#22C55E20",
        ...shadows.sm,
      }}
    >
      <LinearGradient
        colors={["#22C55E05", "#16A34A05"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-2xl"
      />

      {/* Day Labels */}
      <View className="flex-row justify-between mb-3">
        {dayLabels.map((day) => (
          <Text
            key={day}
            className="text-xs font-semibold text-center"
            style={{
              color: colors.text.secondary,
              width: 36,
            }}
          >
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <View>
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} className="flex-row justify-between mb-2">
            {week.map((day, dayIndex) => (
              <TouchableOpacity
                key={`${weekIndex}-${dayIndex}`}
                onPress={() => day && onDayPress(day)}
                className="rounded-lg items-center justify-center"
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: day
                    ? getContributionLevelColor(day.level, colors.text.tertiary)
                    : "transparent",
                  borderWidth: day ? 1.5 : 0,
                  borderColor: day
                    ? getContributionLevelBorderColor(
                        day.level,
                        colors.text.tertiary
                      )
                    : "transparent",
                }}
              >
                {day && (
                  <Text
                    className="text-xs font-semibold"
                    style={{
                      color: day.level > 0 ? "#FFFFFF" : colors.text.tertiary,
                    }}
                  >
                    {new Date(day.date).getDate()}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Legend */}
      <View
        className="flex-row items-center justify-center mt-4 pt-4"
        style={{
          borderTopWidth: 1,
          borderTopColor: `${colors.text.tertiary}20`,
        }}
      >
        <Text
          className="text-xs font-medium mr-3"
          style={{ color: colors.text.tertiary }}
        >
          Less
        </Text>
        <View className="flex-row items-center">
          {[0, 1, 2, 3, 4].map((level) => (
            <View
              key={level}
              className="rounded-md mx-1"
              style={{
                width: 16,
                height: 16,
                backgroundColor: getContributionLevelColor(
                  level,
                  colors.text.tertiary
                ),
                borderWidth: 1,
                borderColor: getContributionLevelBorderColor(
                  level,
                  colors.text.tertiary
                ),
              }}
            />
          ))}
        </View>
        <Text
          className="text-xs font-medium ml-3"
          style={{ color: colors.text.tertiary }}
        >
          More
        </Text>
      </View>
    </View>
  );
};
