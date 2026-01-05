import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier/flat";

export default tseslint.config([
  globalIgnores(["dist", "src/routeTree.gen.ts"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      tanstackQuery.configs["flat/recommended"],
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    rules: {
      "react/jsx-no-target-blank": "off",
      "react/prop-types": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true },
      ],
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": [
        "error",
        { variables: false, functions: false, classes: false },
      ],
      "prefer-const": [
        "error",
        {
          destructuring: "any",
          ignoreReadBeforeAssign: false,
        },
      ],
    },
    settings: { react: { version: "detect" } },
  },
]);
