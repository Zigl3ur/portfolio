import eslintPluginAstro from "eslint-plugin-astro";
import { globalIgnores } from "eslint/config";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

const rules = {
  // enforce consistent use of semicolons
  semi: ["error", "always"],
  // enforce consistent quotes
  quotes: ["error", "double"],
  // disallow unused variables
  "no-unused-vars": "error",
  // enforce consistent comma style
  "comma-dangle": ["error", "never"],
  // ensure proper spacing before/after keywords
  "keyword-spacing": ["error", { before: true, after: true }],
  // enforce consistent spacing inside braces
  "object-curly-spacing": ["error", "always"]
};

const tsRules = {
  ...rules,
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": "error"
};

export default [
  // TypeScript and TSX files configuration
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    rules: tsRules
  },
  // Astro files configuration
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.astro"],
    rules
  },
  globalIgnores([
    ".**/",
    ".*/",
    "dist/**",
    ".astro/**",
    "node_modules/**",
    "bun.lock",
    "**/env.d.ts",
    "**/*.d.ts",
    "astro.config.mjs",
    "tsconfig.json"
  ])
];
