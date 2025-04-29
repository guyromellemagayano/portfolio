import { config as reactConfig } from "@guyromellemagayano/eslint-config/react";
import sanityStudio from "@sanity/eslint-config-studio";

/** @type {import("eslint").Linter.Config} */
export default [
  ...reactConfig,
  ...sanityStudio,
  {
    ignores: [".sanity"],
  },
];
