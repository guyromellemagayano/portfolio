import { type ScriptHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const ScriptClient = lazy(async () => {
  const module = await import("./Script.client");
  return { default: module.ScriptClient };
});

export type ScriptRef = HTMLScriptElement;
export type ScriptProps = ScriptHTMLAttributes<ScriptRef> &
  CommonComponentProps;

/**
 * Render the default script server component.
 * @param {ScriptProps} props - The default script server component properties
 * @returns The rendered default script server component
 */
export const Script = ({
  isClient = false,
  children,
  ...rest
}: ScriptProps) => {
  const element = <script {...rest}>{children}</script>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ScriptClient {...rest}>{children}</ScriptClient>
      </Suspense>
    );
  }

  return element;
};

Script.displayName = "Script";
