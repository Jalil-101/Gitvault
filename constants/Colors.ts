// constants/Colors.ts

export const MODERN_LIGHT = {
  // Base backgrounds
  background: {
    primary: "#FFFFFF",
    secondary: "#F8FAFC", // Slate-50
    tertiary: "#F1F5F9", // Slate-100
    accent: "#FAFAFA", // Neutral-50
  },

  // Surface colors for cards and components
  surface: {
    primary: "#FFFFFF",
    secondary: "#F8FAFC",
    tertiary: "#F1F5F9", // Added missing tertiary
    elevated: "#FFFFFF",
    glass: "rgba(255, 255, 255, 0.8)",
    glassBorder: "rgba(0, 0, 0, 0.1)",
  },

  // Text colors
  text: {
    primary: "#0F172A", // Slate-900
    secondary: "#475569", // Slate-600
    tertiary: "#64748B", // Slate-500
    quaternary: "#94A3B8", // Slate-400
    inverse: "#FFFFFF",
    muted: "#CBD5E1", // Slate-300
  },

  // Border colors
  border: {
    primary: "#E2E8F0", // Slate-200
    secondary: "#CBD5E1", // Slate-300
    tertiary: "#F1F5F9", // Slate-100
    glass: "rgba(0, 0, 0, 0.08)",
    focus: "#3B82F6", // Blue-500
  },

  // Status colors - Light theme
  status: {
    success: {
      main: "#10B981", // Emerald-500
      light: "#D1FAE5", // Emerald-100
      dark: "#047857", // Emerald-700
      text: "#065F46", // Emerald-800
    },
    warning: {
      main: "#F59E0B", // Amber-500
      light: "#FEF3C7", // Amber-100
      dark: "#D97706", // Amber-600
      text: "#92400E", // Amber-800
    },
    error: {
      main: "#EF4444", // Red-500
      light: "#FEE2E2", // Red-100
      dark: "#DC2626", // Red-600
      text: "#991B1B", // Red-800
    },
    info: {
      main: "#3B82F6", // Blue-500
      light: "#DBEAFE", // Blue-100
      dark: "#2563EB", // Blue-600
      text: "#1E40AF", // Blue-800
    },
  },

  // Accent colors for the dashboard cards
  accents: {
    purple: {
      main: "#8B5CF6", // Violet-500
      light: "#EDE9FE", // Violet-100
      gradient: ["#8B5CF6", "#A855F7"], // Violet gradient
    },
    green: {
      main: "#10B981", // Emerald-500
      light: "#D1FAE5", // Emerald-100
      gradient: ["#10B981", "#059669"], // Emerald gradient
    },
    orange: {
      main: "#F97316", // Orange-500
      light: "#FED7AA", // Orange-100
      gradient: ["#F97316", "#EA580C"], // Orange gradient
    },
    red: {
      main: "#EF4444", // Red-500
      light: "#FEE2E2", // Red-100
      gradient: ["#EF4444", "#DC2626"], // Red gradient
    },
    blue: {
      main: "#3B82F6", // Blue-500
      light: "#DBEAFE", // Blue-100
      gradient: ["#3B82F6", "#2563EB"], // Blue gradient
    },
    indigo: {
      main: "#6366F1", // Indigo-500
      light: "#E0E7FF", // Indigo-100
      gradient: ["#6366F1", "#4F46E5"], // Indigo gradient
    },
  },

  // Interactive states
  interactive: {
    primary: "#3B82F6", // Blue-500
    primaryHover: "#2563EB", // Blue-600
    secondary: "#F1F5F9", // Slate-100
    secondaryHover: "#E2E8F0", // Slate-200
    ghost: "transparent",
    ghostHover: "#F8FAFC", // Slate-50
  },

  // Shadow colors
  shadow: {
    sm: "rgba(0, 0, 0, 0.05)",
    md: "rgba(0, 0, 0, 0.1)",
    lg: "rgba(0, 0, 0, 0.15)",
    xl: "rgba(0, 0, 0, 0.2)",
  },

  // Contribution graph colors - Light theme
  contribution: {
    level0: "#F1F5F9", // Very light slate background
    level1: "#DCFCE7", // Light green
    level2: "#BBF7D0", // Medium light green
    level3: "#86EFAC", // Medium green
    level4: "#4ADE80", // Strong green
    border: {
      level0: "#E2E8F0", // Light slate border
      level1: "#A7F3D0", // Light green border
      level2: "#86EFAC", // Medium light green border
      level3: "#4ADE80", // Medium green border
      level4: "#22C55E", // Strong green border
    },
  },
} as const;

