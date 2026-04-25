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
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
  ],
  overrides: [
    {
      files: ["**/*.astro"],
      options: {
        parser: "astro",
      },
    },
    {
      files: ["**/*.{mjs,cjs,mts,cts,js,ts,jsx,tsx}"],
      options: {
        parser: "typescript",
      },
    },
    {
      files: ["**/dist/**", "**/.astro/**", "**/build/**", "*.d.ts"],
      options: { requirePragma: true },
    },
    {
      files: ["**/*.{json,jsonc}"],
      options: {
        parser: "json-stringify",
      },
    },
  ],
};
