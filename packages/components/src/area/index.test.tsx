import React from "react";

import { render, screen } from "@testing-library/react";

import { Area } from ".";

// Basic render test
it("renders an area element", () => {
  render(<Area data-testid="area-element" coords="0,0,100,100" shape="rect" />);
  const area = screen.getByTestId("area-element");
  expect(area.tagName).toBe("AREA");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <Area as="div" data-testid="custom-div" coords="0,0,50,50" shape="circle" />
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(
    <Area
      isClient
      data-testid="area-element"
      coords="0,0,200,200"
      shape="poly"
    />
  );

  // Should render the fallback (the area) immediately
  const area = screen.getByTestId("area-element");
  expect(area.tagName).toBe("AREA");

  // The lazy component should load and render the same content
  await screen.findByTestId("area-element");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <Area
      isClient
      isMemoized
      data-testid="area-element"
      coords="0,0,150,150"
      shape="rect"
    />
  );

  // Should render the fallback (the area) immediately
  const area = screen.getByTestId("area-element");
  expect(area.tagName).toBe("AREA");

  // The lazy component should load and render the same content
  await screen.findByTestId("area-element");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLAreaElement>();
  render(<Area ref={ref} coords="0,0,100,100" shape="rect" />);
  expect(ref.current).toBeInstanceOf(HTMLElement);
  expect(ref.current?.tagName).toBe("AREA");
});

// Area-specific props test
it("renders with area-specific attributes", () => {
  render(
    <Area
      data-testid="area-element"
      coords="0,0,100,100"
      shape="rect"
      href="/link"
      alt="Clickable rectangle"
      target="_blank"
    />
  );

  const area = screen.getByTestId("area-element");
  expect(area).toHaveAttribute("coords", "0,0,100,100");
  expect(area).toHaveAttribute("shape", "rect");
  expect(area).toHaveAttribute("href", "/link");
  expect(area).toHaveAttribute("alt", "Clickable rectangle");
  expect(area).toHaveAttribute("target", "_blank");
});

// Different shape types test
it("renders with different shape types", () => {
  const { rerender } = render(
    <Area data-testid="rect-area" coords="0,0,100,100" shape="rect" />
  );
  expect(screen.getByTestId("rect-area")).toHaveAttribute("shape", "rect");

  rerender(<Area data-testid="circle-area" coords="50,50,25" shape="circle" />);
  expect(screen.getByTestId("circle-area")).toHaveAttribute("shape", "circle");

  rerender(
    <Area data-testid="poly-area" coords="0,0,100,0,50,100" shape="poly" />
  );
  expect(screen.getByTestId("poly-area")).toHaveAttribute("shape", "poly");
});

// Default alt prop test
it("renders with default alt prop", () => {
  render(<Area data-testid="area-element" coords="0,0,100,100" shape="rect" />);
  const area = screen.getByTestId("area-element");
  expect(area).toHaveAttribute("alt", "");
});

// Custom alt prop test
it("renders with custom alt prop", () => {
  render(
    <Area
      data-testid="area-element"
      coords="0,0,100,100"
      shape="rect"
      alt="Custom alt text"
    />
  );
  const area = screen.getByTestId("area-element");
  expect(area).toHaveAttribute("alt", "Custom alt text");
});
