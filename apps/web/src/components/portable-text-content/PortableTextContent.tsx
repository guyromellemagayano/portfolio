/**
 * @file apps/web/src/components/portable-text-content/PortableTextContent.tsx
 * @author Guy Romelle Magayano
 * @description Renders Sanity Portable Text article body content with shared renderers.
 */

import React from "react";

import { PortableText } from "next-sanity";

import {
  createPortableTextContentComponents,
  type PortableTextContentValue,
} from "./PortableTextContent.renderers";

export type PortableTextContentType = typeof PortableText;
export type PortableTextContentProps<P extends Record<string, unknown> = {}> =
  Omit<
    React.ComponentPropsWithRef<PortableTextContentType>,
    "as" | "value" | "components"
  > &
    P & {
      as?: PortableTextContentType;
      value: PortableTextContentValue;
      fallbackImageAlt?: string;
    };

export function PortableTextContent<P extends Record<string, unknown> = {}>(
  props: PortableTextContentProps<P>
) {
  const {
    as: Component = PortableText,
    value,
    fallbackImageAlt,
    ...rest
  } = props;

  const components = createPortableTextContentComponents({
    fallbackImageAlt,
  });

  return (
    <Component
      {...(rest as Omit<
        React.ComponentPropsWithoutRef<PortableTextContentType>,
        "value" | "components"
      >)}
      value={value}
      components={components}
    />
  );
}

PortableTextContent.displayName = "PortableTextContent";
