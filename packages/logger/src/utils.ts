/**
 * Universal logger utilities for enhanced functionality
 * Provides ID generation, performance monitoring, and system detection
 */

import {
  type Environment,
  type LogContext,
  type LogLevel,
  LogLevel as LogLevelEnum,
  type LogLevelString,
} from "./types";

/** Generate unique IDs */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/** Generate correlation/request IDs */
export const generateRequestId = (): string => {
  return `req_${generateId()}`;
};

/** Generate session IDs */
export const generateSessionId = (): string => {
  return `sess_${generateId()}`;
};

/** Convert log level string to enum */
export const parseLogLevel = (level: LogLevel | LogLevelString): LogLevel => {
  if (typeof level === "number") {
    return level;
  }

  const levelUpper = level.toUpperCase() as keyof typeof LogLevelEnum;
  const parsed = LogLevelEnum[levelUpper];

  if (parsed === undefined) {
    throw new Error(`Invalid log level: ${level}`);
  }

  return parsed;
};

/** Get log level name */
export const getLogLevelName = (level: LogLevel): string => {
  const names = {
    [LogLevelEnum.SILENT]: "SILENT",
    [LogLevelEnum.ERROR]: "ERROR",
    [LogLevelEnum.WARN]: "WARN",
    [LogLevelEnum.INFO]: "INFO",
    [LogLevelEnum.HTTP]: "HTTP",
    [LogLevelEnum.VERBOSE]: "VERBOSE",
    [LogLevelEnum.DEBUG]: "DEBUG",
    [LogLevelEnum.SILLY]: "SILLY",
  };

  return names[level] ?? "UNKNOWN";
};

/** Check if level should be logged */
export const shouldLog = (
  currentLevel: LogLevel,
  targetLevel: LogLevel
): boolean => {
  return targetLevel <= currentLevel && currentLevel !== LogLevelEnum.SILENT;
};

/** Environment detection */
export const detectEnvironment = (): Environment => {
  // Node.js environment
  if (typeof process !== "undefined" && process.env) {
    const nodeEnv = process.env.NODE_ENV?.toLowerCase();
    switch (nodeEnv) {
      case "production":
        return "production";
      case "development":
        return "development";
      case "test":
        return "test";
      case "staging":
        return "staging";
      default:
        return "development";
    }
  }

  // Browser environment detection (simplified)
  try {
    const hostname = (globalThis as any)?.location?.hostname;
    if (hostname) {
      if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
        return "development";
      }
      if (hostname.includes("staging") || hostname.includes("dev.")) {
        return "staging";
      }
      if (hostname.includes("test")) {
        return "test";
      }
    }
    return "production"; // Default for browser
  } catch {
    return "development"; // Fallback
  }
};

/** Runtime detection */
export const getRuntime = (): "node" | "browser" | "worker" | "unknown" => {
  if (typeof process !== "undefined" && process.versions?.node) {
    return "node";
  }

  try {
    if (typeof globalThis !== "undefined" && "window" in globalThis) {
      return "browser";
    }

    if (
      typeof globalThis !== "undefined" &&
      "self" in globalThis &&
      "importScripts" in globalThis
    ) {
      return "worker";
    }
  } catch {
    // Ignore errors in environment detection
  }

  return "unknown";
};

/** Memory usage (Node.js only) */
export const getMemoryUsage = (): NodeJS.MemoryUsage | undefined => {
  if (typeof process !== "undefined" && process.memoryUsage) {
    return process.memoryUsage();
  }
  return undefined;
};

/** Performance timing utilities */
export const createTimer = () => {
  const start = performance.now();
  const startMemory = getMemoryUsage();

  return {
    end: () => {
      const duration = performance.now() - start;
      const endMemory = getMemoryUsage();

      return {
        duration,
        startMemory,
        endMemory,
        memoryDelta:
          endMemory && startMemory
            ? {
                rss: endMemory.rss - startMemory.rss,
                heapTotal: endMemory.heapTotal - startMemory.heapTotal,
                heapUsed: endMemory.heapUsed - startMemory.heapUsed,
                external: endMemory.external - startMemory.external,
                arrayBuffers: endMemory.arrayBuffers - startMemory.arrayBuffers,
              }
            : undefined,
      };
    },
  };
};

/** Sanitize data for logging */
export const sanitizeData = (
  data: unknown,
  maxDepth = 3,
  currentDepth = 0
): unknown => {
  if (currentDepth >= maxDepth) {
    return "[Max Depth Reached]";
  }

  if (data === null || data === undefined) {
    return data;
  }

  if (
    typeof data === "string" ||
    typeof data === "number" ||
    typeof data === "boolean"
  ) {
    return data;
  }

  if (data instanceof Error) {
    return {
      name: data.name,
      message: data.message,
      stack: data.stack,
    };
  }

  if (data instanceof Date) {
    return data.toISOString();
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeData(item, maxDepth, currentDepth + 1));
  }

  if (typeof data === "object") {
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(data)) {
      // Skip potentially sensitive fields
      if (
        key.toLowerCase().includes("password") ||
        key.toLowerCase().includes("secret") ||
        key.toLowerCase().includes("token") ||
        key.toLowerCase().includes("key") ||
        key.toLowerCase().includes("auth")
      ) {
        sanitized[key] = "[REDACTED]";
      } else {
        sanitized[key] = sanitizeData(value, maxDepth, currentDepth + 1);
      }
    }

    return sanitized;
  }

  return String(data);
};

