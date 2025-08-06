/* eslint-env node */
/* eslint-disable no-undef */
const isProduction = process.env.NODE_ENV === "production";

// TODO: Add utilities to exclude from obfuscation
// const layoutUtilities = ["container", "mx-auto", "max-w-*", "w-*", "h-*"];
// const spacingUtilities = ["px-*", "py-*", "pt-*", "pb-*", "pl-*", "pr-*"];
// const typographyUtilities = ["text-*", "font-*", "leading-*", "tracking-*"];
// const backgroundUtilities = ["bg-*", "from-*", "to-*", "via-*"];
// const borderUtilities = ["border-*", "rounded-*", "shadow-*"];
// const interactiveUtilities = ["hover:*", "focus:*", "active:*", "disabled:*"];
// const darkModeUtilities = ["dark:*"];
// const responsiveUtilities = ["sm:*", "md:*", "lg:*", "xl:*", "2xl:*"];
// const flexboxUtilities = ["flex", "grid", "flex-*", "grid-*", "col-*", "row-*"];
// const positionUtilities = ["relative", "absolute", "fixed", "sticky"];
// const displayUtilities = ["block", "inline", "inline-block", "hidden"];
// const zIndexUtilities = ["z-*"];
// const opacityUtilities = ["opacity-*"];
// const transformUtilities = ["transform", "scale-*", "rotate-*", "translate-*"];
// const transitionUtilities = ["transition-*", "duration-*", "ease-*"];
// const animationUtilities = ["animate-*"];
// const cursorUtilities = ["cursor-*"];
// const overflowUtilities = ["overflow-*"];
// const objectFitUtilities = ["object-*"];
// const aspectRatioUtilities = ["aspect-*"];

// TODO: Add utilities to exclude from obfuscation
// const utilities = [
//   ...layoutUtilities,
//   ...spacingUtilities,
//   ...typographyUtilities,
//   ...backgroundUtilities,
//   ...borderUtilities,
//   ...interactiveUtilities,
//   ...darkModeUtilities,
//   ...responsiveUtilities,
//   ...flexboxUtilities,
//   ...positionUtilities,
//   ...displayUtilities,
//   ...zIndexUtilities,
//   ...opacityUtilities,
//   ...transformUtilities,
//   ...transitionUtilities,
//   ...animationUtilities,
//   ...cursorUtilities,
//   ...overflowUtilities,
//   ...objectFitUtilities,
//   ...aspectRatioUtilities,
// ];

export default {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-preset-env": {},
    "postcss-import": {},
    "postcss-nesting": {},
    "postcss-focus-visible": {},
    ...(isProduction && {
      "postcss-obfuscator": {
        obfuscateClassNames: true,
        obfuscateIds: true,
        prefix: "x",
        exclude: [],
        // Generate consistent obfuscation across builds
        seed: process.env.CSS_OBFUSCATION_SEED || "default-seed-2024",
        minify: true,
        preserveSemantics: false,
      },
    }),
  },
};
