import { describe, expect, it, vi } from "vitest";

import { log } from "..";

vi.spyOn(global.console, "log");

describe("@packages/logger", () => {
  it("prints a message", () => {
    log("hello");

    expect(console.log).toHaveBeenCalledWith("LOGGER: ", "hello");
  });
});
