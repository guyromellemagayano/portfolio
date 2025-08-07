/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-pkg",
    "prettier-plugin-packagejson",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "^react$",
    "^react-dom$",
    "^react\\b",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@guyromellemagayano/",
    "^@packages/",
    "^~",
    "^@admin/",
    "^@api/",
    "^@storefront/",
    "^@web/",
    "",
    "^[.]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
  importOrderCaseSensitive: false,
  parser: "json-stringify",
  overrides: [
    {
      files: ["**/*.{mjs,cjs,mts,cts,js,ts,tsx}"],
      options: {
        parser: "typescript",
      },
    },
    {
      files: ["**/dist/**", "**/.next/**", "**/build/**", "*.d.ts"],
      options: { requirePragma: true },
    },
  ],
};
