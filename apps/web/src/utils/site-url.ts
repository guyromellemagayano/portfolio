/**
 * @file apps/web/src/utils/site-url.ts
 * @author Guy Romelle Magayano
 * @description Runtime helpers for resolving a production-safe site URL base across local and Vercel environments.
 */

const LOCAL_ONLY_HOSTNAME_SUFFIXES = [".localhost", ".test"] as const;
const LOCAL_ONLY_HOSTNAMES = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
]);

/** Reads and trims an env var value from the current server runtime. */
function getEnvVar(key: string): string {
  return globalThis?.process?.env?.[key]?.trim() ?? "";
}

/** Indicates whether the current runtime should apply production URL safety checks. */
function isProductionRuntime(): boolean {
  return getEnvVar("NODE_ENV") === "production";
}

/** Indicates whether a hostname is local-only and should not be used in production metadata URLs. */
export function isLocalOnlyHostname(hostname: string): boolean {
  const normalizedHostname = hostname.trim().toLowerCase();

  if (!normalizedHostname) {
    return false;
  }

  return (
    LOCAL_ONLY_HOSTNAMES.has(normalizedHostname) ||
    LOCAL_ONLY_HOSTNAME_SUFFIXES.some((suffix) =>
      normalizedHostname.endsWith(suffix)
    )
  );
}

/** Normalizes a user-provided absolute URL string into a canonical form without a trailing slash. */
function normalizeAbsoluteUrl(value: string): string | undefined {
  try {
    const parsed = new URL(value);

    if (!/^https?:$/i.test(parsed.protocol)) {
      return undefined;
    }

    return parsed.toString().replace(/\/+$/, "");
  } catch {
    return undefined;
  }
}

/** Normalizes host-like env values by accepting either absolute URLs or bare domains. */
function normalizeHostEnvUrlCandidate(value: string): string | undefined {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return undefined;
  }

  if (/^https?:\/\//i.test(normalizedValue)) {
    return normalizeAbsoluteUrl(normalizedValue);
  }

  return normalizeAbsoluteUrl(`https://${normalizedValue}`);
}

/** Resolves the most appropriate absolute site URL base across local and Vercel runtimes. */
export function resolveSiteUrlBase(): string | undefined {
  const candidates = [
    getEnvVar("NEXT_PUBLIC_SITE_URL"),
    getEnvVar("VERCEL_PROJECT_PRODUCTION_URL"),
    getEnvVar("VERCEL_URL"),
  ];

  for (const candidate of candidates) {
    const normalizedUrl = normalizeHostEnvUrlCandidate(candidate);

    if (!normalizedUrl) {
      continue;
    }

    try {
      const parsed = new URL(normalizedUrl);

      if (isProductionRuntime() && isLocalOnlyHostname(parsed.hostname)) {
        continue;
      }
    } catch {
      continue;
    }

    return normalizedUrl;
  }

  return undefined;
}

/** Resolves the site URL base or falls back to a provided absolute default URL. */
export function resolveSiteUrlBaseOrDefault(
  fallbackAbsoluteUrl: string
): string {
  const resolvedSiteUrl = resolveSiteUrlBase();

  return (
    resolvedSiteUrl ??
    normalizeAbsoluteUrl(fallbackAbsoluteUrl) ??
    fallbackAbsoluteUrl
  );
}

/** Builds an absolute URL when given a path or normalizes an already-absolute URL. */
export function toAbsoluteSiteUrl(pathOrUrl: string): string | undefined {
  const normalizedValue = pathOrUrl.trim();

  if (!normalizedValue) {
    return undefined;
  }

  if (/^https?:\/\//i.test(normalizedValue)) {
    return normalizeAbsoluteUrl(normalizedValue);
  }

  if (!normalizedValue.startsWith("/")) {
    return undefined;
  }

  const siteUrlBase = resolveSiteUrlBase();

  return siteUrlBase ? `${siteUrlBase}${normalizedValue}` : undefined;
}
