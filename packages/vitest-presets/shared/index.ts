/**
 * Shared test setup barrel export
 *
 * Note: test-setup.ts is a side-effect file that sets up mocks and global configurations.
 * It doesn't export anything by default, but we re-export it for convenience.
 */

// Re-export the side-effect file (it will execute when imported)
import "./test-setup.ts";

// Since test-setup.ts doesn't export anything, we export a placeholder
export const testSetup = true;
