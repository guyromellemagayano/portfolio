import React from "react";

import { render, screen } from "@testing-library/react";

import { AsideClient, MemoizedAsideClient } from "./index.client";

// Basic render test for AsideClient
it("renders an aside element", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AsideClient data-testid="aside-element">Sidebar content</AsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside.tagName).toBe("ASIDE");
  expect(aside).toHaveTextContent("Sidebar content");
});

// Basic render test for MemoizedAsideClient
it("renders a memoized aside element", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAsideClient data-testid="aside-element">
        Memoized sidebar content
      </MemoizedAsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside.tagName).toBe("ASIDE");
  expect(aside).toHaveTextContent("Memoized sidebar content");
});

// as prop test for AsideClient
it("renders as a custom element with 'as' prop", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AsideClient as="div" data-testid="custom-div">
        Custom sidebar
      </AsideClient>
    </React.Suspense>
  );

  const div = await screen.findByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("Custom sidebar");
});

// as prop test for MemoizedAsideClient
it("renders memoized as a custom element with 'as' prop", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAsideClient as="section" data-testid="custom-section">
        Custom memoized sidebar
      </MemoizedAsideClient>
    </React.Suspense>
  );

  const section = await screen.findByTestId("custom-section");
  expect(section.tagName).toBe("SECTION");
  expect(section).toHaveTextContent("Custom memoized sidebar");
});

// Suspense context test for AsideClient
it("renders in Suspense context", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AsideClient data-testid="aside-element">
        Suspense sidebar content
      </AsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside.tagName).toBe("ASIDE");
  expect(aside).toHaveTextContent("Suspense sidebar content");
});

// Suspense context test for MemoizedAsideClient
it("renders memoized in Suspense context", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAsideClient data-testid="aside-element">
        Memoized suspense sidebar
      </MemoizedAsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside.tagName).toBe("ASIDE");
  expect(aside).toHaveTextContent("Memoized suspense sidebar");
});

// ref forwarding test for AsideClient
it("forwards ref correctly", async () => {
  const ref = React.createRef<HTMLElement>();
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AsideClient ref={ref}>Ref test content</AsideClient>
    </React.Suspense>
  );

  // Wait for the component to load and check ref
  await new Promise((resolve) => setTimeout(resolve, 100));
  if (ref.current) {
    expect(ref.current.tagName).toBe("ASIDE");
  }
});

// ref forwarding test for MemoizedAsideClient
it("forwards ref correctly in memoized component", async () => {
  const ref = React.createRef<HTMLElement>();
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAsideClient ref={ref}>
        Memoized ref test content
      </MemoizedAsideClient>
    </React.Suspense>
  );

  // Wait for the component to load and check ref
  await new Promise((resolve) => setTimeout(resolve, 100));
  if (ref.current) {
    expect(ref.current.tagName).toBe("ASIDE");
  }
});

// aside-specific attributes test for AsideClient
it("renders with aside-specific attributes", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AsideClient
        data-testid="aside-element"
        className="sidebar"
        id="main-sidebar"
        aria-label="Main navigation"
        role="complementary"
        aria-hidden="false"
      >
        Navigation content
      </AsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside).toHaveClass("sidebar", { exact: true });
  expect(aside).toHaveAttribute("id", "main-sidebar");
  expect(aside).toHaveAttribute("aria-label", "Main navigation");
  expect(aside).toHaveAttribute("role", "complementary");
  expect(aside).toHaveAttribute("aria-hidden", "false");
  expect(aside).toHaveTextContent("Navigation content");
});

// aside-specific attributes test for MemoizedAsideClient
it("renders memoized with aside-specific attributes", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAsideClient
        data-testid="aside-element"
        className="memoized-sidebar"
        id="memoized-sidebar"
        aria-label="Memoized navigation"
        role="complementary"
        aria-hidden="false"
      >
        Memoized navigation content
      </MemoizedAsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside).toHaveClass("memoized-sidebar", { exact: true });
  expect(aside).toHaveAttribute("id", "memoized-sidebar");
  expect(aside).toHaveAttribute("aria-label", "Memoized navigation");
  expect(aside).toHaveAttribute("role", "complementary");
  expect(aside).toHaveAttribute("aria-hidden", "false");
  expect(aside).toHaveTextContent("Memoized navigation content");
});

// children rendering test for AsideClient
it("renders children correctly", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AsideClient data-testid="aside-element">
        <h2>Sidebar Title</h2>
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
          </ul>
        </nav>
      </AsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside).toHaveTextContent("Sidebar Title");
  expect(aside).toHaveTextContent("Home");
  expect(aside).toHaveTextContent("About");
  expect(aside.querySelector("h2")).toBeInTheDocument();
  expect(aside.querySelector("nav")).toBeInTheDocument();
  expect(aside.querySelector("ul")).toBeInTheDocument();
});

