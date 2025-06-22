// context/ThemeContext.tsx
import {
  ModernColors,
  ModernGradients,
  getModernGradient,
  getGlassStyle,
  getCardColors,
  getShadow,
  type ColorScheme,
  type GradientName,
  type CardColorType,
  type ModernTheme,
} from "@/constants/Colors";
import * as React from "react";
import { useColorScheme as useDeviceColorScheme } from "react-native";

type ThemeType = "light" | "dark";

interface ModernThemeContextType {
  theme: ThemeType;
  isDarkTheme: boolean;
  toggleTheme: () => void;
  colors: typeof ModernColors.light | typeof ModernColors.dark;

  // Enhanced utilities for modern UI
  getGradient: (gradientName: GradientName) => readonly string[];
  getGlassStyle: (opacity?: "light" | "medium" | "strong") => {
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    backdropFilter: string;
  };
  getCardColors: (cardType: CardColorType) => {
    background: readonly string[];
    text: string;
    icon: string;
  };
  getShadow: (size: keyof ModernTheme["shadow"]) => {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };

  // Pre-computed gradient combinations for easy access
  gradients: {
    primary: readonly string[];
    secondary: readonly string[];
    success: readonly string[];
    warning: readonly string[];
    error: readonly string[];
    purple: readonly string[];
    green: readonly string[];
    orange: readonly string[];
    red: readonly string[];
    background: readonly string[];
    glass: readonly string[];
  };

  // Glass morphism styles
  glass: {
    light: {
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
      backdropFilter: string;
    };
    medium: {
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
      backdropFilter: string;
    };
    strong: {
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
      backdropFilter: string;
    };
  };

  // Shadow presets
  shadows: {
    sm: object;
    md: object;
    lg: object;
    xl: object;
  };

  // Card color presets
  cardColors: {
    repositories: { background: readonly string[]; text: string; icon: string };
    commits: { background: readonly string[]; text: string; icon: string };
    issues: { background: readonly string[]; text: string; icon: string };
    stars: { background: readonly string[]; text: string; icon: string };
  };
}

