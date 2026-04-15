import type { AnchorHTMLAttributes, ReactNode } from "react";

import { setDisplayName } from "@portfolio/utils";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  newTab?: boolean;
  href: string;
};

export const Link = setDisplayName(function Link({
  children,
  href,
  newTab,
  ...rest
}: LinkProps) {
  return (
    <a
      href={href}
      rel={newTab ? "noreferrer" : undefined}
      target={newTab ? "_blank" : undefined}
      {...rest}
    >
      {children}
    </a>
  );
});
