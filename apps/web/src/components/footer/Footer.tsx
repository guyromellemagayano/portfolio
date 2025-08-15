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
import {
  FOOTER_COMPONENT_LABELS,
  FOOTER_COMPONENT_NAV_LINKS,
  type FooterData,
  type FooterLink,
  FooterNavLink,
  type FooterProps,
  type FooterRef,
} from "@web/components/footer";
import { cn } from "@web/lib";

import styles from "./Footer.module.css";

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
        className={cn(styles.footerComponent, className)}
        {...rest}
      >
        <ContainerOuter>
          <Div className={styles.footerContentWrapper}>
            <ContainerInner>
              <Div className={styles.footerLayout}>
                <Nav aria-label="Footer">
                  <Ul className={styles.footerNavigationList}>
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
                <P className={styles.footerLegalText}>
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

Footer.displayName = "Footer";
