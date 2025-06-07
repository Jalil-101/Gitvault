import React from "react";
import { View, Text, TouchableOpacity, StatusBar,  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { Link, useRouter } from "expo-router";


export const HomeHeader: React.FC = () => {
  const { colors, isDarkTheme } = useTheme();
 const router = useRouter();
  return (
    <>
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor={colors.canvas.default}
      />
      <View
        style={{
          backgroundColor: colors.canvas.default,
          borderBottomWidth: 1,
          borderBottomColor: colors.border.default,
        }}
      >
        <SafeAreaView edges={["top"]}>
          <View className="flex-row items-center justify-between px-4 py-4">
            <View className="flex-row items-center flex-1">
              <View
                className="w-8 h-8 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: colors.canvas.inset }}
              >
                <Ionicons
                  name="logo-github"
                  size={20}
                  color={colors.fg.default}
                />
              </View>
              <Text
                className="text-lg font-semibold"
                style={{ color: colors.fg.default }}
              >
                Home
              </Text>
            </View>

            <View className="flex-row items-center">
              <View className="mr-6">
                <TouchableOpacity
                  className="p-2 rounded-full"
                  style={{ backgroundColor: colors.canvas.subtle }}
                  activeOpacity={0.7}
                >
                  <Link href="/screens/SearchScreen">
                    <Ionicons name="search" size={20} color={colors.fg.muted} />
                  </Link>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  className="p-2 rounded-full"
                  style={{ backgroundColor: colors.canvas.subtle }}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color={colors.fg.muted}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};
