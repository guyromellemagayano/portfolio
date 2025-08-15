/* eslint-disable no-undef */
module.exports = {
  plugins: {
    "postcss-import": {},
    "@tailwindcss/postcss": {},
    "postcss-nesting": {},
    "postcss-preset-env": {},
    "postcss-focus-visible": {},
    // CSS module obfuscation based on environment
    "postcss-modules": {
      generateScopedName: (name, filename, _css) => {
        const isDevelopment = process.env.NODE_ENV === "development";
        const isStaging = process.env.NODE_ENV === "staging";
        const isProduction = process.env.NODE_ENV === "production";

        if (isDevelopment) {
          return name;
        }

        if (isStaging || isProduction) {
          // Generate a hash based on the file path and class name
          const hash = require("crypto")
            .createHash("md5")
            .update(filename + name)
            .digest("hex")
            .substring(0, 8);
          return `${name}_${hash}`;
        }

        return name;
      },
    },
  },
};
