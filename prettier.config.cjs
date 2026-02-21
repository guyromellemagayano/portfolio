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
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  overrides: [
    {
      files: ["**/*.{mjs,cjs,mts,cts,js,ts,jsx,tsx}"],
      options: {
        parser: "typescript",
        importOrder: [
          "^react$",
          "^react-dom$",
          "^react\\b",
          "",
          "^node:",
          "^@(?!portfolio|packages/|admin/|api/|web/).+",
          "^[a-z]",
          "",
          "^@portfolio/",
          "^~",
          "",
          "^@admin/",
          "",
          "^@api/",
          "",
          "^@web/",
          "",
          "^\\.",
        ],
        importOrderCaseSensitive: false,
      },
    },
    {
      files: ["**/dist/**", "**/.next/**", "**/build/**", "*.d.ts"],
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
