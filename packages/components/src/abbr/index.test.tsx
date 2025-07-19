import React from "react";

import { render, screen } from "@testing-library/react";

import { Abbr } from ".";

// Basic render test
it("renders an abbreviation with children", () => {
  render(<Abbr>HTML</Abbr>);
  const abbr = screen.getByText("HTML");
  expect(abbr.tagName).toBe("ABBR");
});

// title attribute test (important for abbreviations)
it("renders with title attribute for accessibility", () => {
  render(<Abbr title="HyperText Markup Language">HTML</Abbr>);
  const abbr = screen.getByText("HTML");
  expect(abbr).toHaveAttribute("title", "HyperText Markup Language");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <Abbr as="span" data-testid="custom-span">
      CSS
    </Abbr>
  );
  const span = screen.getByTestId("custom-span");
  expect(span.tagName).toBe("SPAN");
  expect(span).toHaveTextContent("CSS");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(<Abbr isClient>JavaScript</Abbr>);

  // Should render the fallback (the abbr) immediately
  const abbr = screen.getByText("JavaScript");
  expect(abbr.tagName).toBe("ABBR");

  // The lazy component should load and render the same content
  await screen.findByText("JavaScript");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <Abbr isClient isMemoized>
      React
    </Abbr>
  );

  // Should render the fallback (the abbr) immediately
  const abbr = screen.getByText("React");
  expect(abbr.tagName).toBe("ABBR");

  // The lazy component should load and render the same content
  await screen.findByText("React");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLElement>();
  render(<Abbr ref={ref}>API</Abbr>);
  expect(ref.current).toBeInstanceOf(HTMLElement);
  expect(ref.current?.tagName).toBe("ABBR");
});
