import React from "react";

import { render, screen } from "@testing-library/react";

import { Aside } from ".";

// Basic render test
it("renders an aside element", () => {
  render(<Aside data-testid="aside-element">Sidebar content</Aside>);
  const aside = screen.getByTestId("aside-element");
  expect(aside.tagName).toBe("ASIDE");
  expect(aside).toHaveTextContent("Sidebar content");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <Aside as="div" data-testid="custom-div">
      Custom sidebar
    </Aside>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom sidebar");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(
    <Aside isClient data-testid="aside-element">
      Client-side sidebar
    </Aside>
  );

  // Should render the fallback (the aside) immediately
  const aside = screen.getByTestId("aside-element");
  expect(aside.tagName).toBe("ASIDE");
  expect(aside).toHaveTextContent("Client-side sidebar");

  // The lazy component should load and render the same content
  await screen.findByTestId("aside-element");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <Aside isClient isMemoized data-testid="aside-element">
      Memoized sidebar
    </Aside>
  );

  // Should render the fallback (the aside) immediately
  const aside = screen.getByTestId("aside-element");
  expect(aside.tagName).toBe("ASIDE");
  expect(aside).toHaveTextContent("Memoized sidebar");

  // The lazy component should load and render the same content
  await screen.findByTestId("aside-element");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLElement>();
  render(<Aside ref={ref}>Ref test content</Aside>);
  expect(ref.current).toBeInstanceOf(HTMLElement);
  expect(ref.current?.tagName).toBe("ASIDE");
});

// Aside-specific props test
it("renders with aside-specific attributes", () => {
  render(
    <Aside
      data-testid="aside-element"
      className="sidebar"
      id="main-sidebar"
      aria-label="Main navigation"
    >
      Navigation content
    </Aside>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveAttribute("class", "sidebar");
  expect(aside).toHaveAttribute("id", "main-sidebar");
  expect(aside).toHaveAttribute("aria-label", "Main navigation");
  expect(aside).toHaveTextContent("Navigation content");
});

// Children rendering test
it("renders children correctly", () => {
  render(
    <Aside data-testid="aside-element">
      <h2>Sidebar Title</h2>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
        </ul>
      </nav>
    </Aside>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveTextContent("Sidebar Title");
  expect(aside).toHaveTextContent("Home");
  expect(aside).toHaveTextContent("About");
  expect(aside.querySelector("h2")).toBeInTheDocument();
  expect(aside.querySelector("nav")).toBeInTheDocument();
  expect(aside.querySelector("ul")).toBeInTheDocument();
});

// Empty children test
it("renders with empty children", () => {
  render(<Aside data-testid="aside-element" />);
  const aside = screen.getByTestId("aside-element");
  expect(aside).toBeInTheDocument();
  expect(aside).toHaveTextContent("");
});

// Complex children with nested elements test
it("renders complex nested children", () => {
  render(
    <Aside data-testid="aside-element">
      <header>
        <h1>Dashboard</h1>
      </header>
      <main>
        <section>
          <h2>Quick Actions</h2>
          <button>Action 1</button>
          <button>Action 2</button>
        </section>
      </main>
      <footer>
        <p>Footer content</p>
      </footer>
    </Aside>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveTextContent("Dashboard");
  expect(aside).toHaveTextContent("Quick Actions");
  expect(aside).toHaveTextContent("Action 1");
  expect(aside).toHaveTextContent("Action 2");
  expect(aside).toHaveTextContent("Footer content");
  expect(aside.querySelector("header")).toBeInTheDocument();
  expect(aside.querySelector("main")).toBeInTheDocument();
  expect(aside.querySelector("footer")).toBeInTheDocument();
  expect(aside.querySelectorAll("button")).toHaveLength(2);
});
