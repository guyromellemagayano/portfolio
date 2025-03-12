import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const TemplateClient = lazy(async () => {
  const module = await import("./Template.client");
  return { default: module.TemplateClient };
});

export type TemplateRef = React.ElementRef<"template">;
export type TemplateProps = React.ComponentPropsWithoutRef<"template"> &
  CommonComponentProps;

/**
 * Render the default content template server component.
 * @param {TemplateProps} props - The default content template server component properties
 * @returns The rendered default content template server component
 */
export const Template = ({
  isClient = false,
  children,
  ...rest
}: TemplateProps) => {
  const element = <template {...rest}>{children}</template>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TemplateClient {...rest}>{children}</TemplateClient>
      </Suspense>
    );
  }

  return element;
};

Template.displayName = "Template";
