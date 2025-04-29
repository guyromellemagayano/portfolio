import { CounterButton } from "@guyromellemagayano/ui/counter-button";
import { Link } from "@remix-run/react";

export const Home = () => {
  return (
    <div className="container">
      <h1 className="title">
        Blog <br />
        <span>Kitchen Sink</span>
      </h1>
      <CounterButton />
      <p className="description">
        Built With <Link to="https://turbo.build/repo">Turborepo</Link>
        {" & "}
        <Link to="https://remix.run/">Remix</Link>
      </p>
    </div>
  );
};

Home.displayName = "Home";
