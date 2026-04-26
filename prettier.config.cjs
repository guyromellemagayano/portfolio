const baseConfig = require("@portfolio/config-eslint/prettier");

/** @type {import("prettier").Config} */
module.exports = {
  ...baseConfig,
  overrides: [
    ...(baseConfig.overrides ?? []),
    {
      files: ["**/*.md"],
      options: {
        proseWrap: "never",
      },
    },
  ],
};
