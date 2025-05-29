import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getAuthStatus() {
  const seenOnboarding = await AsyncStorage.getItem("seenOnboarding");
  const userData = await AsyncStorage.getItem("user");

  return {
    isAuthenticated: !!userData,
    hasSeenOnboarding: !!seenOnboarding,
  };
}
