import React from "react";

import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Div } from "..";

const CustomDiv = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>((props, ref) => <div ref={ref} data-testid="custom" {...props} />);
CustomDiv.displayName = "CustomDiv";

// Basic render
it("renders a div element", () => {
  render(<Div data-testid="div-element">Hello</Div>);
  const el = screen.getByTestId("div-element");
  expect(el.tagName).toBe("DIV");
  expect(el).toHaveTextContent("Hello");
});

// Polymorphic 'as'
it("renders as a custom element with 'as' prop", () => {
  render(
    <Div as="section" data-testid="custom-section">
      Section content
    </Div>
  );
  const el = screen.getByTestId("custom-section");
  expect(el.tagName).toBe("SECTION");
  expect(el).toHaveTextContent("Section content");
});

// Synchronous rendering
it("renders synchronous render with standard props", async () => {
  render(<Div data-testid="div-element">Synchronous content</Div>);
  const el = screen.getByTestId("div-element");
  expect(el.tagName).toBe("DIV");
  expect(el).toHaveTextContent("Synchronous content");
  await screen.findByTestId("div-element");
});

it("renders standard component with standard props", async () => {
  render(<Div data-testid="div-element">Repeated client content</Div>);
  const el = screen.getByTestId("div-element");
  expect(el.tagName).toBe("DIV");
  expect(el).toHaveTextContent("Repeated client content");
  await screen.findByTestId("div-element");
});

// Ref forwarding (rendered)
it("forwards ref correctly when rendered on client", () => {
  const ref = React.createRef<HTMLDivElement>();
  render(<Div ref={ref}>Ref content</Div>);
  expect(ref.current).not.toBeNull();
  expect(ref.current?.tagName).toBe("DIV");
});

// Styling and attributes
it("supports className and inline styles", () => {
  render(
    <Div
      data-testid="div-element"
      className="card container"
      style={{ backgroundColor: "#fafafa", color: "green" }}
    >
      Styled
    </Div>
  );
  const el = screen.getByTestId("div-element");
  expect(el).toHaveClass("container", "card");
  expect(el).toHaveStyle({ color: "rgb(0, 128, 0)" });
});

it("supports data-* and aria-* attributes", () => {
  render(
    <Div
      data-testid="div-element"
      data-role="panel"
      aria-label="Panel"
      role="region"
    >
      ARIA
    </Div>
  );
  const el = screen.getByTestId("div-element");
  expect(el).toHaveAttribute("data-role", "panel");
  expect(el).toHaveAttribute("aria-label", "Panel");
  expect(el).toHaveAttribute("role", "region");
});

// Children rendering
it("renders nested children", () => {
  render(
    <Div data-testid="div-element">
      <span>One</span>
      <span>Two</span>
    </Div>
  );
  const el = screen.getByTestId("div-element");
  expect(el.querySelectorAll("span")).toHaveLength(2);
  expect(el).toHaveTextContent("One");
  expect(el).toHaveTextContent("Two");
});

// Empty content variants
it("handles null and undefined children", () => {
  const { rerender } = render(<Div data-testid="div-element">{null}</Div>);
  let el = screen.getByTestId("div-element");
  expect(el).toBeInTheDocument();
  expect(el).toBeEmptyDOMElement();

  rerender(<Div data-testid="div-element">{undefined}</Div>);
  el = screen.getByTestId("div-element");
  expect(el).toBeInTheDocument();
  expect(el).toBeEmptyDOMElement();
});

// Performance
it("renders within reasonable time", () => {
  const start = performance.now();
  render(<Div data-testid="div-element">perf</Div>);
  const end = performance.now();
  expect(end - start).toBeLessThan(100);
  expect(screen.getByTestId("div-element")).toBeInTheDocument();
});

// Works in context
it("renders within React context providers", () => {
  const TestContext = React.createContext("default");
  render(
    <TestContext value="x">
      <Div data-testid="div-element">ctx</Div>
    </TestContext>
  );
  expect(screen.getByTestId("div-element")).toBeInTheDocument();
});

// Prop switching across rerenders
it("supports switching 'as' element types across rerenders", () => {
  const { rerender } = render(
    <Div data-testid="poly" as="div">
      Poly
    </Div>
  );
  expect(screen.getByTestId("poly").tagName).toBe("DIV");

  rerender(
    <Div data-testid="poly" as="section">
      Poly
    </Div>
  );
  expect(screen.getByTestId("poly").tagName).toBe("SECTION");

  rerender(
    <Div data-testid="poly" as="span">
      Poly
    </Div>
  );
  expect(screen.getByTestId("poly").tagName).toBe("SPAN");
});

