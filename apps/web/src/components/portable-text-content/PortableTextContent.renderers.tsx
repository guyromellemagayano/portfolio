/**
 * @file apps/web/src/components/portable-text-content/PortableTextContent.renderers.tsx
 * @author Guy Romelle Magayano
 * @description Shared Portable Text renderer map for article body content blocks and marks.
 */

import type { ReactNode } from "react";

import Image from "next/image";

import type {
  ContentPortableTextBlock,
  ContentPortableTextImageBlock,
} from "@portfolio/api-contracts/content";

const DEFAULT_PORTABLE_TEXT_IMAGE_WIDTH = 1600;
const DEFAULT_PORTABLE_TEXT_IMAGE_HEIGHT = 900;
const DEFAULT_PORTABLE_TEXT_IMAGE_SIZES = "(max-width: 1024px) 100vw, 896px";

type PortableTextImageValue = ContentPortableTextImageBlock;
type PortableTextUnknownRecord = Record<string, unknown>;

export type PortableTextContentRendererOptions = {
  fallbackImageAlt?: string;
};

/** Reads a property from an unknown record-like value. */
function getRecordValue(source: unknown, key: string): unknown {
  if (!source || typeof source !== "object" || Array.isArray(source)) {
    return undefined;
  }

  return (source as PortableTextUnknownRecord)[key];
}

/** Reads and trims a string property from an unknown object value. */
function getStringRecordValue(
  source: unknown,
  key: string
): string | undefined {
  const value = getRecordValue(source, key);

  if (typeof value !== "string") {
    return undefined;
  }

  const normalizedValue = value.trim();

  return normalizedValue.length > 0 ? normalizedValue : undefined;
}

/** Normalizes image dimension values into positive rounded integers. */
function getOptionalPositiveDimension(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return undefined;
  }

  return Math.round(value);
}

/** Resolves render-safe image dimensions for Portable Text image blocks. */
function getPortableTextImageDimensions(image: PortableTextImageValue): {
  width: number;
  height: number;
} {
  const width = getOptionalPositiveDimension(image.asset?.width);
  const height = getOptionalPositiveDimension(image.asset?.height);

  return {
    width: width ?? DEFAULT_PORTABLE_TEXT_IMAGE_WIDTH,
    height: height ?? DEFAULT_PORTABLE_TEXT_IMAGE_HEIGHT,
  };
}

/** Narrows an unknown Portable Text node into an image block value. */
function isPortableTextImageValue(
  value: unknown
): value is PortableTextImageValue {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return (value as { _type?: unknown })._type === "image";
}

/** Validates allowed `href` protocols for Portable Text links and embeds. */
function isSafePortableTextHref(href: string): boolean {
  if (href.startsWith("/") || href.startsWith("#")) {
    return true;
  }

  try {
    const parsedUrl = new URL(href);

    return (
      parsedUrl.protocol === "http:" ||
      parsedUrl.protocol === "https:" ||
      parsedUrl.protocol === "mailto:" ||
      parsedUrl.protocol === "tel:"
    );
  } catch {
    return false;
  }
}

