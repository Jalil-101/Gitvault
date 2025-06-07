// context/ThemeContext.tsx
import { Colors } from "@/constants/Colors";
import * as React from "react";
import { useColorScheme as useDeviceColorScheme } from "react-native";

type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  isDarkTheme: boolean;
  toggleTheme: () => void;
  colors: typeof Colors.light | typeof Colors.dark;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "light",
  isDarkTheme: false,
  toggleTheme: () => {},
  colors: Colors.light,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const deviceColorScheme = (useDeviceColorScheme() as ThemeType) || "light";
  const [theme, setTheme] = React.useState<ThemeType>(deviceColorScheme);

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const isDarkTheme = theme === "dark";
  const colors = Colors[theme];

  const contextValue = React.useMemo(
    () => ({
      theme,
      isDarkTheme,
      toggleTheme,
      colors,
    }),
    [theme, isDarkTheme, toggleTheme, colors]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
