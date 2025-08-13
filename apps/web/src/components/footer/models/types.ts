import type { FooterLink } from "@web/components/footer/@types/footer";

/** For config labels shape. */
export type FooterComponentLabels = Readonly<{
  brandName: string;
  legalText: string;
}>;

/** Convenience alias when you only need internal links. */
export type FooterComponentNavLinks = ReadonlyArray<
  Extract<FooterLink, { kind: "internal" }>
>;
