import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Title } from ".";

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
