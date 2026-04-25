/**
 * @file apps/web/src/lib/i18n.ts
 * @author Guy Romelle Magayano
 * @description Lightweight message lookup helpers for Astro-rendered React components.
 */

import messages from "../../messages/en.json";

type MessageRecord = Record<string, unknown>;

/** Resolves a dot-path value from the English message catalog. */
function resolveMessage(path: string): string {
  const value = path
    .split(".")
    .reduce<unknown>(
      (currentValue, segment) =>
        currentValue && typeof currentValue === "object"
          ? (currentValue as MessageRecord)[segment]
          : undefined,
      messages
    );

  return typeof value === "string" ? value : path;
}

/** Interpolates simple `{name}` placeholders in localized strings. */
function interpolateMessage(
  message: string,
  values?: Record<string, string | number>
): string {
  if (!values) {
    return message;
  }

  return Object.entries(values).reduce(
    (currentMessage, [key, value]) =>
      currentMessage.replaceAll(`{${key}}`, String(value)),
    message
  );
}

/** Creates a scoped translation function for the message catalog. */
function createTranslator(namespace?: string) {
  return (key: string, values?: Record<string, string | number>): string => {
    const path = namespace ? `${namespace}.${key}` : key;

    return interpolateMessage(resolveMessage(path), values);
  };
}

/** Returns a scoped translation function compatible with the old component call sites. */
// eslint-disable-next-line react-x/no-unnecessary-use-prefix
export function useTranslations(namespace?: string) {
  return createTranslator(namespace);
}

/** Server-side alias for shared utilities that previously requested translations. */
export async function getTranslations(namespace?: string) {
  return createTranslator(namespace);
}
