import { createConfig } from "@packages/eslint-config";

export default createConfig({
  files: ["**/*.{js,ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  rules: {
    // Vitest-specific rules
    "vitest/expect-expect": "error",
    "vitest/no-disabled-tests": "warn",
    "vitest/no-focused-tests": "error",
    "vitest/no-identical-title": "error",
    "vitest/no-standalone-expect": "error",
    "vitest/prefer-to-be": "error",
    "vitest/prefer-to-contain": "error",
    "vitest/prefer-to-have-length": "error",
  },
});
