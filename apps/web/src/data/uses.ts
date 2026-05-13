/**
 * @file apps/web/src/data/uses.ts
 * @author Guy Romelle Magayano
 * @description Uses page data parsed from local JSON records.
 */

import rawUsesDataJson from "@web/data/uses.json";
import {
  assertExactKeys,
  assertUniqueValues,
  expectArray,
  expectEnum,
  expectHref,
  expectOptionalString,
  expectRecord,
  expectString,
} from "@web/lib/json-data";

const LINK_TARGETS = ["_blank", "_self"] as const;

type UseLinkTarget = (typeof LINK_TARGETS)[number];

export interface UseItem {
  name: string;
  summary: string;
  link?: {
    label: string;
    href: string;
    target?: UseLinkTarget;
    rel?: string;
  };
}

export interface UseCategory {
  id: string;
  title: string;
  intro: string;
  items: UseItem[];
}

type UsesData = {
  useCategories: UseCategory[];
};

const USES_DATA_KEYS = ["useCategories"] as const;
const USE_CATEGORY_KEYS = ["id", "title", "intro", "items"] as const;
const USE_ITEM_KEYS = ["name", "summary", "link"] as const;
const USE_LINK_KEYS = ["label", "href", "target", "rel"] as const;

function parseUseItemLink(
  value: unknown,
  path: string
): NonNullable<UseItem["link"]> {
  const record = expectRecord(value, path);

  assertExactKeys(record, USE_LINK_KEYS, path);

  const href = expectHref(record.href, `${path}.href`);
  const target =
    typeof record.target === "undefined"
      ? undefined
      : expectEnum(record.target, LINK_TARGETS, `${path}.target`);
  const rel = expectOptionalString(record.rel, `${path}.rel`);

  if (target === "_blank") {
    const relTokens = new Set((rel ?? "").split(/\s+/).filter(Boolean));

    if (!relTokens.has("noopener") || !relTokens.has("noreferrer")) {
      throw new Error(
        `Invalid local data at "${path}.rel": links with \`target="_blank"\` must include both \`noopener\` and \`noreferrer\`.`
      );
    }
  }

  return {
    label: expectString(record.label, `${path}.label`),
    href,
    target,
    rel,
  };
}

function parseUseItem(value: unknown, path: string): UseItem {
  const record = expectRecord(value, path);

  assertExactKeys(record, USE_ITEM_KEYS, path);

  return {
    name: expectString(record.name, `${path}.name`),
    summary: expectString(record.summary, `${path}.summary`),
    link:
      typeof record.link === "undefined"
        ? undefined
        : parseUseItemLink(record.link, `${path}.link`),
  };
}

function parseUseCategory(value: unknown, path: string): UseCategory {
  const record = expectRecord(value, path);

  assertExactKeys(record, USE_CATEGORY_KEYS, path);

  const items = expectArray(record.items, `${path}.items`).map((entry, index) =>
    parseUseItem(entry, `${path}.items[${index}]`)
  );

  assertUniqueValues(
    items.map((item) => item.name),
    "use item name",
    `${path}.items`
  );

  return {
    id: expectString(record.id, `${path}.id`),
    title: expectString(record.title, `${path}.title`),
    intro: expectString(record.intro, `${path}.intro`),
    items,
  };
}

function createUsesData(value: unknown): UsesData {
  const path = "data/uses.json";
  const record = expectRecord(value, path);

  assertExactKeys(record, USES_DATA_KEYS, path);

  const useCategories = expectArray(
    record.useCategories,
    `${path}.useCategories`
  ).map((entry, index) =>
    parseUseCategory(entry, `${path}.useCategories[${index}]`)
  );

  assertUniqueValues(
    useCategories.map((category) => category.id),
    "use category id",
    `${path}.useCategories`
  );

  return { useCategories };
}

const usesData = createUsesData(rawUsesDataJson as unknown);

export const useCategories: UseCategory[] = usesData.useCategories;
