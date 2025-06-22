import React, { useState } from "react";
import { View } from "react-native";
import { useModernTheme } from "@/context/ThemeContext";
import {
  ContributionGraphProps,
  ContributionDay,
} from "../../types/contribution";
import {
  generateMockContributions,
  groupContributionsByMonth,
} from "@/utils/contributions/contributionData";
import { ContributionHeader } from "@/components/profile/contribution/ContributionHeader";
import { ContributionStats } from "@/components/profile/contribution/ContributionStats";
import { MonthNavigation } from "@/components/profile/contribution/MonthNavigation";
import { ContributionCalendar } from "@/components/profile/contribution/ContributionCalendar";
import { SelectedDayInfo } from "@/components/profile/contribution/SelectedDayInfo";

const mockContributions = generateMockContributions();

export const ContributionGraph: React.FC<ContributionGraphProps> = ({
  contributions = mockContributions,
  totalContributions = 1247,
  currentStreak = 12,
  longestStreak = 87,
}) => {
  const { colors, shadows } = useModernTheme();
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(11); // Start with current month

  const monthlyContributions = groupContributionsByMonth(contributions);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = monthlyContributions[currentMonthIndex] || [];
  const currentDate =
    currentMonth.length > 0 ? new Date(currentMonth[0].date) : new Date();
  const monthName = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const handlePreviousMonth = () => {
    setCurrentMonthIndex(Math.max(0, currentMonthIndex - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex(
      Math.min(monthlyContributions.length - 1, currentMonthIndex + 1)
    );
  };

  return (
    <View className="mb-6">
      <ContributionHeader
        totalContributions={totalContributions}
        colors={colors}
        shadows={shadows}
      />

      <ContributionStats
        currentStreak={currentStreak}
        longestStreak={longestStreak}
        colors={colors}
        shadows={shadows}
      />

      <MonthNavigation
        currentMonthIndex={currentMonthIndex}
        totalMonths={monthlyContributions.length}
        monthName={monthName}
        year={year}
        onPrevious={handlePreviousMonth}
        onNext={handleNextMonth}
        colors={colors}
        shadows={shadows}
      />

      <ContributionCalendar
        monthContributions={currentMonth}
        onDayPress={setSelectedDay}
        colors={colors}
        shadows={shadows}
      />

      {selectedDay && (
        <SelectedDayInfo
          selectedDay={selectedDay}
          colors={colors}
          shadows={shadows}
        />
      )}
    </View>
  );
};
