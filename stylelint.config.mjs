/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard"],
  ignoreFiles: ["**/dist/**", "**/.next/**", "**/coverage/**"],
  rules: {
    "custom-property-pattern": null,
    "import-notation": "string",
    "property-no-vendor-prefix": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "theme",
          "source",
          "utility",
          "variant",
          "custom-variant",
          "plugin",
          "config",
          "tailwind",
          "apply",
          "layer",
          "responsive",
          "screen",
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.scss"],
      customSyntax: "postcss-scss",
    },
  ],
};
