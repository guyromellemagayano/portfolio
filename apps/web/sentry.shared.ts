export const SENTRY_APP_TAGS = {
  "app.framework": "astro",
  "app.name": "portfolio-web",
  "hosting.platform": "vercel",
};

const DEFAULT_TRACES_SAMPLE_RATE = 1.0;

export function getSentryBaseRuntimeOptions() {
  const dsn = readRuntimeValue(import.meta.env.PUBLIC_SENTRY_DSN);

  if (!dsn) {
    return undefined;
  }

  return {
    beforeSendLog: <TLog extends { attributes?: Record<string, unknown> }>(
      log: TLog
    ) => ({
      ...log,
      attributes: {
        ...SENTRY_APP_TAGS,
        ...log.attributes,
      },
    }),
    dsn,
    enableLogs: true,
    environment: readRuntimeValue(import.meta.env.PUBLIC_VERCEL_ENV),
    initialScope: {
      tags: SENTRY_APP_TAGS,
    },
    release: readRuntimeValue(import.meta.env.PUBLIC_SENTRY_RELEASE),
    sendDefaultPii: false,
    tracesSampleRate: resolveSampleRate(
      import.meta.env.PUBLIC_SENTRY_TRACES_SAMPLE_RATE,
      DEFAULT_TRACES_SAMPLE_RATE
    ),
  };
}

function readRuntimeValue(value: string | undefined) {
  return value?.trim() || undefined;
}

function resolveSampleRate(value: string | undefined, fallback: number) {
  const rawValue = readRuntimeValue(value);

  if (!rawValue) {
    return fallback;
  }

  const sampleRate = Number(rawValue);

  return Number.isFinite(sampleRate) && sampleRate >= 0 && sampleRate <= 1
    ? sampleRate
    : fallback;
}
