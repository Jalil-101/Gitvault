import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  RefreshControl,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for notifications
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const statsData = [
    {
      label: "Repositories",
      value: "47",
      icon: "folder-outline",
      color: "#6366F1",
      gradient: ["#6366F1", "#8B5CF6"],
    },
    {
      label: "Commits",
      value: "1.2k",
      icon: "git-commit-outline",
      color: "#10B981",
      gradient: ["#10B981", "#06D6A0"],
    },
    {
      label: "Issues",
      value: "23",
      icon: "alert-circle-outline",
      color: "#F59E0B",
      gradient: ["#F59E0B", "#F97316"],
    },
    {
      label: "Stars",
      value: "456",
      icon: "star-outline",
      color: "#EF4444",
      gradient: ["#EF4444", "#F97316"],
    },
  ];

  const activityData = [
    {
      id: 1,
      user: "alex_dev",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      action: "merged pull request #142",
      repo: "next-gen-ui",
      time: "2h",
      type: "merge",
      color: "#8B5CF6",
    },
    {
      id: 2,
      user: "sarah_code",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
      action: "released v2.1.0",
      repo: "design-system",
      time: "4h",
      type: "release",
      color: "#10B981",
    },
    {
      id: 3,
      user: "mike_ui",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      action: "opened issue #89",
      repo: "mobile-components",
      time: "6h",
      type: "issue",
      color: "#F59E0B",
    },
  ];

  const trendingRepos = [
    {
      name: "neural-networks/transformer",
      description: "State-of-the-art transformer architecture implementation",
      language: "Python",
      stars: "12.8k",
      trend: "+2.3k",
      languageColor: "#3776AB",
      isHot: true,
    },
    {
      name: "web3/defi-protocol",
      description: "Decentralized finance protocol with yield farming",
      language: "Solidity",
      stars: "8.4k",
      trend: "+1.8k",
      languageColor: "#363636",
      isHot: false,
    },
  ];

  const StatCard = ({ item, index }) => (
    <Animated.View
      style={[
        styles.statCard,
        {
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          opacity: fadeAnim,
        },
      ]}
    >
      <LinearGradient
        colors={item.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statGradient}
      >
        <View style={styles.statIconContainer}>
          <Ionicons name={item.icon} size={24} color="white" />
        </View>
        <Text style={styles.statValue}>{item.value}</Text>
        <Text style={styles.statLabel}>{item.label}</Text>
      </LinearGradient>
    </Animated.View>
  );

  const ActivityCard = ({ item }) => (
    <TouchableOpacity style={styles.activityCard} activeOpacity={0.8}>
      <View style={styles.activityLeft}>
        <Image source={{ uri: item.avatar }} style={styles.activityAvatar} />
        <View
          style={[styles.activityIndicator, { backgroundColor: item.color }]}
        />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityText}>
          <Text style={styles.activityUser}>{item.user}</Text> {item.action}
        </Text>
        <Text style={styles.activityRepo}>{item.repo}</Text>
        <Text style={styles.activityTime}>{item.time} ago</Text>
      </View>
    </TouchableOpacity>
  );

  const TrendingCard = ({ repo }) => (
    <TouchableOpacity style={styles.trendingCard} activeOpacity={0.8}>
      <LinearGradient
        colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
        style={styles.trendingGradient}
      >
        <View style={styles.trendingHeader}>
          <Text style={styles.trendingName}>{repo.name}</Text>
          {repo.isHot && (
            <View style={styles.hotBadge}>
              <Ionicons name="flame" size={12} color="#FF4444" />
              <Text style={styles.hotText}>HOT</Text>
            </View>
          )}
        </View>
        <Text style={styles.trendingDescription}>{repo.description}</Text>
        <View style={styles.trendingStats}>
          <View style={styles.languageInfo}>
            <View
              style={[
                styles.languageDot,
                { backgroundColor: repo.languageColor },
              ]}
            />
            <Text style={styles.languageText}>{repo.language}</Text>
          </View>
          <View style={styles.starInfo}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.starCount}>{repo.stars}</Text>
            <Text style={styles.trendCount}>{repo.trend}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Animated Background */}
      <LinearGradient
        colors={["#0F0F23", "#1A1A2E", "#16213E"]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Glassmorphic Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View style={styles.headerLeft}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
                    }}
                    style={styles.userAvatar}
                  />
                  <View style={styles.onlineIndicator} />
                </View>
                <View>
                  <Text style={styles.greeting}>Good evening</Text>
                  <Text style={styles.username}>@developer</Text>
                </View>
              </View>
              <View style={styles.headerRight}>
                <TouchableOpacity style={styles.notificationButton}>
                  <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                    <Ionicons name="notifications" size={24} color="#FFFFFF" />
                    <View style={styles.notificationDot} />
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FFFFFF"
              colors={["#6366F1"]}
              progressBackgroundColor="rgba(255,255,255,0.1)"
            />
          }
        >
          {/* Stats Grid */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <View style={styles.statsGrid}>
              {statsData.map((item, index) => (
                <StatCard key={index} item={item} index={index} />
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsContainer}>
              <TouchableOpacity style={styles.primaryAction}>
                <LinearGradient
                  colors={["#6366F1", "#8B5CF6"]}
                  style={styles.primaryActionGradient}
                >
                  <Ionicons name="add" size={24} color="white" />
                  <Text style={styles.primaryActionText}>New Repository</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.secondaryActions}>
                {[
                  { icon: "search", label: "Search", color: "#10B981" },
                  { icon: "git-pull-request", label: "PRs", color: "#F59E0B" },
                  { icon: "alert-circle", label: "Issues", color: "#EF4444" },
                ].map((action, index) => (
                  <TouchableOpacity key={index} style={styles.secondaryAction}>
                    <View
                      style={[
                        styles.secondaryActionIcon,
                        { backgroundColor: action.color },
                      ]}
                    >
                      <Ionicons name={action.icon} size={20} color="white" />
                    </View>
                    <Text style={styles.secondaryActionText}>
                      {action.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Activity Feed */}
          <View style={styles.activitySection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <TouchableOpacity>
                <Text style={styles.sectionLink}>View all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.activityFeed}>
              {activityData.map((item) => (
                <ActivityCard key={item.id} item={item} />
              ))}
            </View>
          </View>

          {/* Trending */}
          <View style={styles.trendingSection}>
            <Text style={styles.sectionTitle}>🔥 Trending</Text>
            {trendingRepos.map((repo, index) => (
              <TrendingCard key={index} repo={repo} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerGradient: {
    borderRadius: 20,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: "#0F0F23",
  },
  greeting: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 2,
  },
  username: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  headerRight: {
    flexDirection: "row",
  },
  notificationButton: {
    position: "relative",
    padding: 8,
  },
  notificationDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionLink: {
    fontSize: 14,
    color: "#6366F1",
    fontWeight: "600",
  },
  statsSection: {
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    width: (width - 52) / 2,
    height: 120,
  },
  statGradient: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  statIconContainer: {
    alignSelf: "flex-start",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  quickActionsContainer: {
    gap: 16,
  },
  primaryAction: {
    height: 60,
  },
  primaryActionGradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    gap: 12,
  },
  primaryActionText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  secondaryActions: {
    flexDirection: "row",
    gap: 12,
  },
  secondaryAction: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  secondaryActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  secondaryActionText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "600",
  },
  activitySection: {
    marginBottom: 32,
  },
  activityFeed: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  activityCard: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginBottom: 4,
    borderRadius: 16,
    alignItems: "center",
  },
  activityLeft: {
    position: "relative",
    marginRight: 12,
  },
  activityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  activityIndicator: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#0F0F23",
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  activityUser: {
    fontWeight: "700",
    color: "#6366F1",
  },
  activityRepo: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
  },
  trendingSection: {
    marginBottom: 32,
  },
  trendingCard: {
    marginBottom: 16,
  },
  trendingGradient: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  trendingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  trendingName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    flex: 1,
  },
  hotBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,68,68,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  hotText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FF4444",
  },
  trendingDescription: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 16,
    lineHeight: 20,
  },
  trendingStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  languageInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  languageText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
  },
  starInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  starCount: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
  },
  trendCount: {
    fontSize: 12,
    color: "#10B981",
    fontWeight: "600",
  },
});

export default HomeScreen;
