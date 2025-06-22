// hooks/useColorScheme.ts
import { useColorScheme as useSystemColorScheme } from "react-native";
import { useModernTheme } from "@/context/ThemeContext";
import { ColorScheme } from "@/constants/Colors";

/**
 * Hook that returns the current color scheme.
 * Integrates with the ModernThemeContext for consistent theming.
 */
export function useColorScheme(): ColorScheme {
  const { theme } = useModernTheme();
  return theme;
}

/**
 * Hook that returns the device's preferred color scheme.
 * Useful for detecting system preferences without overriding user choice.
 */


/**
 * Hook that returns whether the current theme is dark mode.
 */
export function useDeviceColorScheme(): ColorScheme | null {
  const deviceScheme = useSystemColorScheme();
  return (deviceScheme as ColorScheme) || null;
}

/**
 * Hook that provides theme toggle functionality.
 */
export function useThemeToggle() {
  const { theme, toggleTheme, isDarkTheme } = useModernTheme();

  return {
    theme,
    isDarkTheme,
    toggleTheme,
    isLightTheme: !isDarkTheme,
  };
}
