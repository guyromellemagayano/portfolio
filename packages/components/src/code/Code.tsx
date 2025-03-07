import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const CodeClient = lazy(async () => {
  const module = await import("./Code.client");
  return { default: module.CodeClient };
});

export type CodeRef = React.ElementRef<"code">;
export type CodeProps = React.ComponentPropsWithoutRef<"code"> &
  CommonComponentProps;

/**
 * Render the default code server component.
 * @param {CodeProps} props - The default code server component properties
 * @returns The rendered default code server component
 */
export const Code = ({ isClient = false, children, ...rest }: CodeProps) => {
  const element = <code {...rest}>{children}</code>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <CodeClient {...rest}>{children}</CodeClient>
      </Suspense>
    );
  }

  return element;
};

Code.displayName = "Code";
