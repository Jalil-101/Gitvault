import { ContributionCalendar } from "@/components/profile/contribution/ContributionCalendar";
import { ContributionHeader } from "@/components/profile/contribution/ContributionHeader";
import { ContributionStats } from "@/components/profile/contribution/ContributionStats";
import { MonthNavigation } from "@/components/profile/contribution/MonthNavigation";
import { SelectedDayInfo } from "@/components/profile/contribution/SelectedDayInfo";
import { useModernTheme } from "@/context/ThemeContext";
import {
  generateContributionData,
  getContributionStats,
  groupContributionsByMonth,
} from "@/utils/contributions/contributionData";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Text, View } from "react-native";
import {
  ContributionDay,
  ContributionGraphProps,
} from "../../types/contribution";

export interface ContributionGraphRef {
  refresh: () => Promise<void>;
}

export const ContributionGraph = forwardRef<
  ContributionGraphRef,
  ContributionGraphProps
>((props, ref) => {
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
  const [refreshing, setRefreshing] = useState(false);

  const loadContributionData = async () => {
    try {
      setLoading(true);
      console.log("🔄 Refreshing contribution data...");

      // Load contribution data
      const contributionData = await generateContributionData();
      setContributions(contributionData);

      // If no contribution data, set empty stats for new users
      if (contributionData.length === 0) {
        setStats({
          totalContributions: 0,
          currentStreak: 0,
          longestStreak: 0,
        });
        setLoading(false);
        return;
      }

      // Load stats
      const contributionStats = await getContributionStats();
      setStats({
        totalContributions: contributionStats.totalContributions,
        currentStreak: contributionStats.currentStreak,
        longestStreak: contributionStats.longestStreak,
      });

      console.log("✅ Contribution data refreshed successfully");
    } catch (error) {
      console.log("Could not load contribution data");
    } finally {
      setLoading(false);
    }
  };

  // Expose refresh method to parent component
  useImperativeHandle(ref, () => ({
    refresh: async () => {
      setRefreshing(true);
      console.log("🔄 Manual refresh triggered...");
      await loadContributionData();
      setRefreshing(false);
    },
  }));

  useEffect(() => {
    loadContributionData();
  }, []);

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
    console.log("📅 Previous month pressed, current index:", currentMonthIndex);
    // Allow navigation to previous months
    setCurrentMonthIndex(Math.max(0, currentMonthIndex - 1));
  };

  const handleNextMonth = () => {
    console.log(
      "📅 Next month pressed, current index:",
      currentMonthIndex,
      "total months:",
      monthlyContributions.length
    );
    setCurrentMonthIndex(
      Math.min(monthlyContributions.length - 1, currentMonthIndex + 1)
    );
  };

  if (loading) {
    return (
      <View className="mb-6">
        <View
          className="mx-5 p-5 rounded-2xl items-center justify-center"
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

  // Show message for new users with no contribution data
  if (contributions.length === 0) {
    return (
      <View className="mb-6">
        <View
          className="mx-5 p-5 rounded-2xl items-center justify-center"
          style={{
            backgroundColor: colors.surface.secondary,
            borderWidth: 1,
            borderColor: "#22C55E20",
            ...shadows.sm,
            height: 200,
          }}
        >
          <Text style={{ color: colors.text.secondary, textAlign: "center" }}>
            No contribution data yet{"\n"}
            <Text style={{ color: colors.text.tertiary, fontSize: 14 }}>
              Create your first repository to start building your contribution
              graph
            </Text>
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
        refreshing={refreshing}
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
});
