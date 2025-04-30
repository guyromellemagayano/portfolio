/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 100,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  arrowParens: "always",
  bracketSpacing: true,
  bracketSameLine: false,
  endOfLine: "lf",
  plugins: ["prettier-plugin-packagejson", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: ["*.md", "*.mdx"],
      options: { printWidth: 80 },
    },
    {
      files: "apps/studio/schemaTypes/**/*.ts",
      options: { printWidth: 110 },
    },
    {
      files: ["**/dist/**", "**/.next/**", "**/build/**", "**/*.d.ts"],
      options: { requirePragma: true },
    },
  ],
};

export default config;
