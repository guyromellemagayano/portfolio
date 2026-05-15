const { existsSync } = require("node:fs");

const chromePath = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].find((candidate) => candidate && existsSync(candidate));

module.exports = {
  ci: {
    collect: {
      ...(chromePath ? { chromePath } : {}),
      staticDistDir: "./apps/web/dist",
      url: [
        "http://localhost/",
        "http://localhost/work/",
        "http://localhost/capabilities/",
        "http://localhost/about/",
        "http://localhost/labs/",
        "http://localhost/notes/",
        "http://localhost/uses/",
        "http://localhost/contact/",
        "http://localhost/transparency/",
      ],
      numberOfRuns: 3,
      settings: {
        chromeFlags: "--headless=new --no-sandbox",
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
      },
    },
    assert: {
      assertions: {
        "categories:accessibility": [
          "error",
          { minScore: 0.95, aggregationMethod: "optimistic" },
        ],
        "categories:best-practices": [
          "error",
          { minScore: 0.95, aggregationMethod: "optimistic" },
        ],
        "categories:performance": [
          "warn",
          { minScore: 0.85, aggregationMethod: "optimistic" },
        ],
        "categories:seo": [
          "error",
          { minScore: 0.95, aggregationMethod: "optimistic" },
        ],
        "cumulative-layout-shift": [
          "warn",
          { maxNumericValue: 0.1, aggregationMethod: "optimistic" },
        ],
        "largest-contentful-paint": [
          "warn",
          { maxNumericValue: 2500, aggregationMethod: "optimistic" },
        ],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci/reports",
    },
  },
};
