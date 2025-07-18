import { render, screen } from "@testing-library/react";

import { A } from ".";

// Basic render test
it("renders an anchor with children", () => {
  render(<A>Link Text</A>);
  const link = screen.getByText("Link Text");
  expect(link.tagName).toBe("A");
});

// Default href test
it("renders with default href '#' if not provided", () => {
  render(<A>Default Href</A>);
  const link = screen.getByText("Default Href");
  expect(link).toHaveAttribute("href", "#");
});

// Custom href test
it("renders with a custom href", () => {
  render(<A href="/about">About</A>);
  const link = screen.getByText("About");
  expect(link).toHaveAttribute("href", "/about");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <A as="button" data-testid="custom-btn">
      Button Link
    </A>
  );
  const btn = screen.getByTestId("custom-btn");
  expect(btn.tagName).toBe("BUTTON");
  expect(btn).toHaveTextContent("Button Link");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(<A isClient>Client Link</A>);

  // Should render the fallback (the anchor) immediately
  const link = screen.getByText("Client Link");
  expect(link.tagName).toBe("A");

  // The lazy component should load and render the same content
  await screen.findByText("Client Link");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <A isClient isMemoized>
      Memoized Client Link
    </A>
  );

  // Should render the fallback (the anchor) immediately
  const link = screen.getByText("Memoized Client Link");
  expect(link.tagName).toBe("A");

  // The lazy component should load and render the same content
  await screen.findByText("Memoized Client Link");
});
