// Mock for @portfolio/logger
import { vi } from "vitest";

// Create a mock logger instance
const mockLogger = {
  error: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  debug: vi.fn(),
  silly: vi.fn(),
  child: vi.fn(() => mockLogger),
  time: vi.fn(),
  timeEnd: vi.fn(),
  performance: vi.fn(),
  metric: vi.fn(),
  flush: vi.fn(),
  close: vi.fn(),
};

// Mock createLogger function
export const createLogger = vi.fn(() => mockLogger);

// Mock the main logger instance
export const logger = mockLogger;

// Legacy function mocks for backward compatibility
export const logError = vi.fn();
export const logInfo = vi.fn();
export const logWarn = vi.fn();
export const logDebug = vi.fn();
export const logTrace = vi.fn();
export const log = vi.fn();

// Mock default export (logger instance)
export default mockLogger;