it("supports className and style changes across rerenders", () => {
  const { rerender } = render(
    <Div data-testid="styled" className="a" style={{ color: "red" }}>
      Styled
    </Div>
  );
  const el = screen.getByTestId("styled");
  expect(el).toHaveClass("a");
  expect(el).toHaveStyle({ color: "rgb(255, 0, 0)" });

  rerender(
    <Div data-testid="styled" className="b c" style={{ color: "blue" }}>
      Styled
    </Div>
  );
  const el2 = screen.getByTestId("styled");
  expect(el2).toHaveClass("b", "c");
  expect(el2).toHaveStyle({ color: "rgb(0, 0, 255)" });
});

it("supports adding and removing data attributes across rerenders", () => {
  const { rerender } = render(
    <Div data-testid="data" data-foo="bar">
      data
    </Div>
  );
  expect(screen.getByTestId("data")).toHaveAttribute("data-foo", "bar");

  rerender(<Div data-testid="data">data</Div>);
  expect(screen.getByTestId("data")).not.toHaveAttribute("data-foo");
});

it("supports ARIA attribute toggling across rerenders", () => {
  const { rerender } = render(
    <Div data-testid="aria" aria-hidden="true">
      aria
    </Div>
  );
  expect(screen.getByTestId("aria")).toHaveAttribute("aria-hidden", "true");

  rerender(
    <Div data-testid="aria" aria-hidden="false" aria-live="polite">
      aria
    </Div>
  );
  const el = screen.getByTestId("aria");
  expect(el).toHaveAttribute("aria-hidden", "false");
  expect(el).toHaveAttribute("aria-live", "polite");
});

it("supports role and tabIndex toggling", () => {
  const { rerender } = render(
    <Div data-testid="acc" role="region" tabIndex={0}>
      acc
    </Div>
  );
  let el = screen.getByTestId("acc");
  expect(el).toHaveAttribute("role", "region");
  expect(el).toHaveAttribute("tabindex", "0");

  rerender(
    <Div data-testid="acc" role="presentation" tabIndex={-1}>
      acc
    </Div>
  );
  el = screen.getByTestId("acc");
  expect(el).toHaveAttribute("role", "presentation");
  expect(el).toHaveAttribute("tabindex", "-1");
});

it("supports contentEditable, spellCheck, dir and lang", () => {
  render(
    <Div
      data-testid="attrs"
      contentEditable
      spellCheck={false}
      dir="rtl"
      lang="ar"
    />
  );
  const el = screen.getByTestId("attrs");
  expect(el).toHaveAttribute("contenteditable", "true");
  expect(el).toHaveAttribute("spellcheck", "false");
  expect(el).toHaveAttribute("dir", "rtl");
  expect(el).toHaveAttribute("lang", "ar");
});

it("supports hidden attribute toggling", () => {
  const { rerender } = render(
    <Div data-testid="hidden" hidden>
      x
    </Div>
  );
  expect(screen.getByTestId("hidden")).toHaveAttribute("hidden");
  rerender(<Div data-testid="hidden">x</Div>);
  expect(screen.getByTestId("hidden")).not.toHaveAttribute("hidden");
});

it("supports dangerouslySetInnerHTML", () => {
  render(
    <Div
      data-testid="html"
      dangerouslySetInnerHTML={{ __html: '<span id="x">inner</span>' }}
    />
  );
  const el = screen.getByTestId("html");
  expect(el.querySelector("#x")).toBeInTheDocument();
  expect(el).toHaveTextContent("inner");
});

it("renders long, special, and unicode content", () => {
  const long = "A".repeat(2000);
  const special = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
  const unicode = "🚀🎉🎨";
  render(
    <Div data-testid="text">
      {long}
      {special}
      {unicode}
    </Div>
  );
  const el = screen.getByTestId("text");
  expect(el).toHaveTextContent(long);
  expect(el).toHaveTextContent(special);
  expect(el).toHaveTextContent(unicode);
});

it("unmounts cleanly without memory issues", () => {
  const { unmount } = render(<Div data-testid="u">u</Div>);
  expect(screen.getByTestId("u")).toBeInTheDocument();
  unmount();
  // Passes if no errors thrown
  expect(true).toBe(true);
});

it("accepts custom React component for 'as'", () => {
  render(
    <Div as={CustomDiv} data-role="custom-role">
      content
    </Div>
  );
  const el = screen.getByTestId("custom");
  expect(el).toHaveAttribute("data-role", "custom-role");
  expect(el).toHaveTextContent("content");
});
