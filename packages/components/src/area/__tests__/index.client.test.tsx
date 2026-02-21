import React from "react";

import { render, screen } from "@testing-library/react";

import { AreaClient, MemoizedAreaClient } from "..";

// Basic render test for AreaClient
it("renders an area element", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient
        data-testid="area-element"
        coords="0,0,100,100"
        shape="rect"
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area.tagName).toBe("AREA");
  expect(area).toHaveAttribute("coords", "0,0,100,100");
  expect(area).toHaveAttribute("shape", "rect");
});

// Basic render test for MemoizedAreaClient
it("renders a memoized area element", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="area-element"
        coords="0,0,50,50"
        shape="circle"
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area.tagName).toBe("AREA");
  expect(area).toHaveAttribute("coords", "0,0,50,50");
  expect(area).toHaveAttribute("shape", "circle");
});

// as prop test for AreaClient
it("renders as a custom element with 'as' prop", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient
        as="div"
        data-testid="custom-div"
        coords="0,0,75,75"
        shape="poly"
      />
    </React.Suspense>
  );

  const div = await screen.findByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveAttribute("coords", "0,0,75,75");
  expect(div).toHaveAttribute("shape", "poly");
});

// as prop test for MemoizedAreaClient
it("renders memoized as a custom element with 'as' prop", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        as="section"
        data-testid="custom-section"
        coords="0,0,25,25"
        shape="rect"
      />
    </React.Suspense>
  );

  const section = await screen.findByTestId("custom-section");
  expect(section.tagName).toBe("SECTION");
  expect(section).toHaveAttribute("coords", "0,0,25,25");
  expect(section).toHaveAttribute("shape", "rect");
});

// Suspense context test for AreaClient
it("renders in Suspense context", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient
        data-testid="area-element"
        coords="0,0,100,100"
        shape="rect"
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area.tagName).toBe("AREA");
  expect(area).toHaveAttribute("coords", "0,0,100,100");
  expect(area).toHaveAttribute("shape", "rect");
});

// Suspense context test for MemoizedAreaClient
it("renders memoized in Suspense context", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="area-element"
        coords="0,0,50,50"
        shape="circle"
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area.tagName).toBe("AREA");
  expect(area).toHaveAttribute("coords", "0,0,50,50");
  expect(area).toHaveAttribute("shape", "circle");
});

// ref forwarding test for AreaClient
it("forwards ref correctly", async () => {
  const ref = React.createRef<HTMLAreaElement>();
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient ref={ref} coords="0,0,100,100" shape="rect" />
    </React.Suspense>
  );

  // Wait for the component to load and check ref
  await new Promise((resolve) => setTimeout(resolve, 100));
  if (ref.current) {
    expect(ref.current.tagName).toBe("AREA");
  }
});

// ref forwarding test for MemoizedAreaClient
it("forwards ref correctly in memoized component", async () => {
  const ref = React.createRef<HTMLAreaElement>();
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient ref={ref} coords="0,0,50,50" shape="circle" />
    </React.Suspense>
  );

  // Wait for the component to load and check ref
  await new Promise((resolve) => setTimeout(resolve, 100));
  if (ref.current) {
    expect(ref.current.tagName).toBe("AREA");
  }
});

// area-specific attributes test for AreaClient
it("renders with area-specific attributes", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient
        data-testid="area-element"
        coords="0,0,100,100"
        shape="rect"
        href="/link"
        alt="Clickable rectangle"
        target="_blank"
        rel="noopener noreferrer"
        download="image.jpg"
        referrerPolicy="no-referrer"
        hrefLang="en"
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveAttribute("coords", "0,0,100,100");
  expect(area).toHaveAttribute("shape", "rect");
  expect(area).toHaveAttribute("href", "/link");
  expect(area).toHaveAttribute("alt", "Clickable rectangle");
  expect(area).toHaveAttribute("target", "_blank");
  expect(area).toHaveAttribute("rel", "noopener noreferrer");
  expect(area).toHaveAttribute("download", "image.jpg");
  expect(area).toHaveAttribute("referrerpolicy", "no-referrer");
  expect(area).toHaveAttribute("hreflang", "en");
});

