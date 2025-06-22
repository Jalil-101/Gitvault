/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        modern: {
          light: {
            // Base backgrounds
            bg: {
              primary: "#FFFFFF",
              secondary: "#F8FAFC", // Slate-50
              tertiary: "#F1F5F9", // Slate-100
              accent: "#FAFAFA", // Neutral-50
            },

            // Surface colors
            surface: {
              primary: "#FFFFFF",
              secondary: "#F8FAFC",
              elevated: "#FFFFFF",
              glass: "rgba(255, 255, 255, 0.8)",
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

            // Status colors
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

            // Accent colors for cards
            purple: {
              main: "#8B5CF6", // Violet-500
              light: "#EDE9FE", // Violet-100
            },
            green: {
              main: "#10B981", // Emerald-500
              light: "#D1FAE5", // Emerald-100
            },
            orange: {
              main: "#F97316", // Orange-500
              light: "#FED7AA", // Orange-100
            },
            red: {
              main: "#EF4444", // Red-500
              light: "#FEE2E2", // Red-100
            },
            blue: {
              main: "#3B82F6", // Blue-500
              light: "#DBEAFE", // Blue-100
            },
            indigo: {
              main: "#6366F1", // Indigo-500
              light: "#E0E7FF", // Indigo-100
            },

            // Interactive states
            interactive: {
              primary: "#3B82F6", // Blue-500
              "primary-hover": "#2563EB", // Blue-600
              secondary: "#F1F5F9", // Slate-100
              "secondary-hover": "#E2E8F0", // Slate-200
              ghost: "transparent",
              "ghost-hover": "#F8FAFC", // Slate-50
            },
          },

          dark: {
            // Base backgrounds - Deep space theme
            bg: {
              primary: "#0A0A0F", // Very dark blue-black
              secondary: "#12121A", // Dark blue-black
              tertiary: "#1A1A2E", // Medium dark blue
              accent: "#16213E", // Lighter dark blue
            },

            // Surface colors
            surface: {
              primary: "#12121A",
              secondary: "#1A1A2E",
              elevated: "#16213E",
              glass: "rgba(255, 255, 255, 0.05)",
              
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

            // Accent colors for cards - Enhanced for dark theme
            purple: {
              main: "#A855F7", // Purple-500 (brighter for dark)
              light: "rgba(168, 85, 247, 0.2)",
            },
            green: {
              main: "#10B981", // Emerald-500
              light: "rgba(16, 185, 129, 0.2)",
            },
            orange: {
              main: "#F97316", // Orange-500
              light: "rgba(249, 115, 22, 0.2)",
            },
            red: {
              main: "#EF4444", // Red-500
              light: "rgba(239, 68, 68, 0.2)",
            },
            blue: {
              main: "#3B82F6", // Blue-500
              light: "rgba(59, 130, 246, 0.2)",
            },
            indigo: {
              main: "#6366F1", // Indigo-500
              light: "rgba(99, 102, 241, 0.2)",
            },

            // Interactive states
            interactive: {
              primary: "#6366F1", // Indigo-500
              "primary-hover": "#7C3AED", // Violet-600
              secondary: "rgba(255, 255, 255, 0.05)",
              "secondary-hover": "rgba(255, 255, 255, 0.1)",
              ghost: "transparent",
              "ghost-hover": "rgba(255, 255, 255, 0.05)",
            },
          },
        },
      },

      // Background gradient utilities
      backgroundImage: {
        "gradient-modern-light":
          "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
        "gradient-modern-dark":
          "linear-gradient(135deg, #0A0A0F 0%, #12121A 50%, #1A1A2E 100%)",
        "gradient-primary-light":
          "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
        "gradient-primary-dark":
          "linear-gradient(135deg, #6366F1 0%, #7C3AED 100%)",
        "gradient-purple": "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)",
        "gradient-purple-dark":
          "linear-gradient(135deg, #A855F7 0%, #C084FC 100%)",
        "gradient-green": "linear-gradient(135deg, #10B981 0%, #059669 100%)",
        "gradient-green-dark":
          "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
        "gradient-orange": "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
        "gradient-orange-dark":
          "linear-gradient(135deg, #F97316 0%, #FB923C 100%)",
        "gradient-red": "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
        "gradient-red-dark":
          "linear-gradient(135deg, #EF4444 0%, #F87171 100%)",
        "gradient-glass-light":
          "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)",
        "gradient-glass-dark":
          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
      },

      // Glass morphism utilities
      backdropBlur: {
        glass: "20px",
      },

      // Shadow utilities
      boxShadow: {
        "modern-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "modern-md": "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
        "modern-lg": "0 4px 8px 0 rgba(0, 0, 0, 0.15)",
        "modern-xl": "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
        "modern-dark-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
        "modern-dark-md": "0 2px 4px 0 rgba(0, 0, 0, 0.4)",
        "modern-dark-lg": "0 4px 8px 0 rgba(0, 0, 0, 0.5)",
        "modern-dark-xl": "0 8px 16px 0 rgba(0, 0, 0, 0.6)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
      },

      // Animation utilities
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },

      // Typography
      fontFamily: {
        modern: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },

      // Spacing
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },

      // Border radius
      borderRadius: {
        modern: "0.75rem",
        "modern-lg": "1rem",
        "modern-xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
