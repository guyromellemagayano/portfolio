/* eslint-disable react-refresh/only-export-components */

import type { Metadata } from "next";

import { Div, Heading, P, Span } from "@guyromellemagayano/components";
import { logInfo } from "@guyromellemagayano/logger";

export const metadata: Metadata = {
  title: "Web | Kitchen Sink",
};

/** Home page component showcasing the portfolio and latest content. */
const HomePage = async function HomePage() {
  logInfo("Hey! This is the Web page.");

  const element = (
    <Div className="container">
      <Heading className="title">
        Web <br />
        <Span>Kitchen Sink</Span>
      </Heading>
      <div>
        <p>Counter Button (Client Component)</p>
        {/* We'll handle this differently for now */}
      </div>
      <P className="description">
        Built With{" "}
        <a href="https://turbo.build/repo" target="_blank" rel="noreferrer">
          Turborepo
        </a>
        {" & "}
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          Next.js
        </a>
      </P>
    </Div>
  );

  return element;
};

export default HomePage;
