import { Div, Header, Heading, P } from "@guyromellemagayano/components";

import { Container, type ContainerProps } from "@web/components/container";
import { cn } from "@web/lib";

export interface SimpleLayoutProps extends ContainerProps {
  /**
   * The title of the page.
   */
  title: string;
  /**
   * The intro of the page.
   */
  intro: string;
}

/**
 * A simple layout component.
 */
export const SimpleLayout = (props: SimpleLayoutProps) => {
  const { children, className, title, intro, ...rest } = props;

  return (
    <Container className={cn("mt-16 sm:mt-32", className)} {...rest}>
      <Header className="max-w-2xl">
        <Heading
          as={"h1"}
          className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
        >
          {title}
        </Heading>
        <P className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {intro}
        </P>
      </Header>

      {children && <Div className="mt-16 sm:mt-20">{children}</Div>}
    </Container>
  );
};

SimpleLayout.displayName = "SimpleLayout";
