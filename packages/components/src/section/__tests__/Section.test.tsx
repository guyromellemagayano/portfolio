import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Section } from "..";

it("renders a section element with heading", () => {
  render(
    <Section data-testid="el" className="wrap">
      <h2>Title</h2>
    </Section>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("SECTION");
  expect(el).toHaveClass("wrap");
  expect(el.querySelector("h2")).not.toBeNull();
});

it("toggles data attributes across rerenders", () => {
  const { rerender } = render(
    <Section data-testid="el" data-x="1">
      x
    </Section>
  );
  let el = screen.getByTestId("el");
  expect(el).toHaveAttribute("data-x", "1");
  rerender(
    <Section data-testid="el" data-x="2">
      x
    </Section>
  );
  el = screen.getByTestId("el");
  expect(el).toHaveAttribute("data-x", "2");
});

it("renders and wires optional heading and description content", () => {
  render(
    <Section
      data-testid="el"
      description="Recent delivery highlights."
      heading="Selected work"
      id="work"
    >
      <p>Project list</p>
    </Section>
  );

  const section = screen.getByTestId("el");
  const heading = screen.getByRole("heading", {
    level: 2,
    name: "Selected work",
  });
  const description = screen.getByText("Recent delivery highlights.");

  expect(section).toHaveAttribute("aria-labelledby", "work-heading");
  expect(section).toHaveAttribute("aria-describedby", "work-description");
  expect(heading).toHaveAttribute("id", "work-heading");
  expect(heading).toHaveAttribute("data-slot", "section-heading");
  expect(description).toHaveAttribute("id", "work-description");
  expect(description).toHaveAttribute("data-slot", "section-description");
  expect(
    section.querySelector('[data-slot="section-header"]')
  ).toBeInTheDocument();
});

it("preserves explicit accessibility relationships", () => {
  render(
    <Section
      aria-describedby="custom-description"
      aria-labelledby="custom-heading"
      data-testid="el"
      description="Generated description."
      heading="Generated heading"
      id="custom"
    />
  );

  const section = screen.getByTestId("el");
  expect(section).toHaveAttribute("aria-labelledby", "custom-heading");
  expect(section).toHaveAttribute("aria-describedby", "custom-description");
});