/** Detects external HTTP(S) links to apply hardened anchor attributes. */
function isExternalPortableTextHref(href: string): boolean {
  if (href.startsWith("/") || href.startsWith("#")) {
    return false;
  }

  try {
    const parsedUrl = new URL(href);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

/** Normalizes mark children to a renderable React node. */
function getPortableTextLinkChildren(children: ReactNode): ReactNode {
  return children ?? null;
}

/** Extracts an internal reference document type from mixed Sanity mark/block shapes. */
function getInternalReferenceDocumentType(value: unknown): string | undefined {
  return (
    getStringRecordValue(value, "documentType") ||
    getStringRecordValue(getRecordValue(value, "reference"), "_type") ||
    getStringRecordValue(getRecordValue(value, "document"), "_type") ||
    getStringRecordValue(value, "_type")
  );
}

/** Extracts an internal reference slug from mixed Sanity mark/block shapes. */
function getInternalReferenceSlug(value: unknown): string | undefined {
  return (
    getStringRecordValue(getRecordValue(value, "slug"), "current") ||
    getStringRecordValue(
      getRecordValue(getRecordValue(value, "reference"), "slug"),
      "current"
    ) ||
    getStringRecordValue(
      getRecordValue(getRecordValue(value, "document"), "slug"),
      "current"
    ) ||
    getStringRecordValue(value, "slug")
  );
}

/** Builds an internal app `href` from a Sanity internal reference mark or block. */
function getInternalReferenceHref(value: unknown): string | undefined {
  const directHref = getStringRecordValue(value, "href");

  if (
    directHref &&
    (directHref.startsWith("/") || directHref.startsWith("#"))
  ) {
    return directHref;
  }

  const slug = getInternalReferenceSlug(value);

  if (!slug) {
    return undefined;
  }

  const documentType = getInternalReferenceDocumentType(value);
  const normalizedSlug = encodeURIComponent(slug);

  if (documentType === "article") {
    return `/articles/${normalizedSlug}`;
  }

  return `/${normalizedSlug}`;
}

/** Renders a styled anchor with optional external-link hardening attributes. */
function renderPortableTextAnchor(
  href: string,
  children: ReactNode,
  options?: {
    external?: boolean;
  }
) {
  const isExternal = options?.external ?? isExternalPortableTextHref(href);

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="underline decoration-zinc-400 underline-offset-4 transition-colors hover:text-zinc-900 hover:decoration-zinc-900 dark:hover:text-zinc-100 dark:hover:decoration-zinc-100"
    >
      {children}
    </a>
  );
}

/** Extracts code block fields from flexible Sanity code-like block shapes. */
function getPortableTextCodeBlockFields(value: unknown): {
  code?: string;
  language?: string;
  filename?: string;
} {
  return {
    code: getStringRecordValue(value, "code"),
    language: getStringRecordValue(value, "language"),
    filename:
      getStringRecordValue(value, "filename") ||
      getStringRecordValue(value, "title"),
  };
}

/** Extracts callout fields from common note/admonition block variants. */
function getPortableTextCalloutFields(value: unknown): {
  title?: string;
  body?: string;
  tone?: string;
} {
  return {
    title:
      getStringRecordValue(value, "title") ||
      getStringRecordValue(value, "heading") ||
      getStringRecordValue(value, "label"),
    body:
      getStringRecordValue(value, "body") ||
      getStringRecordValue(value, "text") ||
      getStringRecordValue(value, "message") ||
      getStringRecordValue(value, "description") ||
      getStringRecordValue(value, "content"),
    tone:
      getStringRecordValue(value, "tone") ||
      getStringRecordValue(value, "variant") ||
      getStringRecordValue(value, "kind"),
  };
}

/** Resolves utility classes for callout tone variants. */
function getCalloutToneClasses(tone?: string): string {
  switch (tone?.toLowerCase()) {
    case "success":
      return "border-emerald-300/70 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100";
    case "warning":
      return "border-amber-300/70 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100";
    case "error":
    case "danger":
      return "border-rose-300/70 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-100";
    case "info":
    default:
      return "border-blue-300/70 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-100";
  }
}

/** Extracts an embed URL from common Sanity embed block field names. */
function getPortableTextEmbedUrl(value: unknown): string | undefined {
  return (
    getStringRecordValue(value, "url") ||
    getStringRecordValue(value, "href") ||
    getStringRecordValue(value, "src")
  );
}

/** Resolves a stable title for embed blocks and link fallbacks. */
function getPortableTextEmbedTitle(value: unknown): string {
  return (
    getStringRecordValue(value, "title") ||
    getStringRecordValue(value, "caption") ||
    "Embedded content"
  );
}

/** Converts supported public video URLs into embeddable iframe URLs. */
function toEmbeddableIframeUrl(rawUrl: string): string | undefined {
  try {
    const parsedUrl = new URL(rawUrl);

    if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
      return undefined;
    }

    const host = parsedUrl.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "m.youtube.com") {
      const videoId = parsedUrl.searchParams.get("v");

      if (!videoId) {
        return undefined;
      }

      return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;
    }

    if (host === "youtu.be") {
      const videoId = parsedUrl.pathname.replace(/^\/+/, "");

      if (!videoId) {
        return undefined;
      }

      return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;
    }

    if (host === "vimeo.com") {
      const videoId = parsedUrl.pathname.replace(/^\/+/, "");

      if (!videoId) {
        return undefined;
      }

      return `https://player.vimeo.com/video/${encodeURIComponent(videoId)}`;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

/** Renders a Portable Text image block using `next/image` with safe dimension fallbacks. */
function renderPortableTextImage(
  imageValue: unknown,
  fallbackImageAlt?: string
): ReactNode {
  if (!isPortableTextImageValue(imageValue)) {
    return null;
  }

  const imageUrl = imageValue.asset?.url?.trim();

  if (!imageUrl) {
    return null;
  }

  const altText =
    imageValue.alt?.trim() || fallbackImageAlt?.trim() || "Article image";
  const dimensions = getPortableTextImageDimensions(imageValue);

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      <Image
        src={imageUrl}
        alt={altText}
        className="h-auto w-full object-cover"
        width={dimensions.width}
        height={dimensions.height}
        sizes={DEFAULT_PORTABLE_TEXT_IMAGE_SIZES}
        loading="lazy"
      />
      {imageValue.alt?.trim() ? (
        <figcaption className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
          {imageValue.alt.trim()}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Renders a code-like Portable Text block with optional filename and language metadata. */
function renderPortableTextCodeBlock(value: unknown): ReactNode {
  const fields = getPortableTextCodeBlockFields(value);

  if (!fields.code) {
    return null;
  }

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-950 text-zinc-100 dark:border-zinc-800">
      {fields.filename ? (
        <figcaption className="border-b border-zinc-800/80 bg-zinc-900/80 px-4 py-2 text-xs font-medium tracking-wide text-zinc-300">
          {fields.filename}
          {fields.language ? ` • ${fields.language}` : ""}
        </figcaption>
      ) : null}
      <pre className="overflow-x-auto p-4 text-sm leading-6">
        <code data-language={fields.language}>{fields.code}</code>
      </pre>
    </figure>
  );
}

/** Renders a callout/note/admonition-like Portable Text block. */
function renderPortableTextCallout(value: unknown): ReactNode {
  const fields = getPortableTextCalloutFields(value);

  if (!fields.title && !fields.body) {
    return null;
  }

  return (
    <aside
      role="note"
      aria-label={fields.title || "Callout"}
      className={`not-prose my-8 rounded-xl border px-4 py-4 ${getCalloutToneClasses(fields.tone)}`}
    >
      {fields.title ? (
        <p className="text-sm font-semibold">{fields.title}</p>
      ) : null}
      {fields.body ? (
        <p
          className={
            fields.title ? "mt-2 text-sm leading-6" : "text-sm leading-6"
          }
        >
          {fields.body}
        </p>
      ) : null}
    </aside>
  );
}

/** Renders an embed block as a safe iframe or a hardened external link fallback. */
function renderPortableTextEmbed(value: unknown): ReactNode {
  const embedUrl = getPortableTextEmbedUrl(value);

  if (!embedUrl || !isSafePortableTextHref(embedUrl)) {
    return null;
  }

  const embedTitle = getPortableTextEmbedTitle(value);
  const iframeUrl = toEmbeddableIframeUrl(embedUrl);

  if (!iframeUrl) {
    return (
      <div className="not-prose my-8 rounded-xl border border-zinc-200/60 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        {renderPortableTextAnchor(embedUrl, embedTitle, { external: true })}
      </div>
    );
  }

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-xl border border-zinc-200/60 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative aspect-video w-full">
        <iframe
          src={iframeUrl}
          title={embedTitle}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <figcaption className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
        {embedTitle}
      </figcaption>
    </figure>
  );
}

/** Renders an internal reference block as a styled inline card link. */
function renderPortableTextReferenceBlock(value: unknown): ReactNode {
  const href = getInternalReferenceHref(value);

  if (!href) {
    return null;
  }

  const label =
    getStringRecordValue(value, "title") ||
    getStringRecordValue(getRecordValue(value, "document"), "title") ||
    getStringRecordValue(getRecordValue(value, "reference"), "title") ||
    href;

  return (
    <div className="not-prose my-6 rounded-lg border border-zinc-200/60 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
      {renderPortableTextAnchor(href, label, { external: false })}
    </div>
  );
}

/**
 * Creates the Portable Text renderer map used by `next-sanity` for article content.
 *
 * @param options Renderer options used to fill content-level fallbacks.
 * @returns `marks` and `types` renderer maps for the Portable Text component.
 */
export function createPortableTextContentComponents(
  options: PortableTextContentRendererOptions
): {
  marks: Record<
    string,
    (props: { children?: ReactNode; value?: unknown }) => ReactNode
  >;
  types: Record<string, (props: { value: unknown }) => ReactNode>;
} {
  const { fallbackImageAlt } = options;

  return {
    marks: {
      link: ({ children, value }) => {
        const href = getStringRecordValue(value, "href");
        const content = getPortableTextLinkChildren(children);

        if (!href || !isSafePortableTextHref(href)) {
          return content;
        }

        return renderPortableTextAnchor(href, content);
      },
      internalLink: ({ children, value }) => {
        const href = getInternalReferenceHref(value);
        const content = getPortableTextLinkChildren(children);

        if (!href) {
          return content;
        }

        return renderPortableTextAnchor(href, content, { external: false });
      },
      internalReference: ({ children, value }) => {
        const href = getInternalReferenceHref(value);
        const content = getPortableTextLinkChildren(children);

        if (!href) {
          return content;
        }

        return renderPortableTextAnchor(href, content, { external: false });
      },
      code: ({ children }) => (
        <code className="rounded bg-zinc-100 px-1 py-0.5 text-[0.925em] text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
          {getPortableTextLinkChildren(children)}
        </code>
      ),
    },
    types: {
      image: ({ value }) => renderPortableTextImage(value, fallbackImageAlt),
      code: ({ value }) => renderPortableTextCodeBlock(value),
      callout: ({ value }) => renderPortableTextCallout(value),
      note: ({ value }) => renderPortableTextCallout(value),
      alert: ({ value }) => renderPortableTextCallout(value),
      admonition: ({ value }) => renderPortableTextCallout(value),
      embed: ({ value }) => renderPortableTextEmbed(value),
      videoEmbed: ({ value }) => renderPortableTextEmbed(value),
      youtube: ({ value }) => renderPortableTextEmbed(value),
      reference: ({ value }) => renderPortableTextReferenceBlock(value),
      internalReference: ({ value }) => renderPortableTextReferenceBlock(value),
    },
  };
}

export type PortableTextContentValue = Array<
  ContentPortableTextBlock | ContentPortableTextImageBlock
>;
