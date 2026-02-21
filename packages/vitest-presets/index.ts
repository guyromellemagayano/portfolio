/**
 * @portfolio/vitest-presets
 *
 * Shared Vitest configuration presets for the monorepo.
 */

// Presets
export { default as browserPreset } from "./browser/vitest-preset";
export { default as nodePreset } from "./node/vitest-preset";
export { default as reactPreset } from "./react/vitest-preset";

// Note: test-setup.ts should be imported directly in vitest.config.ts setupFiles
// Do not import it here as it will execute during config loading
