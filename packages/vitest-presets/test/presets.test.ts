import { describe, expect, it } from "vitest";

describe("Vitest Presets", () => {
  it("should be able to import presets", async () => {
    // Test that presets can be imported
    const browserPreset = await import("../browser/vitest-preset");
    const nodePreset = await import("../node/vitest-preset");
    const reactPreset = await import("../react/vitest-preset");

    expect(browserPreset.default).toBeDefined();
    expect(nodePreset.default).toBeDefined();
    expect(reactPreset.default).toBeDefined();
  });

  it("should have correct test configuration", async () => {
    const browserPreset = await import("../browser/vitest-preset");
    const config = browserPreset.default;

    expect(config.test).toBeDefined();
    expect(config.test?.environment).toBe("jsdom");
    expect(config.test?.globals).toBe(true);
  });
});
