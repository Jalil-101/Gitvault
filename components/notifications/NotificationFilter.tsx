import { useModernTheme } from "@/context/ThemeContext";
import { TouchableOpacity, View, Text, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
  const { colors, isDarkTheme } = useModernTheme();

  return (
    <View className="px-6 mb-4">
      <View
        className="flex-row justify-between bg-opacity-60 p-3 rounded-2xl"
        style={{
          backgroundColor: isDarkTheme
            ? colors.surface.secondary + "40"
            : colors.surface.secondary + "60",
        }}
      >
        {filters.map((filter, index) => {
          const isActive = activeFilter === filter.key;

          return (
            <TouchableOpacity
              key={filter.key}
              onPress={() => onFilterChange(filter.key)}
              activeOpacity={0.7}
              style={{
                flex: 1,
                marginHorizontal: 4,
                paddingVertical: 12,
                paddingHorizontal: 8,
                borderRadius: 16,
                backgroundColor: isActive
                  ? isDarkTheme
                    ? colors.interactive.primary
                    : colors.interactive.primary
                  : "transparent",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                ...Platform.select({
                  ios: isActive
                    ? {
                        shadowColor: colors.interactive.primary,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                      }
                    : {},
                  android: isActive
                    ? {
                        elevation: 3,
                      } as any
                    : {},
                }),
              }}
            >
              {/* Icon */}
              <View style={{ marginBottom: 6, position: "relative" }}>
                <Ionicons
                  name={filter.icon as any}
                  size={22}
                  color={
                    isActive
                      ? colors.text.inverse
                      : isDarkTheme
                      ? colors.text.primary
                      : colors.text.primary
                  }
                  style={{ opacity: isActive ? 1 : 0.7 }}
                />

                {/* Count Badge */}
                {filter.count > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -8,
                      backgroundColor: "#FF4444",
                      borderRadius: 10,
                      minWidth: 20,
                      height: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 2,
                      borderColor: isDarkTheme
                        ? colors.surface.primary
                        : colors.surface.primary,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "700",
                        color: "white",
                      }}
                    >
                      {filter.count > 99 ? "99+" : filter.count}
                    </Text>
                  </View>
                )}
              </View>

              {/* Short Label */}
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  color: isActive
                    ? colors.text.inverse
                    : isDarkTheme
                    ? colors.text.primary
                    : colors.text.primary,
                  opacity: isActive ? 1 : 0.8,
                  textAlign: "center",
                }}
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
