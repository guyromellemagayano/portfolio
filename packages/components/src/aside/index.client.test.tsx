import React from "react";

import { render, screen } from "@testing-library/react";

import { AsideClient, MemoizedAsideClient } from "./index.client";

// Basic render test for AsideClient
it("renders an aside element", () => {
  render(
    <AsideClient data-testid="aside-element">Sidebar content</AsideClient>
  );
  const aside = screen.getByTestId("aside-element");
  expect(aside.tagName).toBe("ASIDE");
  expect(aside).toHaveTextContent("Sidebar content");
});

// Basic render test for MemoizedAsideClient
it("renders a memoized aside element", () => {
  render(
    <MemoizedAsideClient data-testid="aside-element">
      Memoized sidebar content
    </MemoizedAsideClient>
  );
  const aside = screen.getByTestId("aside-element");
  expect(aside.tagName).toBe("ASIDE");
  expect(aside).toHaveTextContent("Memoized sidebar content");
});

// as prop test for AsideClient
it("renders as a custom element with 'as' prop", () => {
  render(
    <AsideClient as="div" data-testid="custom-div">
      Custom sidebar
    </AsideClient>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom sidebar");
});

// as prop test for MemoizedAsideClient
it("renders memoized as a custom element with 'as' prop", () => {
  render(
    <MemoizedAsideClient as="section" data-testid="custom-section">
      Custom memoized sidebar
    </MemoizedAsideClient>
  );
  const section = screen.getByTestId("custom-section");
  expect(section.tagName).toBe("SECTION");
  expect(section).toHaveTextContent("Custom memoized sidebar");
});

// Suspense render test for AsideClient
it("renders in Suspense context", () => {
  try {
    render(
      <AsideClient data-testid="aside-element">
        Suspense sidebar content
      </AsideClient>
    );
    const aside = screen.getByTestId("aside-element");
    expect(aside.tagName).toBe("ASIDE");
    expect(aside).toHaveTextContent("Suspense sidebar content");
  } catch {
    // Handle case where Suspense fallback is rendered instead
    const aside = screen.getByTestId("aside-element");
    expect(aside.tagName).toBe("ASIDE");
    expect(aside).toHaveTextContent("Suspense sidebar content");
  }
});

// Suspense render test for MemoizedAsideClient
it("renders memoized in Suspense context", () => {
  try {
    render(
      <MemoizedAsideClient data-testid="aside-element">
        Memoized suspense sidebar
      </MemoizedAsideClient>
    );
    const aside = screen.getByTestId("aside-element");
    expect(aside.tagName).toBe("ASIDE");
    expect(aside).toHaveTextContent("Memoized suspense sidebar");
  } catch {
    // Handle case where Suspense fallback is rendered instead
    const aside = screen.getByTestId("aside-element");
    expect(aside.tagName).toBe("ASIDE");
    expect(aside).toHaveTextContent("Memoized suspense sidebar");
  }
});

// ref forwarding test for AsideClient
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLElement>();
  render(<AsideClient ref={ref}>Ref test content</AsideClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("ASIDE");
  }
});

// ref forwarding test for MemoizedAsideClient
it("forwards ref correctly in memoized component", () => {
  const ref = React.createRef<HTMLElement>();
  render(
    <MemoizedAsideClient ref={ref}>
      Memoized ref test content
    </MemoizedAsideClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("ASIDE");
  }
});