export const MODERN_DARK = {
  // Base backgrounds - Deep space theme
  background: {
    primary: "#0A0A0F", // Very dark blue-black
    secondary: "#12121A", // Dark blue-black
    tertiary: "#1A1A2E", // Medium dark blue
    accent: "#16213E", // Lighter dark blue
  },

  // Surface colors for cards and components
  surface: {
    primary: "#12121A",
    secondary: "#1A1A2E",
    tertiary: "#16213E", // Added missing tertiary
    elevated: "#16213E",
    glass: "rgba(255, 255, 255, 0.05)",
    glassBorder: "rgba(255, 255, 255, 0.1)",
  },

  // Text colors - High contrast for dark theme
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.9)",
    tertiary: "rgba(255, 255, 255, 0.7)",
    quaternary: "rgba(255, 255, 255, 0.5)",
    inverse: "#0A0A0F",
    muted: "rgba(255, 255, 255, 0.4)",
  },

  // Border colors
  border: {
    primary: "rgba(255, 255, 255, 0.1)",
    secondary: "rgba(255, 255, 255, 0.08)",
    tertiary: "rgba(255, 255, 255, 0.05)",
    glass: "rgba(255, 255, 255, 0.12)",
    focus: "#6366F1", // Indigo-500
  },

  // Status colors - Dark theme optimized
  status: {
    success: {
      main: "#10B981", // Emerald-500
      light: "rgba(16, 185, 129, 0.2)",
      dark: "#047857", // Emerald-700
      text: "#6EE7B7", // Emerald-300
    },
    warning: {
      main: "#F59E0B", // Amber-500
      light: "rgba(245, 158, 11, 0.2)",
      dark: "#D97706", // Amber-600
      text: "#FCD34D", // Amber-300
    },
    error: {
      main: "#EF4444", // Red-500
      light: "rgba(239, 68, 68, 0.2)",
      dark: "#DC2626", // Red-600
      text: "#FCA5A5", // Red-300
    },
    info: {
      main: "#3B82F6", // Blue-500
      light: "rgba(59, 130, 246, 0.2)",
      dark: "#2563EB", // Blue-600
      text: "#93C5FD", // Blue-300
    },
  },

  // Accent colors for the dashboard cards - Enhanced for dark theme
  accents: {
    purple: {
      main: "#A855F7", // Purple-500 (brighter for dark)
      light: "rgba(168, 85, 247, 0.2)",
      gradient: ["#A855F7", "#C084FC"], // Purple gradient
    },
    green: {
      main: "#10B981", // Emerald-500
      light: "rgba(16, 185, 129, 0.2)",
      gradient: ["#10B981", "#34D399"], // Emerald gradient
    },
    orange: {
      main: "#F97316", // Orange-500
      light: "rgba(249, 115, 22, 0.2)",
      gradient: ["#F97316", "#FB923C"], // Orange gradient
    },
    red: {
      main: "#EF4444", // Red-500
      light: "rgba(239, 68, 68, 0.2)",
      gradient: ["#EF4444", "#F87171"], // Red gradient
    },
    blue: {
      main: "#3B82F6", // Blue-500
      light: "rgba(59, 130, 246, 0.2)",
      gradient: ["#3B82F6", "#60A5FA"], // Blue gradient
    },
    indigo: {
      main: "#6366F1", // Indigo-500
      light: "rgba(99, 102, 241, 0.2)",
      gradient: ["#6366F1", "#818CF8"], // Indigo gradient
    },
  },

  // Interactive states
  interactive: {
    primary: "#6366F1", // Indigo-500
    primaryHover: "#7C3AED", // Violet-600
    secondary: "rgba(255, 255, 255, 0.05)",
    secondaryHover: "rgba(255, 255, 255, 0.1)",
    ghost: "transparent",
    ghostHover: "rgba(255, 255, 255, 0.05)",
  },

  // Shadow colors
  shadow: {
    sm: "rgba(0, 0, 0, 0.3)",
    md: "rgba(0, 0, 0, 0.4)",
    lg: "rgba(0, 0, 0, 0.5)",
    xl: "rgba(0, 0, 0, 0.6)",
  },

  // Contribution graph colors - Dark theme
  contribution: {
    level0: "rgba(255, 255, 255, 0.08)", // Very subtle white for no contributions
    level1: "rgba(34, 197, 94, 0.2)", // Light green with opacity
    level2: "rgba(34, 197, 94, 0.4)", // Medium light green
    level3: "rgba(34, 197, 94, 0.7)", // Medium green
    level4: "#22C55E", // Full green for highest activity
    border: {
      level0: "rgba(255, 255, 255, 0.15)", // Subtle border for empty days
      level1: "rgba(34, 197, 94, 0.3)", // Light green border
      level2: "rgba(34, 197, 94, 0.5)", // Medium light green border
      level3: "rgba(34, 197, 94, 0.8)", // Medium green border
      level4: "#16A34A", // Strong green border
    },
  },
} as const;