// Default context value with safe fallbacks
const defaultContextValue: ModernThemeContextType = {
  theme: "light",
  isDarkTheme: false,
  toggleTheme: () => {},
  colors: ModernColors.light,
  getGradient: (gradientName: GradientName) =>
    ModernGradients.light[gradientName] || [],
  getGlassStyle: (opacity: "light" | "medium" | "strong" = "medium") => ({
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderColor: "rgba(0, 0, 0, 0.08)",
    borderWidth: 1,
    backdropFilter: "blur(20px)",
  }),
  getCardColors: (cardType: CardColorType) => ({
    background: ["#8B5CF6", "#A855F7"],
    text: "#FFFFFF",
    icon: "#FFFFFF",
  }),
  getShadow: (size: keyof ModernTheme["shadow"]) => ({
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  }),
  gradients: {
    primary: ModernGradients.light.primary,
    secondary: ModernGradients.light.secondary,
    success: ModernGradients.light.success,
    warning: ModernGradients.light.warning,
    error: ModernGradients.light.error,
    purple: ModernGradients.light.purple,
    green: ModernGradients.light.green,
    orange: ModernGradients.light.orange,
    red: ModernGradients.light.red,
    background: ModernGradients.light.background,
    glass: ModernGradients.light.glass,
  },
  glass: {
    light: {
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      borderColor: "rgba(0, 0, 0, 0.08)",
      borderWidth: 1,
      backdropFilter: "blur(20px)",
    },
    medium: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderColor: "rgba(0, 0, 0, 0.08)",
      borderWidth: 1,
      backdropFilter: "blur(20px)",
    },
    strong: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderColor: "rgba(0, 0, 0, 0.08)",
      borderWidth: 1,
      backdropFilter: "blur(20px)",
    },
  },
  shadows: {
    sm: {
      shadowColor: "rgba(0, 0, 0, 0.05)",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: "rgba(0, 0, 0, 0.1)",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: "rgba(0, 0, 0, 0.15)",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 4,
    },
    xl: {
      shadowColor: "rgba(0, 0, 0, 0.2)",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  cardColors: {
    repositories: {
      background: ["#8B5CF6", "#A855F7"],
      text: "#FFFFFF",
      icon: "#FFFFFF",
    },
    commits: {
      background: ["#10B981", "#059669"],
      text: "#FFFFFF",
      icon: "#FFFFFF",
    },
    issues: {
      background: ["#F97316", "#EA580C"],
      text: "#FFFFFF",
      icon: "#FFFFFF",
    },
    stars: {
      background: ["#EF4444", "#DC2626"],
      text: "#FFFFFF",
      icon: "#FFFFFF",
    },
  },
};

export const ModernThemeContext =
  React.createContext<ModernThemeContextType>(defaultContextValue);

export function ModernThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Safely get device color scheme with fallback
  const deviceColorScheme = useDeviceColorScheme();
  const safeDeviceScheme: ThemeType =
    (deviceColorScheme as ThemeType) || "light";

  const [theme, setTheme] = React.useState<ThemeType>(safeDeviceScheme);

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const isDarkTheme = theme === "dark";
  const colors = ModernColors[theme];

  // Enhanced utility functions with error handling
  const getThemeGradient = React.useCallback(
    (gradientName: GradientName) => {
      try {
        return getModernGradient(theme, gradientName);
      } catch (error) {
        console.warn(
          `Failed to get gradient ${gradientName} for theme ${theme}:`,
          error
        );
        return ModernGradients[theme]?.primary || ModernGradients.light.primary;
      }
    },
    [theme]
  );

  const getThemeGlassStyle = React.useCallback(
    (opacity: "light" | "medium" | "strong" = "medium") => {
      try {
        return getGlassStyle(theme, opacity);
      } catch (error) {
        console.warn(`Failed to get glass style for theme ${theme}:`, error);
        return defaultContextValue.getGlassStyle(opacity);
      }
    },
    [theme]
  );

  const getThemeCardColors = React.useCallback(
    (cardType: CardColorType) => {
      try {
        return getCardColors(theme, cardType);
      } catch (error) {
        console.warn(
          `Failed to get card colors ${cardType} for theme ${theme}:`,
          error
        );
        return defaultContextValue.getCardColors(cardType);
      }
    },
    [theme]
  );

  const getThemeShadow = React.useCallback(
    (size: keyof ModernTheme["shadow"]) => {
      try {
        return getShadow(theme, size);
      } catch (error) {
        console.warn(`Failed to get shadow ${size} for theme ${theme}:`, error);
        return defaultContextValue.getShadow(size);
      }
    },
    [theme]
  );

  // Pre-computed gradient combinations for easy access
  const gradients = React.useMemo(() => {
    try {
      return {
        primary:
          ModernGradients[theme]?.primary || ModernGradients.light.primary,
        secondary:
          ModernGradients[theme]?.secondary || ModernGradients.light.secondary,
        success:
          ModernGradients[theme]?.success || ModernGradients.light.success,
        warning:
          ModernGradients[theme]?.warning || ModernGradients.light.warning,
        error: ModernGradients[theme]?.error || ModernGradients.light.error,
        purple: ModernGradients[theme]?.purple || ModernGradients.light.purple,
        green: ModernGradients[theme]?.green || ModernGradients.light.green,
        orange: ModernGradients[theme]?.orange || ModernGradients.light.orange,
        red: ModernGradients[theme]?.red || ModernGradients.light.red,
        background:
          ModernGradients[theme]?.background ||
          ModernGradients.light.background,
        glass: ModernGradients[theme]?.glass || ModernGradients.light.glass,
      };
    } catch (error) {
      console.warn(`Failed to compute gradients for theme ${theme}:`, error);
      return defaultContextValue.gradients;
    }
  }, [theme]);

  // Pre-computed glass styles
  const glass = React.useMemo(
    () => ({
      light: getThemeGlassStyle("light"),
      medium: getThemeGlassStyle("medium"),
      strong: getThemeGlassStyle("strong"),
    }),
    [getThemeGlassStyle]
  );

  // Pre-computed shadow styles
  const shadows = React.useMemo(
    () => ({
      sm: getThemeShadow("sm"),
      md: getThemeShadow("md"),
      lg: getThemeShadow("lg"),
      xl: getThemeShadow("xl"),
    }),
    [getThemeShadow]
  );

  // Pre-computed card colors
  const cardColors = React.useMemo(
    () => ({
      repositories: getThemeCardColors("repositories"),
      commits: getThemeCardColors("commits"),
      issues: getThemeCardColors("issues"),
      stars: getThemeCardColors("stars"),
    }),
    [getThemeCardColors]
  );

  const contextValue = React.useMemo(
    () => ({
      theme,
      isDarkTheme,
      toggleTheme,
      colors,
      getGradient: getThemeGradient,
      getGlassStyle: getThemeGlassStyle,
      getCardColors: getThemeCardColors,
      getShadow: getThemeShadow,
      gradients,
      glass,
      shadows,
      cardColors,
    }),
    [
      theme,
      isDarkTheme,
      toggleTheme,
      colors,
      getThemeGradient,
      getThemeGlassStyle,
      getThemeCardColors,
      getThemeShadow,
      gradients,
      glass,
      shadows,
      cardColors,
    ]
  );

  return (
    <ModernThemeContext.Provider value={contextValue}>
      {children}
    </ModernThemeContext.Provider>
  );
}

export function useModernTheme() {
  const context = React.useContext(ModernThemeContext);
  if (context === undefined) {
    throw new Error("useModernTheme must be used within a ModernThemeProvider");
  }
  return context;
}

// Enhanced hooks for specific use cases
export function useGradient(gradientName: GradientName) {
  const { getGradient } = useModernTheme();
  return getGradient(gradientName);
}

export function useGlassStyle(opacity?: "light" | "medium" | "strong") {
  const { getGlassStyle } = useModernTheme();
  return getGlassStyle(opacity);
}

export function useCardColors(cardType: CardColorType) {
  const { getCardColors } = useModernTheme();
  return getCardColors(cardType);
}

export function useShadow(size: keyof ModernTheme["shadow"]) {
  const { getShadow } = useModernTheme();
  return getShadow(size);
}

// Hook for background gradient styles (for the main app background)
export function useBackgroundGradient() {
  const { gradients } = useModernTheme();
  return gradients.background;
}

// Legacy compatibility hooks (for gradual migration)
export function useTheme() {
  return useModernTheme();
}