/** Extract error stack trace information */
export const getStackTrace = (
  skipFrames = 0
):
  | { file?: string; function?: string; line?: number; column?: number }
  | undefined => {
  try {
    const stack = new Error().stack;
    if (!stack) return undefined;

    const lines = stack.split("\n");
    const targetLine = lines[skipFrames + 2]; // Skip Error constructor and this function

    if (!targetLine) return undefined;

    // Parse stack trace line (format varies by runtime)
    const match =
      targetLine.match(/at\s+(.+?)\s+\((.+):(\d+):(\d+)\)/) ||
      targetLine.match(/at\s+(.+):(\d+):(\d+)/) ||
      targetLine.match(/(.+)@(.+):(\d+):(\d+)/);

    if (!match) return undefined;

    if (match.length === 5 && match[3] && match[4]) {
      return {
        function: match[1],
        file: match[2],
        line: parseInt(match[3], 10),
        column: parseInt(match[4], 10),
      };
    } else if (match.length === 4 && match[2] && match[3]) {
      return {
        file: match[1],
        line: parseInt(match[2], 10),
        column: parseInt(match[3], 10),
      };
    }

    return undefined;
  } catch {
    return undefined;
  }
};

/** Rate limiting utility */
export class RateLimiter {
  private counts: Map<string, { count: number; resetTime: number }> = new Map();

  constructor(
    private readonly max: number,
    private readonly windowMs: number
  ) {}

  isAllowed(key: string = "default"): boolean {
    const now = Date.now();
    const entry = this.counts.get(key);

    if (!entry || now >= entry.resetTime) {
      this.counts.set(key, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (entry.count >= this.max) {
      return false;
    }

    entry.count++;
    return true;
  }

  reset(key?: string): void {
    if (key) {
      this.counts.delete(key);
    } else {
      this.counts.clear();
    }
  }
}

/** Context merging utility */
export const mergeContexts = (
  ...contexts: (Partial<LogContext> | undefined)[]
): LogContext => {
  const merged: LogContext = {};

  for (const context of contexts) {
    if (!context) continue;

    Object.assign(merged, context);

    // Special handling for metadata - merge instead of replace
    if (context.metadata && merged.metadata) {
      merged.metadata = { ...merged.metadata, ...context.metadata };
    }

    // Special handling for timing - use the most recent
    if (context.timing) {
      merged.timing = context.timing;
    }
  }

  return merged;
};

/** Format bytes to human readable */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/** Format duration to human readable */
export const formatDuration = (ms: number): string => {
  if (ms < 1) return `${(ms * 1000).toFixed(0)}μs`;
  if (ms < 1000) return `${ms.toFixed(1)}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  if (ms < 3600000) return `${(ms / 60000).toFixed(1)}m`;
  return `${(ms / 3600000).toFixed(1)}h`;
};

/** Async queue for batching operations */
export class AsyncQueue<T> {
  private queue: T[] = [];
  private processing = false;

  constructor(
    private readonly batchSize: number,
    private readonly flushInterval: number,
    private readonly processor: (items: T[]) => Promise<void>
  ) {
    this.startFlushTimer();
  }

  add(item: T): void {
    this.queue.push(item);

    if (this.queue.length >= this.batchSize) {
      this.flush();
    }
  }

  private async flush(): Promise<void> {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;
    const items = this.queue.splice(0, this.batchSize);

    try {
      await this.processor(items);
    } catch (error) {
      // Re-add items to queue for retry
      this.queue.unshift(...items);
      throw error;
    } finally {
      this.processing = false;
    }
  }

  private startFlushTimer(): void {
    setInterval(() => {
      this.flush().catch(() => {
        // Ignore errors in timer-triggered flush
      });
    }, this.flushInterval);
  }

  async forceFlush(): Promise<void> {
    while (this.queue.length > 0) {
      await this.flush();
    }
  }
}

/** Logger utilities object */
export const utils = {
  generateId,
  generateRequestId,
  generateSessionId,
  parseLogLevel,
  getLogLevelName,
  shouldLog,
  detectEnvironment,
  getRuntime,
  getMemoryUsage,
  createTimer,
  sanitizeData,
  getStackTrace,
  mergeContexts,
  formatBytes,
  formatDuration,
  RateLimiter,
  AsyncQueue,
} as const;