// Gradient definitions
export const GRADIENTS = {
  light: {
    primary: ["#3B82F6", "#2563EB"] as const, // Blue gradient
    secondary: ["#F1F5F9", "#E2E8F0"] as const, // Slate gradient
    success: ["#10B981", "#059669"] as const, // Emerald gradient
    warning: ["#F59E0B", "#D97706"] as const, // Amber gradient
    error: ["#EF4444", "#DC2626"] as const, // Red gradient

    // Card gradients
    purple: ["#8B5CF6", "#A855F7"] as const,
    green: ["#10B981", "#059669"] as const,
    orange: ["#F97316", "#EA580C"] as const,
    red: ["#EF4444", "#DC2626"] as const,

    // Background gradients
    background: ["#FFFFFF", "#F8FAFC"] as const,
    glass: ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.4)"] as const,
  },
  dark: {
    primary: ["#6366F1", "#7C3AED"] as const, // Indigo to violet
    secondary: [
      "rgba(255, 255, 255, 0.1)",
      "rgba(255, 255, 255, 0.05)",
    ] as const,
    success: ["#10B981", "#34D399"] as const, // Emerald gradient
    warning: ["#F59E0B", "#FCD34D"] as const, // Amber gradient
    error: ["#EF4444", "#F87171"] as const, // Red gradient

    // Card gradients - Enhanced for dark theme
    purple: ["#A855F7", "#C084FC"] as const,
    green: ["#10B981", "#34D399"] as const,
    orange: ["#F97316", "#FB923C"] as const,
    red: ["#EF4444", "#F87171"] as const,

    // Background gradients
    background: ["#0A0A0F", "#12121A", "#1A1A2E"] as const,
    glass: ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)"] as const,
  },
} as const;
// In your Colors.ts, you could add:
export const REPOSITORY_VARIANTS = {
  trending: {
    accent: "green",
    gradient: "green",
  },
  discover: {
    accent: "blue", 
    gradient: "primary",
  },
} as const;

// Main color export
export const ModernColors = {
  light: MODERN_LIGHT,
  dark: MODERN_DARK,
} as const;

export const ModernGradients = GRADIENTS;

// Type definitions
export type ModernTheme = typeof MODERN_LIGHT;
export type ModernDarkTheme = typeof MODERN_DARK;
export type ColorScheme = keyof typeof ModernColors;
export type GradientName = keyof typeof GRADIENTS.light;

// Utility functions
export const getModernGradient = (
  theme: ColorScheme,
  gradientName: GradientName
) => {
  return GRADIENTS[theme][gradientName];
};

export const getGlassStyle = (
  theme: ColorScheme,
  opacity: "light" | "medium" | "strong" = "medium"
) => {
  const colors = ModernColors[theme];
  const opacityMap = {
    light:
      theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)",
    medium:
      theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.8)",
    strong:
      theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.9)",
  };

  return {
    backgroundColor: opacityMap[opacity],
    borderColor: colors.border.glass,
    borderWidth: 1,
    backdropFilter: "blur(20px)",
  };
};

// Card color mappings for the dashboard
export const CARD_COLORS = {
  repositories: "purple",
  commits: "green",
  issues: "orange",
  stars: "red",
} as const;

export type CardColorType = keyof typeof CARD_COLORS;

export const getCardColors = (theme: ColorScheme, cardType: CardColorType) => {
  const colorKey = CARD_COLORS[cardType];
  const colors = ModernColors[theme];
  return {
    background: colors.accents[colorKey].gradient,
    text: colors.text.inverse,
    icon: colors.text.inverse,
  };
};

// Shadow utilities
export const getShadow = (
  theme: ColorScheme,
  size: keyof ModernTheme["shadow"]
) => {
  return {
    shadowColor: ModernColors[theme].shadow[size],
    shadowOffset: {
      width: 0,
      height: size === "sm" ? 1 : size === "md" ? 2 : size === "lg" ? 4 : 8,
    },
    shadowOpacity: 1,
    shadowRadius:
      size === "sm" ? 2 : size === "md" ? 4 : size === "lg" ? 8 : 16,
    elevation: size === "sm" ? 1 : size === "md" ? 2 : size === "lg" ? 4 : 8,
  };
};