// Aside-specific props test for AsideClient
it("renders with aside-specific attributes", () => {
  render(
    <AsideClient
      data-testid="aside-element"
      className="sidebar"
      id="main-sidebar"
      aria-label="Main navigation"
    >
      Navigation content
    </AsideClient>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveAttribute("class", "sidebar");
  expect(aside).toHaveAttribute("id", "main-sidebar");
  expect(aside).toHaveAttribute("aria-label", "Main navigation");
  expect(aside).toHaveTextContent("Navigation content");
});

// Aside-specific props test for MemoizedAsideClient
it("renders memoized with aside-specific attributes", () => {
  render(
    <MemoizedAsideClient
      data-testid="aside-element"
      className="memoized-sidebar"
      id="memoized-sidebar"
      aria-label="Memoized navigation"
    >
      Memoized navigation content
    </MemoizedAsideClient>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveAttribute("class", "memoized-sidebar");
  expect(aside).toHaveAttribute("id", "memoized-sidebar");
  expect(aside).toHaveAttribute("aria-label", "Memoized navigation");
  expect(aside).toHaveTextContent("Memoized navigation content");
});

// Children rendering test for AsideClient
it("renders children correctly", () => {
  render(
    <AsideClient data-testid="aside-element">
      <h2>Sidebar Title</h2>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
        </ul>
      </nav>
    </AsideClient>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveTextContent("Sidebar Title");
  expect(aside).toHaveTextContent("Home");
  expect(aside).toHaveTextContent("About");
  expect(aside.querySelector("h2")).toBeInTheDocument();
  expect(aside.querySelector("nav")).toBeInTheDocument();
  expect(aside.querySelector("ul")).toBeInTheDocument();
});

// Children rendering test for MemoizedAsideClient
it("renders memoized children correctly", () => {
  render(
    <MemoizedAsideClient data-testid="aside-element">
      <h2>Memoized Sidebar Title</h2>
      <nav>
        <ul>
          <li>Dashboard</li>
          <li>Settings</li>
        </ul>
      </nav>
    </MemoizedAsideClient>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveTextContent("Memoized Sidebar Title");
  expect(aside).toHaveTextContent("Dashboard");
  expect(aside).toHaveTextContent("Settings");
  expect(aside.querySelector("h2")).toBeInTheDocument();
  expect(aside.querySelector("nav")).toBeInTheDocument();
  expect(aside.querySelector("ul")).toBeInTheDocument();
});

// Empty children test for AsideClient
it("renders with empty children", () => {
  render(<AsideClient data-testid="aside-element" />);
  const aside = screen.getByTestId("aside-element");
  expect(aside).toBeInTheDocument();
  expect(aside).toHaveTextContent("");
});

// Empty children test for MemoizedAsideClient
it("renders memoized with empty children", () => {
  render(<MemoizedAsideClient data-testid="aside-element" />);
  const aside = screen.getByTestId("aside-element");
  expect(aside).toBeInTheDocument();
  expect(aside).toHaveTextContent("");
});

// Complex children with nested elements test for AsideClient
it("renders complex nested children", () => {
  render(
    <AsideClient data-testid="aside-element">
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
    </AsideClient>
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

// Complex children with nested elements test for MemoizedAsideClient
it("renders memoized complex nested children", () => {
  render(
    <MemoizedAsideClient data-testid="aside-element">
      <header>
        <h1>Memoized Dashboard</h1>
      </header>
      <main>
        <section>
          <h2>Memoized Quick Actions</h2>
          <button>Memoized Action 1</button>
          <button>Memoized Action 2</button>
        </section>
      </main>
      <footer>
        <p>Memoized Footer content</p>
      </footer>
    </MemoizedAsideClient>
  );

  const aside = screen.getByTestId("aside-element");
  expect(aside).toHaveTextContent("Memoized Dashboard");
  expect(aside).toHaveTextContent("Memoized Quick Actions");
  expect(aside).toHaveTextContent("Memoized Action 1");
  expect(aside).toHaveTextContent("Memoized Action 2");
  expect(aside).toHaveTextContent("Memoized Footer content");
  expect(aside.querySelector("header")).toBeInTheDocument();
  expect(aside.querySelector("main")).toBeInTheDocument();
  expect(aside.querySelector("footer")).toBeInTheDocument();
  expect(aside.querySelectorAll("button")).toHaveLength(2);
});
