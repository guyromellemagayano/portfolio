/**
 * @portfolio/vitest-presets
 *
 * Shared Vitest configuration presets for the monorepo.
 */

// Presets
export { browserPreset } from "./browser/vitest-preset.ts";
export { nodePreset } from "./node/vitest-preset.ts";
export { reactPreset } from "./react/vitest-preset.ts";

// Note: test-setup.ts should be imported directly in vitest.config.ts setupFiles
// Do not import it here as it will execute during config loading
