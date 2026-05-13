export default {
  "*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}": [
    "pnpm exec eslint --fix --max-warnings 0",
    "pnpm exec prettier --write",
  ],
  "*.astro": [
    "pnpm exec eslint --fix --max-warnings 0",
    "pnpm exec prettier --write",
  ],
  "*.{css,scss}": ["pnpm exec stylelint --fix", "pnpm exec prettier --write"],
  "*.{html,json,jsonc,md,mdx,yaml,yml}": "pnpm exec prettier --write",
  "*.mdc": "pnpm exec prettier --write --parser markdown",
};