// children rendering test for MemoizedAsideClient
it("renders memoized children correctly", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAsideClient data-testid="aside-element">
        <h2>Memoized Sidebar Title</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Settings</li>
          </ul>
        </nav>
      </MemoizedAsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside).toHaveTextContent("Memoized Sidebar Title");
  expect(aside).toHaveTextContent("Dashboard");
  expect(aside).toHaveTextContent("Settings");
  expect(aside.querySelector("h2")).toBeInTheDocument();
  expect(aside.querySelector("nav")).toBeInTheDocument();
  expect(aside.querySelector("ul")).toBeInTheDocument();
});

// empty children test for AsideClient
it("renders with empty children", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AsideClient data-testid="aside-element" />
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside).toBeInTheDocument();
  expect(aside).toBeEmptyDOMElement();
});

// empty children test for MemoizedAsideClient
it("renders memoized with empty children", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAsideClient data-testid="aside-element" />
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside).toBeInTheDocument();
  expect(aside).toBeEmptyDOMElement();
});

// complex children with nested elements test for AsideClient
it("renders complex nested children", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
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
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
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

// complex children with nested elements test for MemoizedAsideClient
it("renders memoized complex nested children", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
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
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
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

// aside with navigation test for AsideClient
it("renders aside with navigation", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AsideClient data-testid="aside-element">
        <nav aria-label="Main navigation">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </AsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside).toHaveTextContent("Home");
  expect(aside).toHaveTextContent("About");
  expect(aside).toHaveTextContent("Contact");
  expect(aside.querySelector("nav")).toBeInTheDocument();
  expect(aside.querySelectorAll("a")).toHaveLength(3);
  expect(aside.querySelector("a[href='/']")).toBeInTheDocument();
  expect(aside.querySelector("a[href='/about']")).toBeInTheDocument();
  expect(aside.querySelector("a[href='/contact']")).toBeInTheDocument();
});

// aside with navigation test for MemoizedAsideClient
it("renders memoized aside with navigation", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAsideClient data-testid="aside-element">
        <nav aria-label="Memoized navigation">
          <ul>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/settings">Settings</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
          </ul>
        </nav>
      </MemoizedAsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside).toHaveTextContent("Dashboard");
  expect(aside).toHaveTextContent("Settings");
  expect(aside).toHaveTextContent("Profile");
  expect(aside.querySelector("nav")).toBeInTheDocument();
  expect(aside.querySelectorAll("a")).toHaveLength(3);
  expect(aside.querySelector("a[href='/dashboard']")).toBeInTheDocument();
  expect(aside.querySelector("a[href='/settings']")).toBeInTheDocument();
  expect(aside.querySelector("a[href='/profile']")).toBeInTheDocument();
});

// accessibility test for AsideClient
it("renders with accessibility attributes", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AsideClient
        data-testid="aside-element"
        aria-labelledby="aside-title"
        aria-describedby="aside-description"
        role="complementary"
        tabIndex={0}
      >
        <h2 id="aside-title">Accessible Aside</h2>
        <p id="aside-description">
          This aside has proper accessibility attributes.
        </p>
      </AsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside).toHaveAttribute("aria-labelledby", "aside-title");
  expect(aside).toHaveAttribute("aria-describedby", "aside-description");
  expect(aside).toHaveAttribute("role", "complementary");
  expect(aside).toHaveAttribute("tabindex", "0");
});

// accessibility test for MemoizedAsideClient
it("renders memoized with accessibility attributes", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAsideClient
        data-testid="aside-element"
        aria-labelledby="memoized-aside-title"
        aria-describedby="memoized-aside-description"
        role="complementary"
        tabIndex={0}
      >
        <h2 id="memoized-aside-title">Memoized Accessible Aside</h2>
        <p id="memoized-aside-description">
          This memoized aside has proper accessibility attributes.
        </p>
      </MemoizedAsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside).toHaveAttribute("aria-labelledby", "memoized-aside-title");
  expect(aside).toHaveAttribute(
    "aria-describedby",
    "memoized-aside-description"
  );
  expect(aside).toHaveAttribute("role", "complementary");
  expect(aside).toHaveAttribute("tabindex", "0");
});

// data attributes test for AsideClient
it("renders with data attributes", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AsideClient
        data-testid="aside-element"
        data-type="sidebar"
        data-position="left"
        data-collapsible="true"
      >
        Sidebar content
      </AsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside).toHaveAttribute("data-type", "sidebar");
  expect(aside).toHaveAttribute("data-position", "left");
  expect(aside).toHaveAttribute("data-collapsible", "true");
});

