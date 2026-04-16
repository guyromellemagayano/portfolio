import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedTableClient, TableClient } from "../index.client";

it("renders a table element (client)", () => {
  render(
    <TableClient>
      <tbody>
        <tr>
          <td>x</td>
        </tr>
      </tbody>
    </TableClient>
  );
  const node = document.querySelector("table");
  expect(node).not.toBeNull();
});

it("renders a memoized table element (client)", () => {
  render(
    <MemoizedTableClient>
      <tbody>
        <tr>
          <td>y</td>
        </tr>
      </tbody>
    </MemoizedTableClient>
  );
  const node = document.querySelector("table");
  expect(node).not.toBeNull();
});
