// hooks/useThemeColor.ts
import { ModernColors, type ColorScheme } from "@/constants/Colors";
import { useModernTheme } from "@/context/ThemeContext";
import { useColorScheme } from "@/hooks/useColorScheme";

/**
 * Legacy hook for backward compatibility.
 * Retrieves colors from the modern theme system.
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorPath?: string
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  // If no color path provided, return the primary text color
  if (!colorPath) {
    return ModernColors[theme].text.primary;
  }

  // Navigate the nested color object using the path
  const pathParts = colorPath.split(".");
  let color: any = ModernColors[theme];

  for (const part of pathParts) {
    if (color && typeof color === "object" && part in color) {
      color = color[part];
    } else {
      // Fallback to primary text color if path is invalid
      return ModernColors[theme].text.primary;
    }
  }

  return typeof color === "string" ? color : ModernColors[theme].text.primary;
}

/**
 * Modern hook for retrieving theme colors with full type safety.
 * Provides access to all modern theme colors and utilities.
 */
export function useModernThemeColor() {
  const { colors, theme } = useModernTheme();

  return {
    colors,
    theme,

    // Convenience getters for common colors
    get background() {
      return colors.background;
    },

    get surface() {
      return colors.surface;
    },

    get text() {
      return colors.text;
    },

    get border() {
      return colors.border;
    },

    get status() {
      return colors.status;
    },

    get accents() {
      return colors.accents;
    },

    get interactive() {
      return colors.interactive;
    },

    get shadow() {
      return colors.shadow;
    },
  };
}

/**
 * Hook for retrieving specific status colors (success, warning, error, info).
 */
export function useStatusColors() {
  const { colors } = useModernTheme();

  return {
    success: colors.status.success,
    warning: colors.status.warning,
    error: colors.status.error,
    info: colors.status.info,
  };
}

/**
 * Hook for retrieving accent colors used in cards and components.
 */
export function useAccentColors() {
  const { colors } = useModernTheme();

  return {
    purple: colors.accents.purple,
    green: colors.accents.green,
    orange: colors.accents.orange,
    red: colors.accents.red,
    blue: colors.accents.blue,
    indigo: colors.accents.indigo,
  };
}

/**
 * Hook for retrieving interactive state colors.
 */
export function useInteractiveColors() {
  const { colors } = useModernTheme();

  return {
    primary: colors.interactive.primary,
    primaryHover: colors.interactive.primaryHover,
    secondary: colors.interactive.secondary,
    secondaryHover: colors.interactive.secondaryHover,
    ghost: colors.interactive.ghost,
    ghostHover: colors.interactive.ghostHover,
  };
}

/**
 * Hook that returns a color based on the current theme.
 * Useful for components that need different colors for light/dark themes.
 */
export function useThemeBasedColor(
  lightColor: string,
  darkColor: string
): string {
  const theme = useColorScheme();
  return theme === "dark" ? darkColor : lightColor;
}

/**
 * Hook that returns Tailwind CSS classes based on the current theme.
 * Fixed to match the actual Tailwind config structure.
 */
