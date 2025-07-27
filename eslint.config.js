// eslint.config.js
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const reactNativePlugin = require("eslint-plugin-react-native");

module.exports = defineConfig([
  ...expoConfig,
  {
    ignores: ["dist/*"],
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react-native": reactNativePlugin,
    },
    rules: {
      // ✅ Enforce wrapping text in <Text>
      "react-native/no-raw-text": "error",

      // Add or adjust TypeScript rules if needed
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
]);
