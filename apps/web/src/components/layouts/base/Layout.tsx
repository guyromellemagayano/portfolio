import React from "react";

import { Div, Main } from "@guyromellemagayano/components";

import { Footer, Header } from "@web/components";
import type { LayoutProps, LayoutRef } from "@web/components/layouts/base";
import { cn } from "@web/lib";

import styles from "./Layout.module.css";

/** A layout component that wraps the header, main, and footer components. */
export const Layout = React.forwardRef<LayoutRef, LayoutProps>(
  function Layout(props, ref) {
    const { children, className, ...rest } = props;

    const element = (
      <Div
        ref={ref}
        className={cn(styles.layoutContainer, className)}
        {...rest}
      >
        <Div className={styles.layoutBackgroundWrapper}>
          <Div className={styles.layoutBackgroundContent}>
            <Div className={styles.layoutBackground} />
          </Div>
        </Div>
        <Div className={styles.layoutContentWrapper}>
          <Header />

          {children && <Main className={styles.layoutMain}>{children}</Main>}

          <Footer />
        </Div>
      </Div>
    );

    return element;
  }
);

Layout.displayName = "Layout";