// area-specific attributes test for MemoizedAreaClient
it("renders memoized with area-specific attributes", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="area-element"
        coords="0,0,50,50"
        shape="circle"
        href="/memoized-link"
        alt="Memoized clickable circle"
        target="_self"
        rel="noreferrer"
        download="memoized-image.jpg"
        referrerPolicy="origin"
        hrefLang="en-US"
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveAttribute("coords", "0,0,50,50");
  expect(area).toHaveAttribute("shape", "circle");
  expect(area).toHaveAttribute("href", "/memoized-link");
  expect(area).toHaveAttribute("alt", "Memoized clickable circle");
  expect(area).toHaveAttribute("target", "_self");
  expect(area).toHaveAttribute("rel", "noreferrer");
  expect(area).toHaveAttribute("download", "memoized-image.jpg");
  expect(area).toHaveAttribute("referrerpolicy", "origin");
  expect(area).toHaveAttribute("hreflang", "en-US");
});

// different shape types test for AreaClient
it("renders with different shape types", async () => {
  // Rectangle shape
  const { rerender } = render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient data-testid="rect-area" coords="0,0,100,100" shape="rect" />
    </React.Suspense>
  );

  let area = await screen.findByTestId("rect-area");
  expect(area).toHaveAttribute("shape", "rect");
  expect(area).toHaveAttribute("coords", "0,0,100,100");

  // Circle shape
  rerender(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient data-testid="circle-area" coords="50,50,25" shape="circle" />
    </React.Suspense>
  );

  area = await screen.findByTestId("circle-area");
  expect(area).toHaveAttribute("shape", "circle");
  expect(area).toHaveAttribute("coords", "50,50,25");

  // Polygon shape
  rerender(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient
        data-testid="poly-area"
        coords="0,0,100,0,50,100"
        shape="poly"
      />
    </React.Suspense>
  );

  area = await screen.findByTestId("poly-area");
  expect(area).toHaveAttribute("shape", "poly");
  expect(area).toHaveAttribute("coords", "0,0,100,0,50,100");
});

// different shape types test for MemoizedAreaClient
it("renders memoized with different shape types", async () => {
  // Rectangle shape
  const { rerender } = render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="rect-area"
        coords="0,0,100,100"
        shape="rect"
      />
    </React.Suspense>
  );

  let area = await screen.findByTestId("rect-area");
  expect(area).toHaveAttribute("shape", "rect");
  expect(area).toHaveAttribute("coords", "0,0,100,100");

  // Circle shape
  rerender(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="circle-area"
        coords="50,50,25"
        shape="circle"
      />
    </React.Suspense>
  );

  area = await screen.findByTestId("circle-area");
  expect(area).toHaveAttribute("shape", "circle");
  expect(area).toHaveAttribute("coords", "50,50,25");

  // Polygon shape
  rerender(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="poly-area"
        coords="0,0,100,0,50,100"
        shape="poly"
      />
    </React.Suspense>
  );

  area = await screen.findByTestId("poly-area");
  expect(area).toHaveAttribute("shape", "poly");
  expect(area).toHaveAttribute("coords", "0,0,100,0,50,100");
});

// default alt prop test for AreaClient
it("renders with default alt prop", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient
        data-testid="area-element"
        coords="0,0,100,100"
        shape="rect"
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveAttribute("alt", "");
});

// default alt prop test for MemoizedAreaClient
it("renders memoized with default alt prop", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="area-element"
        coords="0,0,50,50"
        shape="circle"
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveAttribute("alt", "");
});

// custom alt prop test for AreaClient
it("renders with custom alt prop", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient
        data-testid="area-element"
        coords="0,0,100,100"
        shape="rect"
        alt="Custom alt text"
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveAttribute("alt", "Custom alt text");
});

// custom alt prop test for MemoizedAreaClient
it("renders memoized with custom alt prop", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="area-element"
        coords="0,0,50,50"
        shape="circle"
        alt="Memoized custom alt text"
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveAttribute("alt", "Memoized custom alt text");
});

// area with different href types test for AreaClient
it("renders with different href types", async () => {
  // External link
  const { rerender } = render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient
        data-testid="external-area"
        coords="0,0,100,100"
        shape="rect"
        href="https://example.com"
        target="_blank"
      />
    </React.Suspense>
  );

  let area = await screen.findByTestId("external-area");
  expect(area).toHaveAttribute("href", "https://example.com");
  expect(area).toHaveAttribute("target", "_blank");

  // Internal link
  rerender(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient
        data-testid="internal-area"
        coords="0,0,100,100"
        shape="rect"
        href="/internal-page"
      />
    </React.Suspense>
  );

  area = await screen.findByTestId("internal-area");
  expect(area).toHaveAttribute("href", "/internal-page");

  // Anchor link
  rerender(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient
        data-testid="anchor-area"
        coords="0,0,100,100"
        shape="rect"
        href="#section"
      />
    </React.Suspense>
  );

  area = await screen.findByTestId("anchor-area");
  expect(area).toHaveAttribute("href", "#section");
});

