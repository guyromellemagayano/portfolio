/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from "next";

import { log } from "@guyromellemagayano/logger";
import { CounterButton } from "@guyromellemagayano/ui/counter-button";
import { Link } from "@guyromellemagayano/ui/link";

export const metadata: Metadata = {
  title: "Store | Kitchen Sink",
};

const Store = () => {
  log("Hey! This is the Store page.");

  return (
    <div className="container">
      <h1 className="title">
        Store <br />
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

export default Store;
