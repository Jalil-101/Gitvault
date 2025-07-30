import { StatusBar } from "react-native";

export const configureStatusBar = (isDarkTheme: boolean) => {
  StatusBar.setBarStyle(isDarkTheme ? "light-content" : "dark-content");
};

export const StatusBarComponent = ({
  isDarkTheme,
}: {
  isDarkTheme: boolean;
}) => (
  <StatusBar
    barStyle={isDarkTheme ? "light-content" : "dark-content"}
    backgroundColor="transparent"
    translucent
  />
);
