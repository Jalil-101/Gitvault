import { useModernTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Bot, ClipboardCheck, Plus, Search } from "lucide-react-native";
import {
  ColorValue,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const quickActions = [
  {
    id: "search",
    icon: Search,
    label: "Search",
    colorKey: "info" as const,
    onPress: () => router.push("/screens/SearchScreen"),
  },
  {
    id: "vault-ai",
    icon: Bot,
    label: "Vault AI",
    colorKey: "info" as const,
    onPress: () => router.push("/screens/VaultAIChatScreen"),
  },
  {
    id: "tasks",
    icon: ClipboardCheck,
    label: "Tasks",
    colorKey: "warning" as const,
    onPress: () => router.push("/screens/Todo"),
  },
];

export default function QuickActionsSection() {
  const { colors, gradients, shadows } = useModernTheme();

  const handleNewRepository = () => {
    // Handle new repository action
    console.log("New Repository pressed");
    // Example: navigation.navigate('NewRepositoryScreen');
  };

  return (
    <View className="px-5 mb-8">
      <Text
        className="text-2xl font-bold mb-4"
        style={{
          color: colors.text.primary,
          letterSpacing: -0.5,
        }}
      >
        Quick Actions
      </Text>

      <View className="gap-4">
        {/* New Repository Button */}
        <TouchableOpacity
          onPress={handleNewRepository}
          activeOpacity={0.8}
          style={{
            height: 60,
            borderRadius: 32,
            overflow: "hidden",
            ...Platform.select({
              ios: {
                ...shadows.md,
                shadowRadius: 8,
              },
              android: {
                elevation: 6,
                borderRadius: 32,
              },
            }),
          }}
        >
          <LinearGradient
            colors={
              gradients.primary as [ColorValue, ColorValue, ...ColorValue[]]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              borderRadius: 32,
            }}
          >
            <Plus size={24} color={colors.text.inverse} />

            <Text
              className="font-bold text-base"
              style={{ color: colors.text.inverse }}
            >
              New Repository
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Secondary Actions */}
        <View className="flex-row justify-between">
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              onPress={action.onPress}
              activeOpacity={0.7}
              className={`flex-1 items-center p-4 rounded-2xl mx-1.5 ${
                action.id === "vault-ai" ? "border-2" : ""
              }`}
              style={{
                backgroundColor:
                  action.id === "vault-ai"
                    ? colors.accents.purple.light
                    : colors.surface.glass,
                borderWidth: action.id === "vault-ai" ? 2 : 1,
                borderColor:
                  action.id === "vault-ai"
                    ? colors.accents.purple.main
                    : colors.border.glass,
                ...Platform.select({
                  ios: {
                    ...shadows.md,
                    shadowRadius: action.id === "vault-ai" ? 12 : 8,
                    shadowColor:
                      action.id === "vault-ai"
                        ? colors.accents.purple.main
                        : "#000",
                    shadowOpacity: action.id === "vault-ai" ? 0.3 : 0.1,
                  },
                  android: {
                    elevation: action.id === "vault-ai" ? 8 : 4,
                  },
                }),
              }}
            >
              <View
                className={`w-10 h-10 rounded-full items-center justify-center mb-2 ${
                  action.id === "vault-ai" ? "scale-110" : ""
                }`}
                style={{
                  backgroundColor:
                    action.id === "vault-ai"
                      ? colors.accents.purple.main
                      : colors.status[action.colorKey].main,
                  ...Platform.select({
                    ios: {
                      ...shadows.sm,
                      shadowRadius: action.id === "vault-ai" ? 8 : 4,
                      shadowColor:
                        action.id === "vault-ai"
                          ? colors.accents.purple.main
                          : "#000",
                      shadowOpacity: action.id === "vault-ai" ? 0.4 : 0.1,
                    },
                    android: {
                      elevation: action.id === "vault-ai" ? 4 : 2,
                    },
                  }),
                }}
              >
                <action.icon
                  size={action.id === "vault-ai" ? 22 : 20}
                  color={colors.text.inverse}
                />
              </View>
              <Text
                className={`text-xs font-semibold ${
                  action.id === "vault-ai" ? "font-bold" : ""
                }`}
                style={{
                  color:
                    action.id === "vault-ai"
                      ? colors.accents.purple.main
                      : colors.text.secondary,
                }}
              >
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