// data attributes test for MemoizedAsideClient
it("renders memoized with data attributes", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAsideClient
        data-testid="aside-element"
        data-type="memoized-sidebar"
        data-position="right"
        data-collapsible="false"
      >
        Memoized sidebar content
      </MemoizedAsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside).toHaveAttribute("data-type", "memoized-sidebar");
  expect(aside).toHaveAttribute("data-position", "right");
  expect(aside).toHaveAttribute("data-collapsible", "false");
});

// event handlers test for AsideClient
it("renders with event handlers", async () => {
  const handleClick = vi.fn();
  const handleFocus = vi.fn();
  const handleBlur = vi.fn();

  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AsideClient
        data-testid="aside-element"
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
      >
        Clickable aside
      </AsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");

  aside.click();
  expect(handleClick).toHaveBeenCalledTimes(1);

  // Verify the component renders with event handlers
  expect(aside).toHaveAttribute("tabindex", "0");
});

// event handlers test for MemoizedAsideClient
it("renders memoized with event handlers", async () => {
  const handleClick = vi.fn();
  const handleFocus = vi.fn();
  const handleBlur = vi.fn();

  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAsideClient
        data-testid="aside-element"
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
      >
        Memoized clickable aside
      </MemoizedAsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");

  aside.click();
  expect(handleClick).toHaveBeenCalledTimes(1);

  // Verify the component renders with event handlers
  expect(aside).toHaveAttribute("tabindex", "0");
});

// custom styling test for AsideClient
it("renders with custom styling", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AsideClient
        data-testid="aside-element"
        className="custom-aside-class"
        style={{
          backgroundColor: "lightgray",
          padding: "20px",
        }}
      >
        Styled aside
      </AsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside).toHaveClass("custom-aside-class");
  // Verify the component renders with custom styling
  expect(aside).toBeInTheDocument();
});

// custom styling test for MemoizedAsideClient
it("renders memoized with custom styling", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAsideClient
        data-testid="aside-element"
        className="memoized-custom-aside-class"
        style={{
          backgroundColor: "lightblue",
          padding: "15px",
        }}
      >
        Memoized styled aside
      </MemoizedAsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside).toHaveClass("memoized-custom-aside-class");
  // Verify the component renders with custom styling
  expect(aside).toBeInTheDocument();
});

// aside with custom attributes test for AsideClient
it("renders with custom attributes", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AsideClient
        data-testid="aside-element"
        id="custom-aside-id"
        title="Custom aside title"
        hidden={false}
        spellCheck={true}
        contentEditable={false}
      >
        Custom aside
      </AsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside).toHaveAttribute("id", "custom-aside-id");
  expect(aside).toHaveAttribute("title", "Custom aside title");
  expect(aside).not.toHaveAttribute("hidden");
  expect(aside).toHaveAttribute("spellcheck", "true");
  expect(aside).toHaveAttribute("contenteditable", "false");
});

// aside with custom attributes test for MemoizedAsideClient
it("renders memoized with custom attributes", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAsideClient
        data-testid="aside-element"
        id="memoized-custom-aside-id"
        title="Memoized custom aside title"
        hidden={false}
        spellCheck={true}
        contentEditable={false}
      >
        Memoized custom aside
      </MemoizedAsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside).toHaveAttribute("id", "memoized-custom-aside-id");
  expect(aside).toHaveAttribute("title", "Memoized custom aside title");
  expect(aside).not.toHaveAttribute("hidden");
  expect(aside).toHaveAttribute("spellcheck", "true");
  expect(aside).toHaveAttribute("contenteditable", "false");
});

// aside with special characters test for AsideClient
it("renders with special characters", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AsideClient data-testid="aside-element">
        <h2>{"Special & Characters < > \" '"}</h2>
        <p>Content with special characters: &amp; &lt; &gt; &quot; &apos;</p>
      </AsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside).toHaveTextContent("Special & Characters < > \" '");
  expect(aside).toHaveTextContent(
    "Content with special characters: & < > \" '"
  );
});

// aside with special characters test for MemoizedAsideClient
it("renders memoized with special characters", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAsideClient data-testid="aside-element">
        <h2>{"Memoized Special & Characters < > \" '"}</h2>
        <p>
          Memoized content with special characters: &amp; &lt; &gt; &quot;
          &apos;
        </p>
      </MemoizedAsideClient>
    </React.Suspense>
  );

  const aside = await screen.findByTestId("aside-element");
  expect(aside).toHaveTextContent("Memoized Special & Characters < > \" '");
  expect(aside).toHaveTextContent(
    "Memoized content with special characters: & < > \" '"
  );
});
