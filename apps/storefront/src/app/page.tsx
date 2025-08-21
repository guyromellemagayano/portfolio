/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from "next";

import { logInfo } from "@guyromellemagayano/logger";
import { CounterButton } from "@guyromellemagayano/ui";

export const metadata: Metadata = {
  title: "Store | Kitchen Sink",
};

const Store = function () {
  logInfo("Hey! This is the Store page.");

  return (
    <div className="container">
      <h1 className="title">
        Store <br />
        <span>Kitchen Sink</span>
      </h1>
      <CounterButton />
      <p className="description">
        Built With{" "}
        <a
          href="https://turbo.build/repo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Turborepo
        </a>
        {" & "}
        <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
          Next.js
        </a>
      </p>
    </div>
  );
};

export default Store;
