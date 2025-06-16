import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/src/generated/**",
      "**/dist/**",
      "**/build/**"
    ]
  },
  {
    files: ["**/e2e/**/*.ts", "**/e2e/**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_", 
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_" 
      }],
      "react-hooks/rules-of-hooks": "off" // Playwrightのテストファイルではこのルールを無効化
    }
  },
  {
    files: ["**/src/app/error.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off"
    }
  }
];

export default eslintConfig;
