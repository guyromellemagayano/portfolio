import * as Sentry from "@sentry/astro";

const DEFAULT_TRACES_SAMPLE_RATE = 0.1;

function resolveTracesSampleRate(value: string | undefined) {
  const sampleRate = Number(value);

  return Number.isFinite(sampleRate) && sampleRate >= 0 && sampleRate <= 1
    ? sampleRate
    : DEFAULT_TRACES_SAMPLE_RATE;
}

const dsn = import.meta.env.PUBLIC_SENTRY_DSN?.trim();

if (dsn) {
  Sentry.init({
    dsn,
    environment: import.meta.env.PUBLIC_SENTRY_ENVIRONMENT || undefined,
    release: import.meta.env.PUBLIC_SENTRY_RELEASE || undefined,
    replaysOnErrorSampleRate: 0,
    replaysSessionSampleRate: 0,
    tracesSampleRate: resolveTracesSampleRate(
      import.meta.env.PUBLIC_SENTRY_TRACES_SAMPLE_RATE
    ),
  });
}
