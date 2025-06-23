import {
  defineField,
  type FieldDefinition,
  type SlugifierFn,
  type SlugValidationContext,
} from "sanity";
import slugify from "slugify";

import { SlugField } from "@studio/components";

import type { PathnameParams } from "./types";

/**
 * Creates a fully-configured Sanity **slug** field.
 *
 * - Falls back to `{ name: "slug", title: "URL" }` if no schema is supplied.
 * - Preserves any custom `components`, `options`, or other overrides passed in
 *   through `schema`.
 * - Injects the `isUnique` validator unless one is already provided.
 */
export const defineSlug = (
  schema: PathnameParams = { name: "slug" }
): FieldDefinition<"slug"> => {
  const slugOptions = schema?.options;

  return defineField({
    ...schema,
    name: schema.name ?? "slug",
    title: schema?.title ?? "URL",
    type: "slug",
    components: {
      ...schema.components,
      field: schema.components?.field ?? SlugField,
    },
    options: {
      ...(slugOptions ?? {}),
      isUnique: slugOptions?.isUnique ?? isUnique,
    },
  });
};

/**
 * Checks whether another document (excluding drafts of the same doc) already
 * uses the proposed slug. Returns `true` when **no** conflicts are found.
 */
export const isUnique = async (
  slug: string,
  context: SlugValidationContext
): Promise<boolean> => {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: "2025-02-10" });
  const id = document?._id.replace(/^drafts\./, "");
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };
  const query = "*[!(_id in [$draft, $published]) && slug.current == $slug]";
  const result = await client.fetch(query, params);
  console.log("🚀 ~ isUnique:", result);
  return result.length === 0;
};

/**
 * Adds a path prefix for certain document types.
 *
 * e.g. `blogPost` to `"blogPost"`, but core pages like `"page"` return an empty
 * string so that `/page-title` isn’t double-prefixed.
 */
export const getDocTypePrefix = (type: string): string =>
  ["page"].includes(type) ? "" : type;

/**
 * Serves as a slugifier.
 *
 * - Handles special singletons (`homePage`, `blogIndex`, …) via `slugMapper`.
 * - Otherwise slugifies the input text, prepending a doc-type prefix where
 *   applicable, and always returns an **absolute** path that begins with `/`.
 */
export const createSlug: SlugifierFn = (
  input,
  _,
  { parent }
): string | Promise<string> => {
  const { _type } = parent as {
    _type: string;
  };
  const slugMapper = {
    homePage: "/",
    blogIndex: "/blog",
  } as Record<string, string>;

  if (slugMapper[_type]) return slugMapper[_type];

  const prefix = getDocTypePrefix(_type);
  const slug = slugify(input, {
    lower: true,
    remove: /[^a-zA-Z0-9 ]/g,
  });

  return `/${[prefix, slug].filter(Boolean).join("/")}`;
};
