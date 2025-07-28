import { useModernTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// components/notifications/NotificationFilter.tsx
interface NotificationFilterProps {
  filters: Array<{
    key: string;
    label: string;
    count: number;
    icon: string;
  }>;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const NotificationFilter: React.FC<NotificationFilterProps> = ({
  filters,
  activeFilter,
  onFilterChange,
}) => {
  const { colors, isDarkTheme, shadows } = useModernTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.filterContainer,
          {
            backgroundColor: colors.surface.secondary,
            ...shadows.sm,
          },
        ]}
      >
        {filters.map((filter, index) => {
          const isActive = activeFilter === filter.key;

          return (
            <TouchableOpacity
              key={filter.key}
              onPress={() => onFilterChange(filter.key)}
              activeOpacity={0.7}
              style={[
                styles.filterButton,
                {
                  backgroundColor: isActive
                    ? colors.interactive.primary
                    : "transparent",
                  ...(isActive && shadows.md),
                },
              ]}
            >
              {/* Icon */}
              <View style={styles.iconContainer}>
                <Ionicons
                  name={filter.icon as any}
                  size={22}
                  color={isActive ? colors.text.inverse : colors.text.primary}
                  style={{ opacity: isActive ? 1 : 0.7 }}
                />

                {/* Count Badge */}
                {filter.count > 0 && (
                  <View
                    style={[
                      styles.countBadge,
                      {
                        backgroundColor: colors.status.error.main,
                        borderColor: colors.surface.primary,
                      },
                    ]}
                  >
                    <Text style={styles.countText}>
                      {filter.count > 99 ? "99+" : filter.count}
                    </Text>
                  </View>
                )}
              </View>

              {/* Label */}
              <Text
                style={[
                  styles.filterLabel,
                  {
                    color: isActive ? colors.text.inverse : colors.text.primary,
                    opacity: isActive ? 1 : 0.8,
                  },
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: "row",
    padding: 8,
    borderRadius: 16,
    justifyContent: "space-between", // Changed from space-around for better distribution
    gap: 8, // Add gap between items
  },
  filterButton: {
    flex: 1, // Make buttons take equal space
    paddingVertical: 16, // Increased from 12
    paddingHorizontal: 12, // Reduced from 24 to fit better
    borderRadius: 12, // Slightly reduced from 16
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    minHeight: 60, // Set minimum height for better touch targets
  },
  iconContainer: {
    marginBottom: 8, // Increased from 6
    position: "relative",
    alignItems: "center",
  },
  countBadge: {
    position: "absolute",
    top: -8, // Adjusted position
    right: -10, // Adjusted position
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  countText: {
    fontSize: 10,
    fontWeight: "700",
    color: "white",
  },
  filterLabel: {
    fontSize: 13, // Slightly increased from 12
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 16, // Add line height for better text rendering
  },
});