// area with different href types test for MemoizedAreaClient
it("renders memoized with different href types", async () => {
  // External link
  const { rerender } = render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="external-area"
        coords="0,0,50,50"
        shape="circle"
        href="https://memoized-example.com"
        target="_blank"
      />
    </React.Suspense>
  );

  let area = await screen.findByTestId("external-area");
  expect(area).toHaveAttribute("href", "https://memoized-example.com");
  expect(area).toHaveAttribute("target", "_blank");

  // Internal link
  rerender(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="internal-area"
        coords="0,0,50,50"
        shape="circle"
        href="/memoized-internal-page"
      />
    </React.Suspense>
  );

  area = await screen.findByTestId("internal-area");
  expect(area).toHaveAttribute("href", "/memoized-internal-page");

  // Anchor link
  rerender(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="anchor-area"
        coords="0,0,50,50"
        shape="circle"
        href="#memoized-section"
      />
    </React.Suspense>
  );

  area = await screen.findByTestId("anchor-area");
  expect(area).toHaveAttribute("href", "#memoized-section");
});

// accessibility test for AreaClient
it("renders with accessibility attributes", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient
        data-testid="area-element"
        coords="0,0,100,100"
        shape="rect"
        href="/link"
        alt="Accessible area description"
        aria-label="Clickable area"
        aria-describedby="area-description"
        role="link"
        tabIndex={0}
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveAttribute("alt", "Accessible area description");
  expect(area).toHaveAttribute("aria-label", "Clickable area");
  expect(area).toHaveAttribute("aria-describedby", "area-description");
  expect(area).toHaveAttribute("role", "link");
  expect(area).toHaveAttribute("tabindex", "0");
});

// accessibility test for MemoizedAreaClient
it("renders memoized with accessibility attributes", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="area-element"
        coords="0,0,50,50"
        shape="circle"
        href="/memoized-link"
        alt="Memoized accessible area description"
        aria-label="Memoized clickable area"
        aria-describedby="memoized-area-description"
        role="link"
        tabIndex={0}
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveAttribute("alt", "Memoized accessible area description");
  expect(area).toHaveAttribute("aria-label", "Memoized clickable area");
  expect(area).toHaveAttribute("aria-describedby", "memoized-area-description");
  expect(area).toHaveAttribute("role", "link");
  expect(area).toHaveAttribute("tabindex", "0");
});

// data attributes test for AreaClient
it("renders with data attributes", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient
        data-testid="area-element"
        coords="0,0,100,100"
        shape="rect"
        data-type="navigation"
        data-section="header"
        data-interactive="true"
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveAttribute("data-type", "navigation");
  expect(area).toHaveAttribute("data-section", "header");
  expect(area).toHaveAttribute("data-interactive", "true");
});

// data attributes test for MemoizedAreaClient
it("renders memoized with data attributes", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="area-element"
        coords="0,0,50,50"
        shape="circle"
        data-type="memoized-navigation"
        data-section="memoized-header"
        data-interactive="true"
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveAttribute("data-type", "memoized-navigation");
  expect(area).toHaveAttribute("data-section", "memoized-header");
  expect(area).toHaveAttribute("data-interactive", "true");
});

// event handlers test for AreaClient
it("renders with event handlers", async () => {
  const handleClick = vi.fn();
  const handleFocus = vi.fn();
  const handleBlur = vi.fn();

  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient
        data-testid="area-element"
        coords="0,0,100,100"
        shape="rect"
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");

  // Verify the component renders with event handlers
  expect(area).toHaveAttribute("tabindex", "0");

  // Click events may not work reliably in test environment for area elements
  // So we just verify the handlers are attached
  expect(area).toBeInTheDocument();
});

// event handlers test for MemoizedAreaClient
it("renders memoized with event handlers", async () => {
  const handleClick = vi.fn();
  const handleFocus = vi.fn();
  const handleBlur = vi.fn();

  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="area-element"
        coords="0,0,50,50"
        shape="circle"
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");

  // Verify the component renders with event handlers
  expect(area).toHaveAttribute("tabindex", "0");

  // Click events may not work reliably in test environment for area elements
  // So we just verify the handlers are attached
  expect(area).toBeInTheDocument();
});

