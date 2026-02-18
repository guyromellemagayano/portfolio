/**
 * @portfolio/vitest-presets
 *
 * Shared Vitest configuration presets for the monorepo.
 */

// Presets
export { browserPreset } from "./browser";
export { nodePreset } from "./node";
export { reactPreset } from "./react";

// Note: test-setup.ts should be imported directly in vitest.config.ts setupFiles
// Do not import it here as it will execute during config loading
