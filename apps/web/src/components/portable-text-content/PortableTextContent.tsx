/**
 * @file apps/web/src/components/portable-text-content/PortableTextContent.tsx
 * @author Guy Romelle Magayano
 * @description Renders portable content body blocks with shared mark/type renderers.
 */

import React, { type ReactNode } from "react";

import {
  createPortableTextContentComponents,
  type PortableTextContentValue,
} from "./PortableTextContent.renderers";

type PortableTextMarkDef = {
  _key?: string;
  _type?: string;
  [key: string]: unknown;
};

type PortableTextSpanNode = {
  _key?: string;
  _type?: string;
  marks?: string[];
  text?: string;
};

type PortableTextBlockNode = {
  _key?: string;
  _type?: string;
  style?: string;
  listItem?: string;
  children?: PortableTextSpanNode[];
  markDefs?: PortableTextMarkDef[];
  [key: string]: unknown;
};

type PortableTextMarkRenderer = (props: {
  children?: ReactNode;
  value?: unknown;
}) => ReactNode;

type PortableTextTypeRenderer = (props: { value: unknown }) => ReactNode;

type PortableTextRendererMap = {
  marks: Record<string, PortableTextMarkRenderer>;
  types: Record<string, PortableTextTypeRenderer>;
};

export type PortableTextContentProps<P extends Record<string, unknown> = {}> =
  React.ComponentPropsWithoutRef<"div"> &
    P & {
      as?: React.ElementType;
      value: PortableTextContentValue;
      fallbackImageAlt?: string;
    };

/** Applies block marks to a span node and returns render-safe React content. */
function renderSpanWithMarks(
  span: PortableTextSpanNode,
  markDefs: PortableTextMarkDef[],
  renderers: PortableTextRendererMap
): ReactNode {
  let content: ReactNode = span.text ?? null;

  for (const mark of span.marks ?? []) {
    if (mark === "strong") {
      content = <strong>{content}</strong>;
      continue;
    }

    if (mark === "em") {
      content = <em>{content}</em>;
      continue;
    }

    if (mark === "code") {
      content = <code>{content}</code>;
      continue;
    }

    if (mark === "underline") {
      content = <u>{content}</u>;
      continue;
    }

    const markDef = markDefs.find((definition) => definition?._key === mark);
    const markType = markDef?._type;

    if (markType && renderers.marks[markType]) {
      content = renderers.marks[markType]({
        children: content,
        value: markDef,
      });
    }
  }

  return content;
}

/** Resolves semantic block wrappers for common portable text styles. */
function renderStyledBlock(style: string | undefined, children: ReactNode) {
  switch (style) {
    case "h1":
      return <h1>{children}</h1>;
    case "h2":
      return <h2>{children}</h2>;
    case "h3":
      return <h3>{children}</h3>;
    case "h4":
      return <h4>{children}</h4>;
    case "h5":
      return <h5>{children}</h5>;
    case "h6":
      return <h6>{children}</h6>;
    case "blockquote":
      return <blockquote>{children}</blockquote>;
    default:
      return <p>{children}</p>;
  }
}

/** Renders an individual portable text block node. */
function renderPortableTextBlock(
  block: PortableTextBlockNode,
  blockIndex: number,
  renderers: PortableTextRendererMap
): ReactNode {
  const blockType = block._type;
  const key = block._key ?? `portable-block-${blockIndex}`;

  if (blockType && renderers.types[blockType]) {
    return (
      <React.Fragment key={key}>
        {renderers.types[blockType]({ value: block })}
      </React.Fragment>
    );
  }

  if (blockType !== "block") {
    return null;
  }

  const children = (block.children ?? []).map((span, spanIndex) => (
    <React.Fragment key={span._key ?? `${key}-span-${spanIndex}`}>
      {renderSpanWithMarks(span, block.markDefs ?? [], renderers)}
    </React.Fragment>
  ));

  if (block.listItem) {
    return (
      <ul key={key}>
        <li>{children}</li>
      </ul>
    );
  }

  return (
    <React.Fragment key={key}>
      {renderStyledBlock(block.style, children)}
    </React.Fragment>
  );
}

export function PortableTextContent<P extends Record<string, unknown> = {}>(
  props: PortableTextContentProps<P>
) {
  const { as: Component = "div", value, fallbackImageAlt, ...rest } = props;

  const renderers = createPortableTextContentComponents({
    fallbackImageAlt,
  });

  return (
    <Component {...rest}>
      {value.map((block, index) => {
        if (!block || typeof block !== "object" || Array.isArray(block)) {
          return null;
        }

        return renderPortableTextBlock(
          block as PortableTextBlockNode,
          index,
          renderers
        );
      })}
    </Component>
  );
}

PortableTextContent.displayName = "PortableTextContent";
