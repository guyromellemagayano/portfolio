import { log } from "@guyromellemagayano/logger";
import { Link } from "@guyromellemagayano/ui/link";
import { CounterButton } from "@guyromellemagayano/ui/counter-button";

export const metadata = {
  title: "Store | Kitchen Sink",
};

export default function Store() {
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
}
