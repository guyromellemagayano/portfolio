import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Title } from "..";

it("renders document title into head", () => {
  render(<Title>My Title</Title>, {
    container: document.head as unknown as HTMLElement,
  });
  expect(document.title).toBe("My Title");
});

it("toggles title across rerenders", () => {
  const { rerender } = render(<Title>First</Title>, {
    container: document.head as unknown as HTMLElement,
  });
  expect(document.title).toBe("First");
  rerender(<Title>Second</Title>);
  expect(document.title).toBe("Second");
});

it("adds dev debug attributes in development (head-scoped)", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  render(<Title data-testid="dbg">Dbg</Title>, {
    container: document.head as unknown as HTMLElement,
  });
  const el = document.head!.querySelector('title[data-testid="dbg"]');
  expect(el).not.toBeNull();
  expect(el).toHaveAttribute("data-component", "Title");
  expect(el).toHaveAttribute("data-as", "title");
  process.env.NODE_ENV = original;
});

it("last Title wins when multiple are rendered", () => {
  render(
    <>
      <Title>First</Title>
      <Title>Second</Title>
    </>,
    { container: document.head as unknown as HTMLElement }
  );
  expect(document.title).toBe("Second");
});