export function useThemeClasses() {
  const { theme, isDarkTheme } = useModernTheme();

  return {
    theme,
    isDarkTheme,

    // Background classes - Fixed to match Tailwind config
    bg: {
      primary: isDarkTheme
        ? "bg-modern-dark-bg-primary"
        : "bg-modern-light-bg-primary",
      secondary: isDarkTheme
        ? "bg-modern-dark-bg-secondary"
        : "bg-modern-light-bg-secondary",
      tertiary: isDarkTheme
        ? "bg-modern-dark-bg-tertiary"
        : "bg-modern-light-bg-tertiary",
      accent: isDarkTheme
        ? "bg-modern-dark-bg-accent"
        : "bg-modern-light-bg-accent",
    },

    // Surface classes
    surface: {
      primary: isDarkTheme
        ? "bg-modern-dark-surface-primary"
        : "bg-modern-light-surface-primary",
      secondary: isDarkTheme
        ? "bg-modern-dark-surface-secondary"
        : "bg-modern-light-surface-secondary",
      elevated: isDarkTheme
        ? "bg-modern-dark-surface-elevated"
        : "bg-modern-light-surface-elevated",
      glass: isDarkTheme
        ? "bg-modern-dark-surface-glass"
        : "bg-modern-light-surface-glass",
    },

    // Text classes - Fixed to match Tailwind config
    text: {
      primary: isDarkTheme
        ? "text-modern-dark-text-primary"
        : "text-modern-light-text-primary",
      secondary: isDarkTheme
        ? "text-modern-dark-text-secondary"
        : "text-modern-light-text-secondary",
      tertiary: isDarkTheme
        ? "text-modern-dark-text-tertiary"
        : "text-modern-light-text-tertiary",
      quaternary: isDarkTheme
        ? "text-modern-dark-text-quaternary"
        : "text-modern-light-text-quaternary",
      inverse: isDarkTheme
        ? "text-modern-dark-text-inverse"
        : "text-modern-light-text-inverse",
      muted: isDarkTheme
        ? "text-modern-dark-text-muted"
        : "text-modern-light-text-muted",
    },

    // Border classes - Fixed to match Tailwind config
    border: {
      primary: isDarkTheme
        ? "border-modern-dark-border-primary"
        : "border-modern-light-border-primary",
      secondary: isDarkTheme
        ? "border-modern-dark-border-secondary"
        : "border-modern-light-border-secondary",
      tertiary: isDarkTheme
        ? "border-modern-dark-border-tertiary"
        : "border-modern-light-border-tertiary",
      glass: isDarkTheme
        ? "border-modern-dark-border-glass"
        : "border-modern-light-border-glass",
      focus: isDarkTheme
        ? "border-modern-dark-border-focus"
        : "border-modern-light-border-focus",
    },

    // Status classes
    status: {
      success: {
        main: isDarkTheme
          ? "text-modern-dark-success-main"
          : "text-modern-light-success-main",
        bg: isDarkTheme
          ? "bg-modern-dark-success-light"
          : "bg-modern-light-success-light",
        text: isDarkTheme
          ? "text-modern-dark-success-text"
          : "text-modern-light-success-text",
      },
      warning: {
        main: isDarkTheme
          ? "text-modern-dark-warning-main"
          : "text-modern-light-warning-main",
        bg: isDarkTheme
          ? "bg-modern-dark-warning-light"
          : "bg-modern-light-warning-light",
        text: isDarkTheme
          ? "text-modern-dark-warning-text"
          : "text-modern-light-warning-text",
      },
      error: {
        main: isDarkTheme
          ? "text-modern-dark-error-main"
          : "text-modern-light-error-main",
        bg: isDarkTheme
          ? "bg-modern-dark-error-light"
          : "bg-modern-light-error-light",
        text: isDarkTheme
          ? "text-modern-dark-error-text"
          : "text-modern-light-error-text",
      },
      info: {
        main: isDarkTheme
          ? "text-modern-dark-info-main"
          : "text-modern-light-info-main",
        bg: isDarkTheme
          ? "bg-modern-dark-info-light"
          : "bg-modern-light-info-light",
        text: isDarkTheme
          ? "text-modern-dark-info-text"
          : "text-modern-light-info-text",
      },
    },

    // Accent classes
    accents: {
      purple: {
        main: isDarkTheme
          ? "text-modern-dark-purple-main"
          : "text-modern-light-purple-main",
        bg: isDarkTheme
          ? "bg-modern-dark-purple-light"
          : "bg-modern-light-purple-light",
      },
      green: {
        main: isDarkTheme
          ? "text-modern-dark-green-main"
          : "text-modern-light-green-main",
        bg: isDarkTheme
          ? "bg-modern-dark-green-light"
          : "bg-modern-light-green-light",
      },
      orange: {
        main: isDarkTheme
          ? "text-modern-dark-orange-main"
          : "text-modern-light-orange-main",
        bg: isDarkTheme
          ? "bg-modern-dark-orange-light"
          : "bg-modern-light-orange-light",
      },
      red: {
        main: isDarkTheme
          ? "text-modern-dark-red-main"
          : "text-modern-light-red-main",
        bg: isDarkTheme
          ? "bg-modern-dark-red-light"
          : "bg-modern-light-red-light",
      },
      blue: {
        main: isDarkTheme
          ? "text-modern-dark-blue-main"
          : "text-modern-light-blue-main",
        bg: isDarkTheme
          ? "bg-modern-dark-blue-light"
          : "bg-modern-light-blue-light",
      },
      indigo: {
        main: isDarkTheme
          ? "text-modern-dark-indigo-main"
          : "text-modern-light-indigo-main",
        bg: isDarkTheme
          ? "bg-modern-dark-indigo-light"
          : "bg-modern-light-indigo-light",
      },
    },

    // Interactive classes
    interactive: {
      primary: isDarkTheme
        ? "bg-modern-dark-interactive-primary"
        : "bg-modern-light-interactive-primary",
      primaryHover: isDarkTheme
        ? "hover:bg-modern-dark-interactive-primary-hover"
        : "hover:bg-modern-light-interactive-primary-hover",
      secondary: isDarkTheme
        ? "bg-modern-dark-interactive-secondary"
        : "bg-modern-light-interactive-secondary",
      secondaryHover: isDarkTheme
        ? "hover:bg-modern-dark-interactive-secondary-hover"
        : "hover:bg-modern-light-interactive-secondary-hover",
      ghost: isDarkTheme
        ? "bg-modern-dark-interactive-ghost"
        : "bg-modern-light-interactive-ghost",
      ghostHover: isDarkTheme
        ? "hover:bg-modern-dark-interactive-ghost-hover"
        : "hover:bg-modern-light-interactive-ghost-hover",
    },

    // Gradient classes
    gradient: {
      background: isDarkTheme
        ? "bg-gradient-modern-dark"
        : "bg-gradient-modern-light",
      primary: isDarkTheme
        ? "bg-gradient-primary-dark"
        : "bg-gradient-primary-light",
      purple: isDarkTheme ? "bg-gradient-purple-dark" : "bg-gradient-purple",
      green: isDarkTheme ? "bg-gradient-green-dark" : "bg-gradient-green",
      orange: isDarkTheme ? "bg-gradient-orange-dark" : "bg-gradient-orange",
      red: isDarkTheme ? "bg-gradient-red-dark" : "bg-gradient-red",
      glass: isDarkTheme ? "bg-gradient-glass-dark" : "bg-gradient-glass-light",
    },

    // Shadow classes
    shadow: {
      sm: isDarkTheme ? "shadow-modern-dark-sm" : "shadow-modern-sm",
      md: isDarkTheme ? "shadow-modern-dark-md" : "shadow-modern-md",
      lg: isDarkTheme ? "shadow-modern-dark-lg" : "shadow-modern-lg",
      xl: isDarkTheme ? "shadow-modern-dark-xl" : "shadow-modern-xl",
      glass: isDarkTheme ? "shadow-glass-dark" : "shadow-glass",
    },
  };
}
