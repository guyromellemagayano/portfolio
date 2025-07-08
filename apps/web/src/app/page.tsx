/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from "next";

import { log } from "@guyromellemagayano/logger";
import { CounterButton } from "@guyromellemagayano/ui/counter-button";
import { Link } from "@guyromellemagayano/ui/link";

export const metadata: Metadata = {
  title: "Web | Kitchen Sink",
};

const Web = () => {
  log("Hey! This is the Web page.");

  return (
    <div className="container">
      <h1 className="title">
        Web <br />
        <span>Kitchen Sink</span>
      </h1>
      <CounterButton />
      <p className="description">
        Built With{" "}
        <Link href="https://turbo.build/repo" newTab>
          Turborepo
        </Link>
        {" & "}
        <Link href="https://nextjs.org/" newTab>
          Next.js
        </Link>
      </p>
    </div>
  );
};

export default Web;
