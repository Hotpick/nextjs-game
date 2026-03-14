import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import react from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tseslint.configs.strictTypeChecked,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      react,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^react", "^next", "^\\w"], ["^@/"], ["^\\."]],
        },
      ],
      "simple-import-sort/exports": "error",
      ...react.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".claude/**",
  ]),
]);

export default eslintConfig;