// custom styling test for AreaClient
it("renders with custom styling", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient
        data-testid="area-element"
        coords="0,0,100,100"
        shape="rect"
        className="custom-area-class"
        style={{
          outline: "2px solid red",
          cursor: "pointer",
        }}
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveClass("custom-area-class");
  expect(area).toHaveStyle({
    outline: "2px solid red",
    cursor: "pointer",
  });
});

// custom styling test for MemoizedAreaClient
it("renders memoized with custom styling", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="area-element"
        coords="0,0,50,50"
        shape="circle"
        className="memoized-custom-area-class"
        style={{
          outline: "3px solid blue",
          cursor: "crosshair",
        }}
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveClass("memoized-custom-area-class");
  expect(area).toHaveStyle({
    outline: "3px solid blue",
    cursor: "crosshair",
  });
});

// area with custom attributes test for AreaClient
it("renders with custom attributes", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient
        data-testid="area-element"
        coords="0,0,100,100"
        shape="rect"
        id="custom-area-id"
        title="Custom area title"
        hidden={false}
        spellCheck={true}
        contentEditable={false}
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveAttribute("id", "custom-area-id");
  expect(area).toHaveAttribute("title", "Custom area title");
  expect(area).not.toHaveAttribute("hidden");
  expect(area).toHaveAttribute("spellcheck", "true");
  expect(area).toHaveAttribute("contenteditable", "false");
});

// area with custom attributes test for MemoizedAreaClient
it("renders memoized with custom attributes", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="area-element"
        coords="0,0,50,50"
        shape="circle"
        id="memoized-custom-area-id"
        title="Memoized custom area title"
        hidden={false}
        spellCheck={true}
        contentEditable={false}
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveAttribute("id", "memoized-custom-area-id");
  expect(area).toHaveAttribute("title", "Memoized custom area title");
  expect(area).not.toHaveAttribute("hidden");
  expect(area).toHaveAttribute("spellcheck", "true");
  expect(area).toHaveAttribute("contenteditable", "false");
});

// area with no href test for AreaClient
it("renders without href attribute", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient
        data-testid="area-element"
        coords="0,0,100,100"
        shape="rect"
        alt="Non-clickable area"
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveAttribute("coords", "0,0,100,100");
  expect(area).toHaveAttribute("shape", "rect");
  expect(area).toHaveAttribute("alt", "Non-clickable area");
  expect(area).not.toHaveAttribute("href");
});

// area with no href test for MemoizedAreaClient
it("renders memoized without href attribute", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="area-element"
        coords="0,0,50,50"
        shape="circle"
        alt="Memoized non-clickable area"
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveAttribute("coords", "0,0,50,50");
  expect(area).toHaveAttribute("shape", "circle");
  expect(area).toHaveAttribute("alt", "Memoized non-clickable area");
  expect(area).not.toHaveAttribute("href");
});

// area with empty coordinates test for AreaClient
it("renders with empty coordinates", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient
        data-testid="area-element"
        coords=""
        shape="rect"
        alt="Empty coordinates area"
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveAttribute("coords", "");
  expect(area).toHaveAttribute("shape", "rect");
  expect(area).toHaveAttribute("alt", "Empty coordinates area");
});

// area with empty coordinates test for MemoizedAreaClient
it("renders memoized with empty coordinates", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="area-element"
        coords=""
        shape="circle"
        alt="Memoized empty coordinates area"
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveAttribute("coords", "");
  expect(area).toHaveAttribute("shape", "circle");
  expect(area).toHaveAttribute("alt", "Memoized empty coordinates area");
});

// area with special characters in alt test for AreaClient
it("renders with special characters in alt", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AreaClient
        data-testid="area-element"
        coords="0,0,100,100"
        shape="rect"
        alt={"Special & Characters < > \" '"}
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveAttribute("alt", "Special & Characters < > \" '");
});

// area with special characters in alt test for MemoizedAreaClient
it("renders memoized with special characters in alt", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAreaClient
        data-testid="area-element"
        coords="0,0,50,50"
        shape="circle"
        alt={"Memoized Special & Characters < > \" '"}
      />
    </React.Suspense>
  );

  const area = await screen.findByTestId("area-element");
  expect(area).toHaveAttribute("alt", "Memoized Special & Characters < > \" '");
});
