/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from "next";

import { Div, Heading, P, Span } from "@guyromellemagayano/components";
import { log } from "@guyromellemagayano/logger";
import { CounterButton, Link } from "@guyromellemagayano/ui";

import { Container } from "@web/components";

export const metadata: Metadata = {
  title: "Web | Kitchen Sink",
};

const Web = () => {
  log("Hey! This is the Web page.");

  return (
    <Div className="container">
      <Heading className="title">
        Web <br />
        <Span>Kitchen Sink</Span>
      </Heading>
      <CounterButton />
      <Container isClient isMemoized>
        <Heading as={"h2"}>Container</Heading>
      </Container>
      <P className="description">
        Built With{" "}
        <Link href="https://turbo.build/repo" newTab>
          Turborepo
        </Link>
        {" & "}
        <Link href="https://nextjs.org/" newTab>
          Next.js
        </Link>
      </P>
    </Div>
  );
};

export default Web;
