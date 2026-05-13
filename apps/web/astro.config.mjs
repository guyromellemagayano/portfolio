import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import react from "@astrojs/react";
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
const DEFAULT_DEVELOPMENT_SITE_URL = "http://localhost:4321";
const sentryClientInitPath = fileURLToPath(
  new URL("./sentry.client.config.ts", import.meta.url)
);
const sentryServerInitPath = fileURLToPath(
  new URL("./sentry.server.config.ts", import.meta.url)
);
const LOCAL_DEV_ALLOWED_HOSTS = ["localhost", "127.0.0.1"];
const DEFAULT_SENTRY_ORG = "stack-market-labs";
const DEFAULT_SENTRY_PROJECT = "portfolio-web";
const DEFAULT_SENTRY_RELEASE = "portfolio-web@1.0.0";
const DEFAULT_SENTRY_TRACES_SAMPLE_RATE = 1.0;
const DEFAULT_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE = 1.0;
const DEFAULT_SENTRY_REPLAYS_SESSION_SAMPLE_RATE = 0.1;
const SENTRY_SOURCEMAP_FILES_TO_DELETE_AFTER_UPLOAD = ["dist/**/*.map"];
const LOCAL_ONLY_HOSTNAME_SUFFIXES = [".local"];
const LOCAL_ONLY_HOSTNAMES = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
]);
function readEnvValue(key) {
  return process.env[key]?.trim() ?? "";
}

function readOptionalEnvValue(key) {
  return readEnvValue(key) || undefined;
}

function readSampleRateEnvValue(key, fallback) {
  const rawValue = readOptionalEnvValue(key);

  if (!rawValue) {
    return fallback;
  }

  const value = Number(rawValue);

  return Number.isFinite(value) && value >= 0 && value <= 1 ? value : fallback;
}

function getExplicitSentryRelease() {
  return (
    readOptionalEnvValue("SENTRY_RELEASE") ??
    readOptionalEnvValue("VERCEL_GIT_COMMIT_SHA") ??
    readOptionalEnvValue("GIT_HASH")
  );
}

function getSentryRelease() {
  return getExplicitSentryRelease() ?? DEFAULT_SENTRY_RELEASE;
}

function syncSentryReleaseEnv(release) {
  if (release) {
    process.env.SENTRY_RELEASE = release;

    return;
  }

  delete process.env.SENTRY_RELEASE;
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
  const org = readOptionalEnvValue("SENTRY_ORG") ?? DEFAULT_SENTRY_ORG;
  const project =
    readOptionalEnvValue("SENTRY_PROJECT") ?? DEFAULT_SENTRY_PROJECT;
  const hasDsn = Boolean(dsn);
  const release = getExplicitSentryRelease();
  const canUploadSourceMaps = Boolean(authToken && org && project && release);

  syncSentryReleaseEnv(release);

  return {
    authToken,
    clientInitPath: sentryClientInitPath,
    enabled: {
      client: hasDsn,
      server: hasDsn,
    },
    org,
    project,
    serverInitPath: sentryServerInitPath,
    sourcemaps: {
      disable: canUploadSourceMaps ? false : true,
      filesToDeleteAfterUpload: canUploadSourceMaps
        ? SENTRY_SOURCEMAP_FILES_TO_DELETE_AFTER_UPLOAD
        : undefined,
    },
    telemetry: false,
  };
}

function getSentryPublicRuntimeEnv() {
  return {
    "import.meta.env.PUBLIC_SENTRY_DSN": JSON.stringify(
      readOptionalEnvValue("SENTRY_DSN") ?? ""
    ),
    "import.meta.env.PUBLIC_VERCEL_ENV": JSON.stringify(
      resolveSiteUrlEnvironment()
    ),
    "import.meta.env.PUBLIC_SENTRY_RELEASE": JSON.stringify(
      getSentryRelease() ?? ""
    ),
    "import.meta.env.PUBLIC_SENTRY_TRACES_SAMPLE_RATE": JSON.stringify(
      String(
        readSampleRateEnvValue(
          "SENTRY_TRACES_SAMPLE_RATE",
          DEFAULT_SENTRY_TRACES_SAMPLE_RATE
        )
      )
    ),
    "import.meta.env.PUBLIC_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE":
      JSON.stringify(
        String(
          readSampleRateEnvValue(
            "SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE",
            DEFAULT_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE
          )
        )
      ),
    "import.meta.env.PUBLIC_SENTRY_REPLAYS_SESSION_SAMPLE_RATE": JSON.stringify(
      String(
        readSampleRateEnvValue(
          "SENTRY_REPLAYS_SESSION_SAMPLE_RATE",
          DEFAULT_SENTRY_REPLAYS_SESSION_SAMPLE_RATE
        )
      )
    ),
  };
}

export default defineConfig({
  redirects: {
    "/privacy": "/transparency",
  },
  site,
  integrations: [
    react(),
    sentry(getSentryBuildOptions()),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/+$/, "") || "/";

        return (
          !pathname.endsWith(".xml") &&
          pathname !== "/privacy" &&
          pathname !== "/work"
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
