import React from "react";

import { Div, Header, Heading, P } from "@guyromellemagayano/components";

import { Container } from "@web/components/container";
import type {
  SimpleLayoutProps,
  SimpleLayoutRef,
} from "@web/components/layouts/simple";
import { cn } from "@web/lib";

import styles from "./SimpleLayout.module.css";

/** A simple layout component. */
export const SimpleLayout = React.forwardRef<
  SimpleLayoutRef,
  SimpleLayoutProps
>(function SimpleLayout(props, ref) {
  const { children, className, title, intro, ...rest } = props;

  if (!title && !intro && !children) return null;

  const element = (
    <Container
      ref={ref}
      className={cn(styles.simpleLayoutContainer, className)}
      {...rest}
    >
      <Header className={styles.simpleLayoutHeader}>
        {title && (
          <Heading as={"h1"} className={styles.simpleLayoutTitle}>
            {title}
          </Heading>
        )}

        {intro && <P className={styles.simpleLayoutIntro}>{intro}</P>}
      </Header>

      {children && <Div className={styles.simpleLayoutContent}>{children}</Div>}
    </Container>
  );

  return element;
});

SimpleLayout.displayName = "SimpleLayout";
