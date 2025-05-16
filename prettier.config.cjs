/* eslint-disable no-undef */
/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  plugins: [
    "prettier-plugin-pkg",
    "prettier-plugin-packagejson",
    "prettier-plugin-tailwindcss",
  ],
  parser: "json-stringify",
  overrides: [
    {
      files: ["**/*.{json,jsonc}"],
    },
    {
      files: ["**/*.{mjs,cjs,mts,cts}"],
      options: {
        parser: "typescript",
      },
    },
    {
      files: ["**/*.{js,ts,tsx}"],
      options: {
        parser: "typescript",
        singleQuote: true,
      },
    },
    {
      files: ["**/dist/**", "**/.next/**", "**/build/**", "*.d.ts"],
      options: { requirePragma: true },
    },
  ],
};
