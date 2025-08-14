import React from "react";

import {
  Div,
  Footer as FooterComponent,
  Li,
  Nav,
  P,
  Ul,
} from "@guyromellemagayano/components";

import { ContainerInner, ContainerOuter } from "@web/components/container";
import { FooterNavLink } from "@web/components/footer/_internal";
import {
  FOOTER_COMPONENT_LABELS,
  FOOTER_COMPONENT_NAV_LINKS,
  type FooterData,
  type FooterLink,
  type FooterProps,
  type FooterRef,
} from "@web/components/footer/models";
import { cn } from "@web/lib";

/** Server component: pure shell; tiny client leaf handles active state. */
export const Footer = React.forwardRef<FooterRef, FooterProps>(
  function Footer(props, ref) {
    const { className, ...rest } = props;

    // default static data; parent may pass dynamic `data` later if desired
    const data: FooterData = {
      brandName: FOOTER_COMPONENT_LABELS.brandName,
      nav: FOOTER_COMPONENT_NAV_LINKS,
      legalText: FOOTER_COMPONENT_LABELS.legalText,
      year: new Date().getFullYear(),
    };

    return (
      <FooterComponent
        ref={ref}
        className={cn("mt-32 flex-none", className)}
        {...rest}
      >
        <ContainerOuter>
          <Div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
            <ContainerInner>
              <Div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <Nav aria-label="Footer">
                  <Ul className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {data.nav.map((link: FooterLink) => (
                      <Li key={`${link.label}:${link.href}`}>
                        {/* Client leaf – applies aria-current and external safety */}
                        {"kind" in link && link.kind === "external" ? (
                          <FooterNavLink
                            href={link.href}
                            target={link.newTab ? "_blank" : undefined}
                            rel={link.rel}
                          >
                            {link.label}
                          </FooterNavLink>
                        ) : (
                          <FooterNavLink href={link.href}>
                            {link.label}
                          </FooterNavLink>
                        )}
                      </Li>
                    ))}
                  </Ul>
                </Nav>

                <P className="text-sm text-zinc-400 dark:text-zinc-500">
                  © {data.year} {data.legalText}
                </P>
              </Div>
            </ContainerInner>
          </Div>
        </ContainerOuter>
      </FooterComponent>
    );
  }
);
