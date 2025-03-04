import { type TextareaHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const TextareaClient = lazy(async () => {
  const module = await import("./Textarea.client");
  return { default: module.TextareaClient };
});

export type TextareaRef = HTMLTextAreaElement;
export type TextareaProps = TextareaHTMLAttributes<TextareaRef> &
  CommonComponentProps;

/**
 * Render the default textarea server component.
 * @param {TextareaProps} props - The default textarea server component properties
 * @returns The rendered default textarea server component
 */
export const Textarea = ({
  isClient = false,
  children,
  ...rest
}: TextareaProps) => {
  const element = <textarea {...rest}>{children}</textarea>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TextareaClient {...rest}>{children}</TextareaClient>
      </Suspense>
    );
  }

  return element;
};

Textarea.displayName = "Textarea";
