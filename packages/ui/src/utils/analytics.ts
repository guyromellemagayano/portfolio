import { type ComponentAnalyticsAttributes } from "@portfolio/components";

function toAnalyticsAttributeName(key: string) {
  const normalized = key
    .replace(/([a-z0-9])([A-Z])/gu, "$1-$2")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "");

  return normalized ? `data-analytics-${normalized}` : undefined;
}

export function getAnalyticsAttributes(
  analytics: ComponentAnalyticsAttributes | undefined
) {
  const attributes: Record<string, string> = {};

  if (!analytics) {
    return attributes;
  }

  for (const [key, value] of Object.entries(analytics)) {
    if (value === null || value === undefined) {
      continue;
    }

    const attributeName = toAnalyticsAttributeName(key);

    if (attributeName) {
      attributes[attributeName] = String(value);
    }
  }

  return attributes;
}
