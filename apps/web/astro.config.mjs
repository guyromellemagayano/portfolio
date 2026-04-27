import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

const DEFAULT_SITE_URL = "https://www.guyromellemagayano.com";
const LOCAL_ONLY_HOSTNAME_SUFFIXES = [".local"];
const LOCAL_ONLY_HOSTNAMES = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
]);

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

    if (isLocalOnlyHostname(parsed.hostname)) {
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
  [
    process.env.PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.SITEMAP_SITE_URL,
    process.env.VERCEL_URL,
    DEFAULT_SITE_URL,
  ]
    .map(normalizeSiteUrlCandidate)
    .find(Boolean) || DEFAULT_SITE_URL;

export default defineConfig({
  site,
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/+$/, "") || "/";

        return pathname !== "/contact" && !pathname.endsWith(".xml");
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
  },
});
