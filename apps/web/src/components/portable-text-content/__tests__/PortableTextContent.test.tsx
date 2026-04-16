/**
 * @file apps/web/src/components/portable-text-content/__tests__/PortableTextContent.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the PortableTextContent component.
 */

/* eslint-disable @next/next/no-img-element */

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { PortableTextContent } from "../PortableTextContent";

import "@testing-library/jest-dom";

vi.mock("next/image", () => ({
  default: function Image({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) {
    return <img src={src} alt={alt} {...props} />;
  },
}));

describe("PortableTextContent", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders image blocks with normalized dimensions and caption", () => {
    render(
      <PortableTextContent
        value={[
          {
            _key: "image-1",
            _type: "image",
            alt: "Inline image caption",
            asset: {
              url: "https://cdn.example.com/images/demo/production/example.jpg",
              width: 1200,
              height: 800,
            },
          },
        ]}
      />
    );

    const image = screen.getByRole("img", { name: "Inline image caption" });
    expect(image).toHaveAttribute(
      "src",
      "https://cdn.example.com/images/demo/production/example.jpg"
    );
    expect(image).toHaveAttribute("width", "1200");
    expect(image).toHaveAttribute("height", "800");
    expect(screen.getByText("Inline image caption")).toBeInTheDocument();
  });

  it("falls back to default dimensions and fallback alt text for images", () => {
    render(
      <PortableTextContent
        fallbackImageAlt="Fallback article title"
        value={[
          {
            _key: "image-1",
            _type: "image",
            asset: {
              url: "https://cdn.example.com/images/demo/production/example.jpg",
            },
          },
        ]}
      />
    );

    const image = screen.getByRole("img", { name: "Fallback article title" });
    expect(image).toHaveAttribute("width", "1600");
    expect(image).toHaveAttribute("height", "900");
  });

  it("renders external links with secure target and rel attributes", () => {
    render(
      <PortableTextContent
        value={[
          {
            _key: "block-1",
            _type: "block",
            children: [
              {
                _key: "span-1",
                _type: "span",
                text: "External link",
                marks: ["link-1"],
              },
            ],
            markDefs: [
              {
                _key: "link-1",
                _type: "link",
                href: "https://example.com/docs",
              },
            ],
          },
        ]}
      />
    );

    const link = screen.getByRole("link", { name: "External link" });

    expect(link).toHaveAttribute("href", "https://example.com/docs");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders internal reference links without external link attributes", () => {
    render(
      <PortableTextContent
        value={[
          {
            _key: "block-1",
            _type: "block",
            children: [
              {
                _key: "span-1",
                _type: "span",
                text: "Related article",
                marks: ["mark-1"],
              },
            ],
            markDefs: [
              {
                _key: "mark-1",
                _type: "internalLink",
                documentType: "article",
                slug: {
                  current: "deep-dive",
                },
              },
            ],
          },
        ]}
      />
    );

    const link = screen.getByRole("link", { name: "Related article" });

    expect(link).toHaveAttribute("href", "/articles/deep-dive");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("renders code, callout, embed, and reference custom block types", () => {
    render(
      <PortableTextContent
        value={[
          {
            _key: "code-1",
            _type: "code",
            code: "console.log('hello')",
            language: "ts",
            filename: "example.ts",
          },
          {
            _key: "callout-1",
            _type: "callout",
            tone: "warning",
            title: "Heads up",
            body: "This is a callout block.",
          },
          {
            _key: "embed-1",
            _type: "embed",
            url: "https://youtu.be/dQw4w9WgXcQ",
            title: "Demo video",
          },
          {
            _key: "ref-1",
            _type: "reference",
            document: {
              _type: "article",
              title: "Referenced article",
              slug: {
                current: "referenced-article",
              },
            },
          },
        ]}
      />
    );

    expect(screen.getByText("example.ts • ts")).toBeInTheDocument();
    expect(screen.getByText("console.log('hello')")).toBeInTheDocument();

    const callout = screen.getByRole("note", { name: "Heads up" });
    expect(callout).toHaveTextContent("This is a callout block.");

    const iframe = screen.getByTitle("Demo video");
    expect(iframe.tagName).toBe("IFRAME");
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    );

    const referenceLink = screen.getByRole("link", {
      name: "Referenced article",
    });
    expect(referenceLink).toHaveAttribute(
      "href",
      "/articles/referenced-article"
    );
  });

  it("does not render unsafe javascript links", () => {
    render(
      <PortableTextContent
        value={[
          {
            _key: "block-1",
            _type: "block",
            children: [
              {
                _key: "span-1",
                _type: "span",
                text: "Unsafe link",
                marks: ["link-1"],
              },
            ],
            markDefs: [
              {
                _key: "link-1",
                _type: "link",
                href: "javascript:alert('xss')",
              },
            ],
          },
        ]}
      />
    );

    expect(screen.queryByRole("link", { name: "Unsafe link" })).toBeNull();
    expect(screen.getByText("Unsafe link")).toBeInTheDocument();
  });
});
