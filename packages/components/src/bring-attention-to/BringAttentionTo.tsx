import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const BringAttentionToClient = lazy(async () => {
  const module = await import("./BringAttentionTo.client");
  return { default: module.default };
});

export type BringAttentionToRef = HTMLElement;
export type BringAttentionToProps = HTMLAttributes<BringAttentionToRef> &
  CommonComponentProps;

/**
 * Render the default bring attention to server component.
 * @param {BringAttentionToProps} props - The default bring attention to server component properties
 * @returns The rendered default bring attention to server component
 */
const BringAttentionTo = ({
  isClient = false,
  children,
  ...rest
}: BringAttentionToProps) => {
  const element = <b {...rest}>{children}</b>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <BringAttentionToClient {...rest}>{children}</BringAttentionToClient>
      </Suspense>
    );
  }

  return element;
};

BringAttentionTo.displayName = "BringAttentionTo";

export default BringAttentionTo;
