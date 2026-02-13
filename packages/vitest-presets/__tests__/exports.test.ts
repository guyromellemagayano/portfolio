import { describe, expect, it } from "vitest";

describe("Barrel Exports", () => {
  describe("Main barrel export", () => {
    it("should export all presets from main index", async () => {
      const exports = await import("..");
      expect(exports.browserPreset).toBeDefined();
      expect(exports.nodePreset).toBeDefined();
      expect(exports.reactPreset).toBeDefined();
    });

    it("should export browserPreset as default-compatible", async () => {
      const exports = await import("..");
      const browserPreset = exports.browserPreset;
      expect(browserPreset).toBeDefined();
      expect(browserPreset.test).toBeDefined();
      expect(browserPreset.test?.environment).toBe("jsdom");
    });

    it("should export nodePreset as default-compatible", async () => {
      const exports = await import("..");
      const nodePreset = exports.nodePreset;
      expect(nodePreset).toBeDefined();
      expect(nodePreset.test).toBeDefined();
      expect(nodePreset.test?.environment).toBe("node");
    });

    it("should export reactPreset as default-compatible", async () => {
      const exports = await import("..");
      const reactPreset = exports.reactPreset;
      expect(reactPreset).toBeDefined();
      expect(reactPreset.test).toBeDefined();
      expect(reactPreset.test?.environment).toBe("jsdom");
    });
  });

  describe("Directory barrel exports", () => {
    it("should export browser preset from browser/index", async () => {
      const browserExports = await import("../browser");
      expect(browserExports.browserPreset).toBeDefined();
      expect(browserExports.browserPreset.test?.environment).toBe("jsdom");
    });

    it("should export node preset from node/index", async () => {
      const nodeExports = await import("../node");
      expect(nodeExports.nodePreset).toBeDefined();
      expect(nodeExports.nodePreset.test?.environment).toBe("node");
    });

    it("should export react preset from react/index", async () => {
      const reactExports = await import("../react");
      expect(reactExports.reactPreset).toBeDefined();
      expect(reactExports.reactPreset.test?.environment).toBe("jsdom");
    });
  });

  describe("Package.json exports field compatibility", () => {
    it("should support main barrel export path", async () => {
      // This simulates: import { browserPreset } from "@portfolio/vitest-presets"
      const exports = await import("..");
      expect(exports.browserPreset).toBeDefined();
    });

    it("should support directory export paths", async () => {
      // This simulates: import { browserPreset } from "@portfolio/vitest-presets/browser"
      const browserExports = await import("../browser");
      expect(browserExports.browserPreset).toBeDefined();
    });

    it("should support barrel export pattern", async () => {
      // This simulates: import { browserPreset } from "@portfolio/vitest-presets/browser"
      const browserExports = await import("../browser");
      expect(browserExports.browserPreset).toBeDefined();
      expect(browserExports.browserPreset.test?.environment).toBe("jsdom");
    });
  });
});
