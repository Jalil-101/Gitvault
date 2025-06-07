// hooks/useSettingsActions.ts
import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

export const useSettingsActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out of your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: () => {
            setIsLoading(true);
            // Simulate sign out process
            setTimeout(() => {
              setIsLoading(false);
              router.replace("/auth/signin");
            }, 1500);
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. All your data will be permanently deleted.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Feature Coming Soon",
              "Account deletion will be available in a future update."
            );
          },
        },
      ]
    );
  };

  const showComingSoon = (feature: string) => {
    Alert.alert(
      "Coming Soon",
      `${feature} will be available in a future update.`
    );
  };

  const showAbout = () => {
    Alert.alert(
      "About",
      "GitHub Mobile Clone\nVersion 1.0.0\nBuilt with React Native & Expo"
    );
  };

  const showFeedback = () => {
    Alert.alert("Feedback", "Thank you for helping us improve!");
  };

  const showHelp = () => {
    Alert.alert("Help Center", "Redirecting to help documentation...");
  };

  return {
    isLoading,
    handleSignOut,
    handleDeleteAccount,
    showComingSoon,
    showAbout,
    showFeedback,
    showHelp,
  };
};
