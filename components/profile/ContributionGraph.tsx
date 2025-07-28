import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useModernTheme } from "@/context/ThemeContext";
import {
  ContributionGraphProps,
  ContributionDay,
} from "../../types/contribution";
import {
  generateContributionData,
  getContributionStats,
  groupContributionsByMonth,
} from "@/utils/contributions/contributionData";
import { ContributionHeader } from "@/components/profile/contribution/ContributionHeader";
import { ContributionStats } from "@/components/profile/contribution/ContributionStats";
import { MonthNavigation } from "@/components/profile/contribution/MonthNavigation";
import { ContributionCalendar } from "@/components/profile/contribution/ContributionCalendar";
import { SelectedDayInfo } from "@/components/profile/contribution/SelectedDayInfo";

export const ContributionGraph: React.FC<ContributionGraphProps> = () => {
  const { colors, shadows } = useModernTheme();
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // Start with current month
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [stats, setStats] = useState({
    totalContributions: 0,
    currentStreak: 0,
    longestStreak: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContributionData();
  }, []);

  const loadContributionData = async () => {
    try {
      setLoading(true);
      
      // Load contribution data
      const contributionData = await generateContributionData();
      setContributions(contributionData);
      
      // Load stats
      const contributionStats = await getContributionStats();
      setStats({
        totalContributions: contributionStats.totalContributions,
        currentStreak: contributionStats.currentStreak,
        longestStreak: contributionStats.longestStreak,
      });
    } catch (error) {
      console.error("Error loading contribution data:", error);
    } finally {
      setLoading(false);
    }
  };

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
    // Disabled - no going to previous months
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex(
      Math.min(monthlyContributions.length - 1, currentMonthIndex + 1)
    );
  };

  if (loading) {
    return (
      <View className="mb-6">
        <View className="mx-5 p-5 rounded-2xl items-center justify-center"
          style={{
            backgroundColor: colors.surface.secondary,
            borderWidth: 1,
            borderColor: "#22C55E20",
            ...shadows.sm,
            height: 200,
          }}
        >
          <Text style={{ color: colors.text.secondary }}>
            Loading contribution data...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="mb-6">
      <ContributionHeader
        totalContributions={stats.totalContributions}
        colors={colors}
        shadows={shadows}
      />

      <ContributionStats
        currentStreak={stats.currentStreak}
        longestStreak={stats.longestStreak}
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
