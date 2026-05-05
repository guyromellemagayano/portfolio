import { describe, expect, it, vi } from "vitest";

import {
  configureSentryLogger,
  createSentrySdkTransport,
  getSentryBaseRuntimeOptions,
  getSentryReplayRuntimeOptions,
  LogLevel,
  MemoryTransport,
  type SentrySdkBridge,
} from "..";
import { createLogger } from "../logger";

const TEST_SENTRY_TAGS = {
  "app.framework": "astro",
  "app.name": "test-web",
  "hosting.platform": "test",
};

describe("Sentry logger setup", () => {
  it("skips runtime options when Sentry has no DSN", () => {
    expect(
      getSentryBaseRuntimeOptions({ tags: TEST_SENTRY_TAGS })
    ).toBeUndefined();
  });

  it("creates enriched Sentry runtime options from public env", () => {
    const options = getSentryBaseRuntimeOptions({
      dsn: " https://public@sentry.example/1 ",
      environment: "preview",
      release: "test-web@abc123",
      tags: TEST_SENTRY_TAGS,
      tracesSampleRate: "0.25",
    });

    expect(options).toMatchObject({
      dsn: "https://public@sentry.example/1",
      enableLogs: true,
      environment: "preview",
      initialScope: {
        tags: TEST_SENTRY_TAGS,
      },
      release: "test-web@abc123",
      sendDefaultPii: true,
      tracesSampleRate: 0.25,
    });

    expect(
      options?.beforeSendLog({
        attributes: {
          feature: "hero",
        },
      })
    ).toMatchObject({
      attributes: {
        ...TEST_SENTRY_TAGS,
        feature: "hero",
      },
    });
  });

  it("falls back to default replay sample rates", () => {
    expect(getSentryReplayRuntimeOptions()).toEqual({
      replaysOnErrorSampleRate: 1,
      replaysSessionSampleRate: 0.1,
    });
  });

  it("routes logger errors to Sentry logs and exceptions", async () => {
    const error = new Error("Translation failed");
    const sentry = createSentryBridge();
    const transport = createSentrySdkTransport(sentry, {
      tags: TEST_SENTRY_TAGS,
    });

    await transport.write({
      context: {
        component: "web.utils.error",
        metadata: {
          key: "title",
          password: "hidden",
        },
        operation: "getSafeHeroMessages",
      },
      error,
      id: "log_123",
      level: LogLevel.ERROR,
      message: "Hero translation key resolution failed",
      timestamp: new Date("2026-05-05T00:00:00.000Z"),
    });

    expect(sentry.logger?.error).toHaveBeenCalledWith(
      "Hero translation key resolution failed",
      expect.objectContaining({
        ...TEST_SENTRY_TAGS,
        "error.message": "Translation failed",
        "error.name": "Error",
        key: "[REDACTED]",
        "log.component": "web.utils.error",
        "log.id": "log_123",
        "log.operation": "getSafeHeroMessages",
        password: "[REDACTED]",
      })
    );
    expect(sentry.captureException).toHaveBeenCalledWith(
      error,
      expect.objectContaining({
        extra: expect.objectContaining({
          "log.component": "web.utils.error",
        }),
        level: "error",
        tags: TEST_SENTRY_TAGS,
      })
    );
  });

  it("keeps info logs out of Sentry by default", async () => {
    const sentry = createSentryBridge();
    const transport = createSentrySdkTransport(sentry);

    await transport.write({
      level: LogLevel.INFO,
      message: "Component rendered",
      timestamp: new Date("2026-05-05T00:00:00.000Z"),
    });

    expect(sentry.logger?.info).not.toHaveBeenCalled();
    expect(sentry.captureMessage).not.toHaveBeenCalled();
  });

  it("attaches the Sentry transport to an existing logger", () => {
    const memoryTransport = new MemoryTransport();
    const logger = createLogger({
      level: LogLevel.WARN,
      transports: [memoryTransport],
    });
    const sentry = createSentryBridge();

    configureSentryLogger(sentry, {
      logger,
      tags: TEST_SENTRY_TAGS,
    });

    logger.warn("Fallback copy missing");

    expect(sentry.logger?.warn).toHaveBeenCalledWith(
      "Fallback copy missing",
      expect.objectContaining(TEST_SENTRY_TAGS)
    );
    expect(memoryTransport.getLogs()).toHaveLength(1);
  });
});

function createSentryBridge(): SentrySdkBridge {
  return {
    captureException: vi.fn(),
    captureMessage: vi.fn(),
    logger: {
      debug: vi.fn(),
      error: vi.fn(),
      fatal: vi.fn(),
      info: vi.fn(),
      trace: vi.fn(),
      warn: vi.fn(),
    },
  };
}
