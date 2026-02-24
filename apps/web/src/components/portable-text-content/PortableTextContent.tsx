/**
 * @file apps/web/src/components/portable-text-content/PortableTextContent.tsx
 * @author Guy Romelle Magayano
 * @description Renders Sanity Portable Text article body content with shared renderers.
 */

import { PortableText } from "next-sanity";

import {
  createPortableTextContentComponents,
  type PortableTextContentValue,
} from "./PortableTextContent.renderers";

type PortableTextContentProps = {
  value: PortableTextContentValue;
  fallbackImageAlt?: string;
};

export function PortableTextContent(props: PortableTextContentProps) {
  const { value, fallbackImageAlt } = props;
  const components = createPortableTextContentComponents({
    fallbackImageAlt,
  });

  return <PortableText value={value} components={components} />;
}

PortableTextContent.displayName = "PortableTextContent";
