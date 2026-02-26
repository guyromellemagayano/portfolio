/**
 * @file packages/sanity-studio/src/schema-types/page.ts
 * @author Guy Romelle Magayano
 * @description Sanity schema definition for standalone page documents shared across apps.
 */

import { defineArrayMember, defineField, defineType } from "sanity";

const RESERVED_ROOT_PAGE_SLUGS = new Set([
  "about",
  "api",
  "articles",
  "contact",
  "feed.xml",
  "projects",
  "studio",
  "uses",
]);

function getNormalizedSlugCurrentValue(value: unknown): string | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const currentValue = (value as { current?: unknown }).current;

  if (typeof currentValue !== "string") {
    return null;
  }

  const normalizedSlug = currentValue.trim().toLowerCase();

  return normalizedSlug.length > 0 ? normalizedSlug : null;
}

export const pageSchema = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(2).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) =>
        rule.required().custom((value) => {
          const normalizedSlug = getNormalizedSlugCurrentValue(value);

          if (
            !normalizedSlug ||
            !RESERVED_ROOT_PAGE_SLUGS.has(normalizedSlug)
          ) {
            return true;
          }

          return `Slug "${normalizedSlug}" is reserved by the app router. Choose another slug.`;
        }),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 4,
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "title",
          title: "SEO title",
          description:
            "Optional title override for search results and metadata (<title>).",
          type: "string",
          validation: (rule) => rule.max(70),
        }),
        defineField({
          name: "description",
          title: "Description",
          description:
            "Optional meta description override used for search and social previews.",
          type: "text",
          rows: 3,
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: "canonicalPath",
          title: "Canonical path",
          description:
            "Optional canonical path (for example /about-me). Must start with /.",
          type: "string",
          validation: (rule) =>
            rule.custom((value) => {
              if (typeof value !== "string" || value.trim().length === 0) {
                return true;
              }

              return value.trim().startsWith("/")
                ? true
                : "Canonical path must start with /.";
            }),
        }),
        defineField({
          name: "noIndex",
          title: "No index",
          description: "Adds a noindex robots directive for this page.",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "noFollow",
          title: "No follow",
          description: "Adds a nofollow robots directive for this page.",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "ogTitle",
          title: "Open Graph title",
          description: "Optional social preview title override.",
          type: "string",
          validation: (rule) => rule.max(120),
        }),
        defineField({
          name: "ogDescription",
          title: "Open Graph description",
          description: "Optional social preview description override.",
          type: "text",
          rows: 3,
          validation: (rule) => rule.max(200),
        }),
        defineField({
          name: "ogImage",
          title: "Open Graph image",
          description: "Optional social preview image override.",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        defineField({
          name: "twitterCard",
          title: "Twitter card",
          description:
            "Optional Twitter card override. Defaults are derived from available images.",
          type: "string",
          options: {
            list: [
              { title: "Summary", value: "summary" },
              {
                title: "Summary large image",
                value: "summary_large_image",
              },
            ],
            layout: "radio",
          },
        }),
        defineField({
          name: "hideFromSitemap",
          title: "Hide from sitemap",
          description:
            "Excludes this page from the generated sitemap.xml output.",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
    prepare(selection) {
      const slug =
        typeof selection.subtitle === "string" && selection.subtitle.trim()
          ? `/${selection.subtitle.trim()}`
          : "No slug";

      return {
        ...selection,
        subtitle: slug,
      };
    },
  },
});
