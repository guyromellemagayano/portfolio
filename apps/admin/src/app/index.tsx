import { CounterButton, Link } from "@portfolio/ui";

import "./styles.css";

const App = function () {
  return (
    <div className="container">
      <h1 className="title">
        Admin <br />
        <span>Kitchen Sink</span>
      </h1>
      <CounterButton
        label="Counter"
        initialValue={0}
        min={0}
        max={100}
        step={1}
        variant="primary"
        size="medium"
        onCountChange={() => {}}
      />
      <p className="description">
        Built With{" "}
        <Link href="https://turbo.build/repo" newTab>
          Turborepo
        </Link>
        {" & "}
        <Link href="https://vitejs.dev/" newTab>
          Vite
        </Link>
      </p>
    </div>
  );
};

export default App;
