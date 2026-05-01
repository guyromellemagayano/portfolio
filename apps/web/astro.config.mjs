import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sitemap from "@astrojs/sitemap";
import sentry from "@sentry/astro";
import { defineConfig } from "astro/config";

const workspaceRootEnvFile = fileURLToPath(
  new URL("../../.env", import.meta.url)
);
const shouldLoadWorkspaceEnv =
  process.env.NODE_ENV !== "test" && !process.env.VITEST;

if (
  shouldLoadWorkspaceEnv &&
  existsSync(workspaceRootEnvFile) &&
  typeof process.loadEnvFile === "function"
) {
  process.loadEnvFile(workspaceRootEnvFile);
}

const DEFAULT_SITE_URL = "https://www.guyromellemagayano.com";
const DEFAULT_DEVELOPMENT_SITE_URL = "http://portfolio.local:4321";
const LOCAL_DEV_ALLOWED_HOSTS = [
  "portfolio.local",
  "web.portfolio.orb.local",
  "portfolio-web.orb.local",
];
const DEFAULT_SENTRY_TRACES_SAMPLE_RATE = 0.1;
const LOCAL_ONLY_HOSTNAME_SUFFIXES = [".local"];
const LOCAL_ONLY_HOSTNAMES = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
]);
const LEGACY_REDIRECT_PATHS = new Set([
  "/articles",
  "/book",
  "/hire",
  "/projects",
  "/services",
]);
const LEGACY_REDIRECT_PREFIXES = ["/articles/", "/projects/"];

function readEnvValue(key) {
  return process.env[key]?.trim() ?? "";
}

function readOptionalEnvValue(key) {
  return readEnvValue(key) || undefined;
}

function readSampleRateEnvValue(key, fallback) {
  const value = Number(readEnvValue(key));

  return Number.isFinite(value) && value >= 0 && value <= 1 ? value : fallback;
}

function isProductionRuntime() {
  return resolveSiteUrlEnvironment() === "production";
}

function resolveSiteUrlEnvironment() {
  const vercelEnvironment = readEnvValue("VERCEL_ENV");

  if (
    vercelEnvironment === "production" ||
    vercelEnvironment === "preview" ||
    vercelEnvironment === "development"
  ) {
    return vercelEnvironment;
  }

  return readEnvValue("NODE_ENV") === "development"
    ? "development"
    : "production";
}

function isLocalOnlyHostname(hostname) {
  const normalizedHostname = hostname.trim().toLowerCase();

  return (
    LOCAL_ONLY_HOSTNAMES.has(normalizedHostname) ||
    LOCAL_ONLY_HOSTNAME_SUFFIXES.some((suffix) =>
      normalizedHostname.endsWith(suffix)
    )
  );
}

function normalizeSiteUrlCandidate(value) {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    return undefined;
  }

  try {
    const parsed = new URL(
      /^https?:\/\//i.test(normalizedValue)
        ? normalizedValue
        : `https://${normalizedValue}`
    );

    if (!/^https?:$/i.test(parsed.protocol)) {
      return undefined;
    }

    if (isProductionRuntime() && isLocalOnlyHostname(parsed.hostname)) {
      return undefined;
    }

    return parsed.toString().replace(/\/+$/, "");
  } catch {
    return undefined;
  }
}

function removeNonRootTrailingSlash(value) {
  const parsed = new URL(value);

  if (parsed.pathname !== "/" && parsed.pathname.endsWith("/")) {
    parsed.pathname = parsed.pathname.replace(/\/+$/, "");
  }

  return parsed.toString();
}

const site =
  getSiteUrlCandidates().map(normalizeSiteUrlCandidate).find(Boolean) ||
  getDefaultSiteUrlForEnvironment();

function getDefaultSiteUrlForEnvironment() {
  return resolveSiteUrlEnvironment() === "development"
    ? DEFAULT_DEVELOPMENT_SITE_URL
    : DEFAULT_SITE_URL;
}

function getSiteUrlCandidates() {
  switch (resolveSiteUrlEnvironment()) {
    case "production":
      return [
        readEnvValue("SITE_URL_PRODUCTION"),
        readEnvValue("VERCEL_PROJECT_PRODUCTION_URL"),
        readEnvValue("VERCEL_URL"),
      ];
    case "preview":
      return [readEnvValue("SITE_URL_PREVIEW"), readEnvValue("VERCEL_URL")];
    case "development":
    default:
      return [readEnvValue("SITE_URL_DEVELOPMENT")];
  }
}

function getSentryBuildOptions() {
  const dsn = readOptionalEnvValue("SENTRY_DSN");
  const authToken = readOptionalEnvValue("SENTRY_AUTH_TOKEN");
  const org = readOptionalEnvValue("SENTRY_ORG");
  const project = readOptionalEnvValue("SENTRY_PROJECT");
  const hasSourceMapCredentials = Boolean(authToken && org && project);

  return {
    authToken,
    enabled: Boolean(dsn),
    org,
    project,
    sourcemaps: {
      disable: hasSourceMapCredentials ? false : "disable-upload",
    },
    telemetry: false,
  };
}

function getSentryPublicRuntimeEnv() {
  return {
    "import.meta.env.PUBLIC_SENTRY_DSN": JSON.stringify(
      readOptionalEnvValue("SENTRY_DSN") ?? ""
    ),
    "import.meta.env.PUBLIC_SENTRY_ENVIRONMENT": JSON.stringify(
      readOptionalEnvValue("SENTRY_ENVIRONMENT") ?? resolveSiteUrlEnvironment()
    ),
    "import.meta.env.PUBLIC_SENTRY_RELEASE": JSON.stringify(
      readOptionalEnvValue("SENTRY_RELEASE") ??
        readOptionalEnvValue("VERCEL_GIT_COMMIT_SHA") ??
        readOptionalEnvValue("GIT_HASH") ??
        ""
    ),
    "import.meta.env.PUBLIC_SENTRY_TRACES_SAMPLE_RATE": JSON.stringify(
      String(
        readSampleRateEnvValue(
          "SENTRY_TRACES_SAMPLE_RATE",
          DEFAULT_SENTRY_TRACES_SAMPLE_RATE
        )
      )
    ),
  };
}

export default defineConfig({
  site,
  integrations: [
    sentry(getSentryBuildOptions()),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/+$/, "") || "/";

        return (
          !pathname.endsWith(".xml") &&
          !LEGACY_REDIRECT_PATHS.has(pathname) &&
          !LEGACY_REDIRECT_PREFIXES.some((prefix) =>
            pathname.startsWith(prefix)
          )
        );
      },
      namespaces: {
        image: false,
        news: false,
        video: false,
        xhtml: false,
      },
      serialize(item) {
        item.url = removeNonRootTrailingSlash(item.url);

        return item;
      },
    }),
  ],
  vite: {
    define: getSentryPublicRuntimeEnv(),
    resolve: {
      alias: {
        "@web": new URL("./src", import.meta.url).pathname,
      },
    },
    server: {
      allowedHosts: LOCAL_DEV_ALLOWED_HOSTS,
    },
  },
});
