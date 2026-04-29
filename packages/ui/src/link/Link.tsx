import { type AnchorHTMLAttributes, type ReactNode } from "react";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  newTab?: boolean;
  href: string;
};

export function Link({ children, href, newTab, ...rest }: LinkProps) {
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
}

Link.displayName = "Link";
