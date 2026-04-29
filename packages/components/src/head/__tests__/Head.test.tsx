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
  expect(title?.textContent).toBe("t");
});

it("supports 'as' prop", () => {
  render(
    <Head as="div" data-testid="el">
      x
    </Head>
  );
  expect(screen.getByTestId("el").tagName).toBe("DIV");
});

it("renders into document.head (meta present)", async () => {
  render(
    <Head>
      <meta name="x" content="y" />
    </Head>,
    { container: document.head as unknown as HTMLElement }
  );
  const meta = document.head!.querySelector('meta[name="x"][content="y"]');
  expect(meta).not.toBeNull();
});
