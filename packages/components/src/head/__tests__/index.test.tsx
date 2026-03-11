import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Head } from "..";

it("renders into document.head container (title present)", () => {
  render(
    <Head>
      <title>t</title>
    </Head>,
    { container: document.head as unknown as HTMLElement }
  );
  const title = document.head!.querySelector("title");
  expect(title).not.toBeNull();
  if (title) expect(title.textContent).toBe("t");
});

it("supports 'as' prop", () => {
  render(
    <Head as="div" data-testid="el">
      x
    </Head>
  );
  expect(screen.getByTestId("el").tagName).toBe("DIV");
});

it("hydrates client into document.head (meta present)", async () => {
  render(
    <Head isClient>
      <meta name="x" content="y" />
    </Head>,
    { container: document.head as unknown as HTMLElement }
  );
  const meta = document.head!.querySelector('meta[name="x"][content="y"]');
  expect(meta).not.toBeNull();
});

it.skip("adds dev debug attributes in development when rendering Head", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  render(
    <Head data-testid="dbg">
      <meta name="dbg" content="1" />
    </Head>,
    { container: document.head as unknown as HTMLElement }
  );
  const headEl = document.head!;
  expect(headEl).toHaveAttribute("data-component", "Head");
  expect(headEl).toHaveAttribute("data-as", "head");
  process.env.NODE_ENV = original;
});
