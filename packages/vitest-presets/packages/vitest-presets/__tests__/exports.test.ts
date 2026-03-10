/**
 * @file packages/vitest-presets/__tests__/exports.test.ts
 * @author Guy Romelle Magayano
 * @description Verifies main barrel exports and shared setup entry point for the vitest-presets package.
 */

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

  describe("Package.json exports field compatibility", () => {
    it("should support main barrel export path", async () => {
      // This simulates: import { browserPreset } from "@portfolio/vitest-presets"
      const exports = await import("..");
      expect(exports.browserPreset).toBeDefined();
    });

    it("should support shared test setup entry point", async () => {
      // This simulates: import "@portfolio/vitest-presets/shared/test-setup.ts"
      const setupModule = await import("../shared/test-setup.ts");
      expect(setupModule).toBeDefined();
    });
  });
});
