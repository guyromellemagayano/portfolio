/**
 * @guyromellemagayano/vitest-presets
 *
 * Shared Vitest configuration presets for the monorepo.
 */

// Presets
export { browserPreset } from "./browser";
export { nodePreset } from "./node";
export { reactPreset } from "./react";

// Test setup (side-effect file, re-exported for convenience)
export { testSetup } from "./shared";
