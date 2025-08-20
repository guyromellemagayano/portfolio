/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from "next";

import { log } from "@guyromellemagayano/logger";

import { ClientCounterButton } from "../components/client-counter-button";

export const metadata: Metadata = {
  title: "Store | Kitchen Sink",
};

const Store = function () {
  log("Hey! This is the Store page.");

  return (
    <div className="container">
      <h1 className="title">
        Store <br />
        <span>Kitchen Sink</span>
      </h1>
      <ClientCounterButton />
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
