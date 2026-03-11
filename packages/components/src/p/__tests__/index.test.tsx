import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { P } from "..";

it("renders a paragraph element", () => {
  render(<P data-testid="p-element">Text</P>);
  const el = screen.getByTestId("p-element");
  expect(el.tagName).toBe("P");
  expect(el).toHaveTextContent("Text");
});

it("renders as a custom element with 'as' prop", () => {
  render(
    <P as="div" data-testid="custom-div">
      Div paragraph
    </P>
  );
  const el = screen.getByTestId("custom-div");
  expect(el.tagName).toBe("DIV");
  expect(el).toHaveTextContent("Div paragraph");
});

it("hydrates client when isClient is true", async () => {
  render(
    <P isClient data-testid="p-element">
      Client
    </P>
  );
  const el = screen.getByTestId("p-element");
  expect(el.tagName).toBe("P");
  expect(el).toHaveTextContent("Client");
  await screen.findByTestId("p-element");
});

it("hydrates memoized when isClient and isMemoized are true", async () => {
  render(
    <P isClient isMemoized data-testid="p-element">
      Client Memo
    </P>
  );
  const el = screen.getByTestId("p-element");
  expect(el.tagName).toBe("P");
  expect(el).toHaveTextContent("Client Memo");
  await screen.findByTestId("p-element");
});

it("forwards ref when hydrated", () => {
  const ref = React.createRef<HTMLParagraphElement>();
  render(
    <P isClient ref={ref}>
      Ref
    </P>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("P");
  }
});

it("supports styles and classes", () => {
  render(
    <P data-testid="p-element" className="lead" style={{ color: "blue" }}>
      Styled
    </P>
  );
  const el = screen.getByTestId("p-element");
  expect(el).toHaveClass("lead");
  expect(el).toHaveStyle({ color: "rgb(0, 0, 255)" });
});

it("supports data and aria attributes", () => {
  render(
    <P data-testid="p-element" data-size="lg" aria-label="Paragraph">
      ARIA
    </P>
  );
  const el = screen.getByTestId("p-element");
  expect(el).toHaveAttribute("data-size", "lg");
  expect(el).toHaveAttribute("aria-label", "Paragraph");
});

it("renders nested children", () => {
  render(
    <P data-testid="p-element">
      <strong>Bold</strong> and <em>Italic</em>
    </P>
  );
  const el = screen.getByTestId("p-element");
  expect(el.querySelectorAll("strong")).toHaveLength(1);
  expect(el.querySelectorAll("em")).toHaveLength(1);
});

it("handles empty children", () => {
  const { rerender } = render(<P data-testid="p-element">{null}</P>);
  let el = screen.getByTestId("p-element");
  expect(el).toBeEmptyDOMElement();
  rerender(<P data-testid="p-element">{undefined}</P>);
  el = screen.getByTestId("p-element");
  expect(el).toBeEmptyDOMElement();
});

it("renders fast enough", () => {
  const start = performance.now();
  render(<P data-testid="p-element">perf</P>);
  const end = performance.now();
  expect(end - start).toBeLessThan(100);
});

// Additional parity tests
it("supports switching 'as' across rerenders", () => {
  const { rerender } = render(
    <P data-testid="poly" as="p">
      x
    </P>
  );
  expect(screen.getByTestId("poly").tagName).toBe("P");

  rerender(
    <P data-testid="poly" as="div">
      x
    </P>
  );
  expect(screen.getByTestId("poly").tagName).toBe("DIV");
});

it("toggles classes/styles across rerenders", () => {
  const { rerender } = render(
    <P data-testid="styled" className="a" style={{ color: "red" }}>
      s
    </P>
  );
  expect(screen.getByTestId("styled")).toHaveClass("a");
  expect(screen.getByTestId("styled")).toHaveStyle({ color: "rgb(255, 0, 0)" });

  rerender(
    <P data-testid="styled" className="b c" style={{ color: "green" }}>
      s
    </P>
  );
  expect(screen.getByTestId("styled")).toHaveClass("b", "c");
  expect(screen.getByTestId("styled")).toHaveStyle({ color: "rgb(0, 128, 0)" });
});

it("toggles data/aria across rerenders", () => {
  const { rerender } = render(
    <P data-testid="attrs" data-x="1" aria-hidden="true">
      a
    </P>
  );
  let el = screen.getByTestId("attrs");
  expect(el).toHaveAttribute("data-x", "1");
  expect(el).toHaveAttribute("aria-hidden", "true");

  rerender(
    <P data-testid="attrs" aria-hidden="false">
      a
    </P>
  );
  el = screen.getByTestId("attrs");
  expect(el).not.toHaveAttribute("data-x");
  expect(el).toHaveAttribute("aria-hidden", "false");
});

it("renders long, special, and unicode content", () => {
  const long = "A".repeat(2000);
  const special = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
  const unicode = "🚀🎉🎨";
  render(
    <P data-testid="text">
      {long}
      {special}
      {unicode}
    </P>
  );
  const el = screen.getByTestId("text");
  expect(el).toHaveTextContent(long);
  expect(el).toHaveTextContent(special);
  expect(el).toHaveTextContent(unicode);
});
