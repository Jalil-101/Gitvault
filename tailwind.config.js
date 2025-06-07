/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./*.{js,jsx,ts,tsx}",
    // Add any other folders where you use Tailwind classes
  ],
  presets: [require("nativewind/preset")],
  darkMode: "media", // ← use the OS-level color‐scheme
  theme: {
    extend: {
      colors: {
        /**
         * GitHub Mobile's exact color palette from Primer Design System
         * These colors match GitHub's official mobile app design tokens
         */
        github: {
          light: {
            // Canvas & Backgrounds
            canvas: {
              default: "#ffffff", // Primary background (cards, modals)
              overlay: "#ffffff", // Overlay backgrounds
              inset: "#f6f8fa", // Inset/recessed backgrounds
              subtle: "#f6f8fa", // App main background
            },

            // Foreground & Text
            fg: {
              default: "#1f2328", // Primary text
              muted: "#656d76", // Secondary/muted text
              subtle: "#6e7781", // Tertiary text
              onEmphasis: "#ffffff", // Text on colored backgrounds
            },

            // Borders
            border: {
              default: "#d1d9e0", // Default borders
              muted: "#d8dee4", // Muted borders
              subtle: "#f6f8fa", // Very subtle borders
            },

            // Accent Colors (Blues)
            accent: {
              fg: "#0969da", // Accent text/links
              emphasis: "#0969da", // Emphasized accent
              muted: "rgba(84, 174, 255, 0.4)",
              subtle: "#ddf4ff", // Subtle accent backgrounds
            },

            // Success (Green)
            success: {
              fg: "#1a7f37",
              emphasis: "#1f883d",
              muted: "rgba(74, 194, 107, 0.4)",
              subtle: "#dafbe1",
            },

            // Danger (Red)
            danger: {
              fg: "#d1242f",
              emphasis: "#cf222e",
              muted: "rgba(255, 129, 130, 0.4)",
              subtle: "#ffebe9",
            },

            // Warning (Orange/Yellow)
            attention: {
              fg: "#9a6700",
              emphasis: "#bf8700",
              muted: "rgba(212, 167, 44, 0.4)",
              subtle: "#fff8c5",
            },
          },

          dark: {
            // Canvas & Backgrounds
            canvas: {
              default: "#0d1117", // Primary background
              overlay: "#161b22", // Modal/overlay backgrounds
              inset: "#010409", // Inset/recessed backgrounds
              subtle: "#161b22", // Secondary surfaces
            },

            // Foreground & Text
            fg: {
              default: "#e6edf3", // Primary text
              muted: "#7d8590", // Secondary/muted text
              subtle: "#6e7681", // Tertiary text
              onEmphasis: "#ffffff", // Text on colored backgrounds
            },

            // Borders
            border: {
              default: "#30363d", // Default borders
              muted: "#21262d", // Muted borders
              subtle: "#161b22", // Very subtle borders
            },

            // Accent Colors (Blues)
            accent: {
              fg: "#2f81f7", // Accent text/links
              emphasis: "#1f6feb", // Emphasized accent
              muted: "rgba(56, 139, 253, 0.4)",
              subtle: "#0d419d", // Subtle accent backgrounds
            },

            // Success (Green)
            success: {
              fg: "#3fb950",
              emphasis: "#238636",
              muted: "rgba(46, 160, 67, 0.4)",
              subtle: "#0f5132",
            },

            // Danger (Red)
            danger: {
              fg: "#f85149",
              emphasis: "#da3633",
              muted: "rgba(248, 81, 73, 0.4)",
              subtle: "#67060c",
            },

            // Warning (Orange/Yellow)
            attention: {
              fg: "#d29922",
              emphasis: "#fb8500",
              muted: "rgba(187, 128, 9, 0.4)",
              subtle: "#762d00",
            },
          },
        },
      },
    },
  },
  plugins: [],
};
