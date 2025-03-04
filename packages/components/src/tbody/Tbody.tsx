import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const TbodyClient = lazy(async () => {
  const module = await import("./Tbody.client");
  return { default: module.TbodyClient };
});

export type TbodyRef = HTMLTableSectionElement;
export type TbodyProps = HTMLAttributes<TbodyRef> & CommonComponentProps;

/**
 * Render the default table body server component.
 * @param {TbodyProps} props - The default table body server component properties
 * @returns The rendered default table body server component
 */
export const Tbody = ({ isClient = false, children, ...rest }: TbodyProps) => {
  const element = <tbody {...rest}>{children}</tbody>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TbodyClient {...rest}>{children}</TbodyClient>
      </Suspense>
    );
  }

  return element;
};

Tbody.displayName = "Tbody";
