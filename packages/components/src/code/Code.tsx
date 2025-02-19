import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const CodeClient = lazy(async () => {
  const module = await import("./Code.client");
  return { default: module.default };
});

export type CodeRef = HTMLElement;
export type CodeProps = HTMLAttributes<CodeRef> & CommonComponentProps;

/**
 * Render the default code server component.
 * @param {CodeProps} props - The default code server component properties
 * @returns The rendered default code server component
 */
const Code = ({ isClient = false, children, ...rest }: CodeProps) => {
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

export default Code;
