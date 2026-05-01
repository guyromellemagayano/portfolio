import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sitemap from "@astrojs/sitemap";
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

function isProductionRuntime() {
  return resolveSiteUrlEnvironment() === "production";
}

function resolveSiteUrlEnvironment() {
  const vercelEnvironment = process.env.VERCEL_ENV?.trim();

  if (
    vercelEnvironment === "production" ||
    vercelEnvironment === "preview" ||
    vercelEnvironment === "development"
  ) {
    return vercelEnvironment;
  }

  return process.env.NODE_ENV === "development" ? "development" : "production";
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
        process.env.SITE_URL_PRODUCTION,
        process.env.VERCEL_PROJECT_PRODUCTION_URL,
        process.env.VERCEL_URL,
      ];
    case "preview":
      return [process.env.SITE_URL_PREVIEW, process.env.VERCEL_URL];
    case "development":
    default:
      return [process.env.SITE_URL_DEVELOPMENT];
  }
}

export default defineConfig({
  site,
  integrations: [
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
